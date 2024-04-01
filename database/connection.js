
const mongoose = require("mongoose");

 async function createConnection(){


    try{

        const connection_string = process.env.MONGODB_DEVELOPMENT_MODE
       
        const connect = await mongoose.connect(connection_string)
        if(connect) console.log("Connected to mongodb atlas successfully!!")

    }catch(err){
        console.log(err.message)
    }

}

module.exports = createConnection();

