import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must not be empty'],
        unique: [true, 'username has been used, try another username!']
    },
    name: {
        type: String,
        required: [true, 'your name must not be empty'],
    },
    email: {
        type: String,
        required: [true, 'email must not be empty'],
        unique: [true, 'email has been used'],
        validate: {
            validator: validator.isEmail,
            message: 'cek your email, input must be email formated'
        }
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
        validate: {
            validator: validator.isStrongPassword,
            message: 'password length must be min 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
        }
    },
    mobilePhone: {
        type: String,
        validate: {
            validator: validator.isMobilePhone,
            message: 'cek your mobile phone, input must be phone number formated'
        },
        default: null
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.methods.comparePass = async function (reqPass) {
    return await bcrypt.compare(reqPass, this.password)
}

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User;