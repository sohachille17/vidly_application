const { Customer } = require('../model/customer');
const { Movie } = require("../model/movies");
const { Rental } = require("../model/rentals");
const express = require("express");
const router = express.Router();


// create a new rental (/api/v1/rentals)
router.post("/", async (req, res) => {

    const customer = await Customer.findOne({_id: req.body.customerId});
    if(!customer) return res.status(404).json({
        success: false,
        message: `Sorry the customer with id ${req.body.customerId} was not found`, 
    })

    const movie = await Movie.findOne({_id: req.body.movieId});
    if(!movie) return res.status(404).json({
        success: false,
        message: `Sorry the movie id ${req.body.movieId} was not found`
    })

    if(movie.numberInStock === 0) return res.json({
        success: false,
        message: "Sorry you can't rent this movie because it's no longger available"
    })

    // create a new rental

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name:customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        rentAmount: req.body.rentAmount
        
        

    })

    
    try{

        const newRent = await rental.save();
        if(newRent){
            movie.numberInStock--;
            await movie.save()
        }
        
        return res.status(200).json({
            success: true,
            rentals: newRent
        })

    }catch(err){
        return res.json({
            message: err
        })
    }


    
})



module.exports = router;