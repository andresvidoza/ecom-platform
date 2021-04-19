import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler (async (req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // convention
        try {
            token = req.headers.authorization.split(' ')[1] // get the token and not the bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // decode with our token and message

            req.user = await User.findById(decoded.id).select('-password') // dont get the password, push this to the final route

            next();
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not aUTHORIZED, TOKEN FAILED')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    
})

const admin = (req, res, next) => {
    // check if the user is logged in and is adminm
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin}