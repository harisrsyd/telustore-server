import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const CreateOrder = asyncHandler (async (req, res) => {
    const {email, firstname, lastname, phone, cartItems} = req.body;

    if (!cartItems || cartItems.length <= 0) {
        res.status(400)
        throw new Error('Cart is empty, No product in cart')
    }

    let orderItems = [];
    let totalPrice = 0;
    for (let item of cartItems) {
        const product = await Product.findOne({ _id: item.product });
        if (!product) {
            res.status(404)
            throw new Error(`Product not found with id ${item.product}`)
        }
        const isProductAvailable = product.stock >= item.qty;
        if (!isProductAvailable) {
            res.status(400)
            throw new Error(`Product ${product.name} is out of stock`)
        }
        const { _id, name, price } = product;
        const singleItem = {
            name, price, qty: item.qty, product: _id
        };
        orderItems = [...orderItems, singleItem];
        totalPrice += item.qty * item.price;
    };

    const newOrder = await Order.create({
        totalPrice: totalPrice,
        orderItems: orderItems,
        email,
        firstname,
        lastname,
        phone,
        user: req.user._id,
    });

    return res.status(201).json({
        message: 'Create order successfully',
        data: {
            newOrder
        }
    });
});

export const GetAllOrder = asyncHandler (async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({
        message: 'Create order successfully', 
        data: orders
    });
});

export const GetDetailOrder = asyncHandler (async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }
    res.status(200).json({
        message: 'Get detail order successfully',
        data: order
    });
});

export const CurrentUserOrder = asyncHandler (async (req, res) => {
    const order = await Order.find({ user: req.user._id });
    res.status(200).json({
        message: 'Get current user order successfully',
        data: order
    });
});

export const UpdateItemOrder = asyncHandler (async (req, res) => {
    const { cartItems } = req.body;
    if (!cartItems || cartItems.length <= 0) {
        res.status(400)
        throw new Error('Cart is empty, add min 1 product to cart')
    }
    let orderItems = [];
    let totalPrice = 0;
    for (let item of cartItems) {
        const product = await
        Product.findOne({ _id: item.product });
        if (!product) {
            res.status(404)
            throw new Error(`Product not found with id ${item.product}`)
        }
        const isProductAvailable = product.stock >= item.qty;
        if (!isProductAvailable) {
            res.status(400)
            throw new Error(`Product ${product.name} is out of stock`)
        }
        const { _id, name, price } = product;
        const singleItem = {
            name, price, qty: item.qty, product: _id
        }; 
        orderItems = [...orderItems, singleItem];
        totalPrice += item.qty * item.price;
    }
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }
    order.totalPrice = totalPrice;
    order.orderItems = orderItems;
    await order.save();
    res.status(200).json({
        message: 'Update order successfully',
        data: order
    });
});

export const UpdateDetailOrder = asyncHandler (async (req, res) => {
    const { email, firstname, lastname, phone } = req.body;
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }
    order.email = email;
    order.firstname = firstname;
    order.lastname = lastname;
    order.phone = phone;
    await order.save();
    res.status(200).json({
        message: 'Update order successfully',
        data: order
    });
});

export const DeleteOrder = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Create order successfully'});
});

