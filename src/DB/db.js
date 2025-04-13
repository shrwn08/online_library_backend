const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config()


const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongoDB connected successfully')
    } catch (error) {
        console.error("Failed to connect database", error);
    }
}

module.exports = dbConnection;