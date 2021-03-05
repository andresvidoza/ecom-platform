// Model usually interacts with some kind of Database. This can be mysql or mongodb. 
// Data related logic
// Communicates with controller
// Interactions with db (SELECT,INSERT,UPDATE,DELETE)
// CAN SOMETIMES UPDATE THE VIEW

import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false, // when an user registers they are not an admin off the bat
    }
}, {
    timestamps: true, // know where things are created 
})

//Models are responsible for creating and reading documents from the underlying MongoDB database
const User = mongoose.model('User', userSchema)

export default User;