import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('API is running');
});

// PRODUCT ROUTES
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PAYPAL - give client accessbility to clientID
app.get('/api/config/paypal', (req, res ) => res.send(process.env.PAYPAL_CLIENT_ID))

// Make static
const __dirname = path.resolve(); // we use modules so we need this
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// ERROR MIDDLEWARE
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);