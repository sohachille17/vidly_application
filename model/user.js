const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        maxLength: 255,
        minLength: 10,
        required: true
    },
    email: {
        type: String,
        unique: true,
        maxLength: 255,
        minLength: 5,
        required: true
    },
    password: {
        type:String,
        maxLength: 1024,
        minLength: 5,
        required: true

    }
})

const User = mongoose.model('User', userSchema)

exports.User = User;