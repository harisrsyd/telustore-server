import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'address location is required']
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    postalCode: {
        type: String
    }
})