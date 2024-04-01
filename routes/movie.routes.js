const { Movie } = require("../model/movies");
// const {  Genre  } = require("../model/genre");
const express = require("express");
const router = express.Router();
const {Genre} = require("../model/genre");


// create movie (/api/v1/movie)
router.post("/", async (req, res) => {
    
    console.log(req.body)
    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).json({
        success: false,
        message: "Sorry but there is no genre with this ID"
    })
    
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    const movieSave = await movie.save()
    if(movieSave){
        return res.status(200).json({
            success: true,
            results: movieSave
        })
    }


})






module.exports = router