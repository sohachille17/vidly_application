const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        maxLength: 50,
        minLength: 10,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


const Customer = mongoose.model("Customer", customerSchema);

module.exports = {
    Customer
} 

