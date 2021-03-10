import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// Using Seeder to get in some initial data at first

dotenv.config();

connectDB();

// async because we are dealing with mongoose and db
const importData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // array of created users
        const createdUsers = await User.insertMany(users);

        // If the document does not specify an _id field, then mongod adds the _id field and assign a unique ObjectId for the document. 
        const adminUser = createdUsers[0]._id; // first item in our case is the admin in users.js

        const sampleProducts = products.map(product => {
            return { ... product, user: adminUser } // add the already existing data with user
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit();

    }catch(error){
        console.log(error)
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!')
        process.exit();

    }catch(error){
        console.log(error)
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData();
}