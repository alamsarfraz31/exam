require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/connect");
const User = require("./model/userSchema");
const CryptoJS = require("crypto-js");
const { Register, Login, SingelUserDetail } = require("./controller/auth-controller");

const app = express();

const PORT = "5000";

db();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    try {
        res.json({ message:"hellow"});
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
    
});

// Register API
app.post("/register", Register);

// Login API
app.post("/login", Login);

// Get User Detail
app.post("/user", SingelUserDetail)

app.listen(PORT, () => {
  console.log("Server Running on Port " + PORT);
});