const {Genre} = require("../model/genre");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {

    const genre =  new Genre({
        name: req.body.name
    })

    const newGenre = await genre.save()
    if(newGenre){
        return res.status(200).json({
            sucess: true,
            data: genre
        })
    }

})



module.exports = router;