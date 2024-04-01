const { User } = require("../model/user");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {


    try{
        // find if the user already exist

        //a. Find for user with given name
        let username =  await User.findOne({name: req.body.name})
        if(username) return res.status(400).json({
            success: false,
            message: "Sorry buy a user with this name already existe in our database \t try anothe rone"

        })
        //b. find for user with email
        let useremail = await User.findOne({email: req.body.email})
        if(useremail) return res.status(400).json({
            success: false,
            message: " Sorry a user in our database already exit with this email address \t try another one"
        })


        const user = new User({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password
    
        })
        const result = await user.save()
        if(result) return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result,
            length: 1
        })


    }catch(err){
        return res.json({
            success: false,
            message: err.message
        })
    }



})


module.exports = router