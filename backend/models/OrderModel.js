// Model usually interacts with some kind of Database. This can be mysql or mongodb. 
// Data related logic
// Communicates with controller
// Interactions with db (SELECT,INSERT,UPDATE,DELETE)
// CAN SOMETIMES UPDATE THE VIEW

import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Type.ObjectId,
                required: true,
                ref: 'Product',
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true},
        city: { type: String, required: true},
        postalCode: { type: String, required: true},
        country: { type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: { // will come from paypal
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true, // know where things are created 
})

//Models are responsible for creating and reading documents from the underlying MongoDB database
const Order = mongoose.model('Order', orderSchema)

export default Order;