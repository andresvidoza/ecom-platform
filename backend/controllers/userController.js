import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler ( async (req, res) => {
    const { email, password } = req.body 

    // find the user
    const user = await User.findOne({ email: email }) // find one document user with the email and instanciate it

    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) // used for autorization, to send to a protected route
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

// @desc register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler ( async (req, res) => {

    const { name, email, password } = req.body 

    // find the user if its exists first
    const userExists = await User.findOne({ email: email }) // find one document user with the email and instanciate it

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password // use mongoose middleware to encrypt
    })

    // once its created send back the info, and we create the token
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) // used for autorization, to send to a protected route
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private 
const getUserProfile = asyncHandler ( async (req, res) => {
    // find the user
    const user = await User.findById(req.user._id) // get this once the user is authenticated from the middleware

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error ('User not found')
    }

})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private 
const updateUserProfile = asyncHandler ( async (req, res) => {
    // find the user
    const user = await User.findById(req.user._id) 

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        
        const updatedUser = await user.save(); // saves new document updated

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id) // used for autorization, to send to a protected route
        })

    }else{
        res.status(404)
        throw new Error ('User not found')
    }

})

export { authUser, getUserProfile, registerUser, updateUserProfile} ;