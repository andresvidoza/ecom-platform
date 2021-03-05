// Model usually interacts with some kind of Database. This can be mysql or mongodb. 
// Data related logic
// Communicates with controller
// Interactions with db (SELECT,INSERT,UPDATE,DELETE)
// CAN SOMETIMES UPDATE THE VIEW

import mongoose from 'mongoose'

// separate individual reviews
const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
}, {
    timestamps: true // know where things are created 
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // generate objectID
        required: true,
        ref: 'User', // adds relationship between the product and user 
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews:[reviewSchema], // could be in a separate file but its small and will only be used here 
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true, // know where things are created 
})

//Models are responsible for creating and reading documents from the underlying MongoDB database
const Product = mongoose.model('Product', productSchema)

export default Product;