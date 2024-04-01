// const { genreSchema } = require("../model/genre");
const mongoose = require("mongoose");
const moviesSchema = mongoose.Schema({
    title: {

        type: String,
        trim: true,
        minLength: 5,
        maxLength: 100,
        required: true
    },
    genre: {
        type: new mongoose.Schema({
            name: {

                type: String,
                minLength: 4,
                maxLength: 100,
                trim: true,
                required: true
            }
        }),
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        required: true
    },
    dailyRentalRate:{
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
    
})

const Movie = mongoose.model('Movie', moviesSchema)

module.exports = { Movie };