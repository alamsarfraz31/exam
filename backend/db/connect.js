require("dotenv").config();
const mongoose = require("mongoose");

const connect = async function() {
    try {
        await mongoose.connect(process.env.DB)
        .then(msg=>console.log("connect"))
    } catch (error) {
        console.error(error)
    }
    
}

module.exports = connect;