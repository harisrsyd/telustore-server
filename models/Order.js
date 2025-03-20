import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderItemSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
});

const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: [true, 'Please enter the total price'],
    },
    orderItems: [orderItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    firstname: { 
        type: String, 
        required: [true, 'Please enter your first name'],
        trim: true, 
    },
    lastname: { 
        type: String, 
        required: [true, 'Please enter your last name'],
        trim: true, 
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;