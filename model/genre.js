const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    name: {

        type: String,
        minLength: 4,
        maxLength: 100,
        trim: true,
        required: true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = {
    genreSchema,
    Genre
}
