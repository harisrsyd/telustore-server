import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name has been used']
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    image: {
        type: String,
        default: null
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['Arabica', 'Robusta', 'Liberica', 'Excelsa', 'Green Bean', 'Roasted Bean']
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;