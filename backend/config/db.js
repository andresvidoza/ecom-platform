import mongoose from 'mongoose'

// when we deal with mongodb (using functions like .connect .find .create) it always returns a promise so we will use async await
const connectDB = async () => { // function returns a promise
    try {
        // the await is like a then... remember that
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true, //  https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // exit with failure
    }
}

export default connectDB