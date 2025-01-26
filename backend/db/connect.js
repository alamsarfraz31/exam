require("dotenv").config();
const mongoose = require("mongoose");

const connect = async function() {
    await mongoose.connect(process.env.DB)
    .then(msg=>console.log("connect"))
}

module.exports = connect;