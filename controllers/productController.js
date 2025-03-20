import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";

export const CreateProduct = asyncHandler (async (req, res) => {
    const newProduct = await Product.create(req.body)
    return res.status(201).json({
        message: 'data created successfully',
        data: newProduct
    })
});

export const GetAllProduct = asyncHandler (async (req, res) => {
    
    const queryObj = { ...req.query };
    
    const excludeFields = ['page', 'limit'];
    excludeFields.forEach(element => delete queryObj[element]);

    let query
    if (req.query.name) {
        query = Product.find({ 
            name: { $regex: req.query.name, $options: 'i' } 
        })
    } else {
        query = Product.find(queryObj)
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipData = (page - 1) * limit;
    query = query.skip(skipData).limit(limit);

    let totalData = await Product.countDocuments();
    if (req.query.page) {
        if (skipData >= totalData) {
            res.status(404)
            throw new Error('This page does not exist')
        }
    }
    const data = await query

    res.status(200).json({
        message: 'Get all data successfully',
        data: data,
        count: totalData
    })
});

export const GetDetailProduct = asyncHandler (async (req, res) => {
    const paramId = req.params.id;
    const product = await Product.findById(paramId);

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    res.status(200).json({
        message: 'Get detail data successfully',
        data: product
    })
});

export const UpdateProduct = asyncHandler (async (req, res) => {
    const paramId = req.params.id;
    const product = await Product.findByIdAndUpdate(paramId, req.body, {
        new: true,
        runValidators: false
    });
    res.status(200).json({
        message: 'Data updated successfully',
        data: product
    })
});

export const DeleteProduct = asyncHandler (async (req, res) => {
    const paramId = req.params.id;
    await Product.findByIdAndDelete(paramId);
    res.status(200).json({message: 'Data deleted successfully'});
});

export const FileUpload = asyncHandler (async (req, res) => {
    const files = req.files;
    if (!files) {
        res.status(400)
        throw new Error('Please upload a file')
    }
    const imagesFileName = files.map(file => file.filename)
    const imagesFilePath = imagesFileName.map(fileName => `/uploads/${fileName}`)
    res.status(200).json({
        message: 'File uploaded successfully',
        data: imagesFilePath
    })
});