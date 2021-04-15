import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler ( async (req, res) => {
    // this wont handle errors, but we we would need to use try catch for ALL the routes. Instead we can use express-async-handler to do so
    const products = await Product.find({})
    res.json(products); 
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler ( async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById
}