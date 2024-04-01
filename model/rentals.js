const mongoose = require("mongoose");

const {Movie} = require("../model/movies");
const rentalSchema = mongoose.Schema({
    customer:{
        type: new mongoose.Schema({

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
            }
        })

    },
    movie: {

        type: new mongoose.Schema({
            title: {

                type: String,
                trim: true,
                minLength: 5,
                maxLength: 100,
                required: true
            },
            dailyRentalRate:{
                type: Number,
                required: true
            }
        })



    },
    rentAmount: {
        type: Number,
        min: 0,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true,
        
    }

})




const Rental = mongoose.model("Rental", rentalSchema);
// Rental.pre('save',(data) => {
//     const movie = await Movie.findOne({})
// })

module.exports = {Rental};
