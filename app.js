import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRouter from './routers/authRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

/* DB Connettion */
mongoose.connect('mongodb://127.0.0.1:27017/telu_store_db').then(() => {
    console.log('Connected to MongoDB Atlas TeluStrore Successfully!');
  }).catch((err) => {
    console.log('DB Connection Error: ', err.message);
  });

const app = express();
const port = 3002;

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Parent Router */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/order', orderRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`TeluStoreServer app listening at http://localhost:${port}`);
});