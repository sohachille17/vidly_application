const {Customer} = require("../model/customer");
const express = require("express");
const router = express.Router();


// get all customer (/api/v1/customers)
 router.get("/", async (req, res) => {


    try{

        const customers = await Customer.find({})
        if(customers){
    
            return res.status(200).json({
                    success: true,
                    data: customers,
                    length: customers.length
                })
        } 
        return res.status(404).json({
            success: false,
            message: "No customer found sorry!!"
        })

    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }

 })
 // post customer (/api/v1/customers)
 router.post("/", async (req, res) => {

    try{

        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold,
    
        })
        
        const cus = await customer.save()
        if(cus) return res.status(200).json({
            success: true,
            data: cus
        })
        

    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }



 })

  // ger one customer (/api/v1/customers/:id)
  router.get("/:id", async (req, res) => {

    try{

        const customer = await Customer
        .findOne({_id: req.params.id})
        .select({name: 1, phone: 1, isGold: 1})
        //findOne({_id: req.params.id})
        if(!customer){
            return res.status(404).json({
                message: false,
                message:`Sorry there was no Customer with the given id ${req.params.id}`
            })
        }
    
        return res.status(200).json({
            success: true,
            message: "Customer found",
            data: customer
        })

    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }


  })

// update customer (/api/v1/customer/:id)
router.put("/:id", async (req, res) => {
    // first check if the current customer exist

    const customer = await Customer.findOne({_id: req.params.id})
    if(!customer){
        return res.status(404).json({
            success: false,
            message: "The current customer you are trying to update does not exist"
        })
    }

    const updatedCus = await Customer.updateOne({_id: req.params.id}, {
        $set:{
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    })

    return res.json({
        data: updatedCus
    })

    

});

// delete customer (/api/v1/customer/:id)
router.delete("/:id", async (req, res) => {

    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).json({
        success: false,
        message: `The customer with id ${req.params.id} you are trying to delete does not exist sorry!!`,

    })

    const deleted = await Customer.findByIdAndDelete(req.params.id)
    if(deleted) return res.status(200).json({success: true, message: "Customer deleted successfully"})

    return res.json(deleted)
    // note you can equally use this
    // -> deleteOne({_id: req.params.id})
})





module.exports = router