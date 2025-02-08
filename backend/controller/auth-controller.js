require("dotenv").config();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const Paper = require("../model/paperSchema");
const Question = require("../model/qeustionSchema");
const { response } = require("express");


// Register Controller
const Register = async (req, res) => {
    try {
        // Check User Name in Database
        const userName = await User.findOne({ username: req.body.username });
        if (userName) {
            res.status(400).json({ message: "User Name Already Exist.", response: "Error" });
            return;
        }

        // Check Email in Database
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail) {
            res.json({ message: "Email Id Already Exist.", response: "Error" });
            return;
        }

        const hassPassword = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRETKEY
        ).toString();

        const formdata = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            role: "user",
            password: hassPassword,
        };
        const newUser = await User.create(formdata);
        res
            .status(201)
            .json({ 
                message: "Registered Successfully",
                response: "success",
             });
    } catch (error) {
        res.status(500).json("Eternal Server Error")
    }
  
};

// Login Controller
const Login = async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.json({ message: "Invalid Credencial", response: "Error" });
            return;
        }

        // Verify Password
        const decryptPasword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRETKEY
        );
        const password = decryptPasword.toString(CryptoJS.enc.Utf8);
        if (req.body.password !== password) {
            res.json({ message: "Invalid Username  or  Password", response: "Error" });
            return;
        }
        res.status(200).json({
            message: "Logged In Successfully",
            response: "success",
            token: await user.genrateToken(),
            userId: user._id.toString(),
        });
    } catch (error) {
        res.status(500).json("Internal  Server Error")
    }
  
}

// Single User Detail
const SingelUserDetail = async (req, res) => {
    try {
        const user = jwt.verify(req.body.token, process.env.JWT_SECRETKEY, (error, result)=>{
            if(error) {
                return "token expire";
            }
            return result;
        })

        if(user === "token expire") {
            res.json({message: "Token expire login again", response: "failed"})
            return
        }
        
        res.json({message:"Single User Data", response: "success", user})
    } catch (error) {
        res.json({message:"Server Internal Error", response: "failed", error})
    }
}

// Add Paper controller
const AddPaper = async (req, res) => {
    try {
        const questionPaper = {
            paperName : req.body.paperName,
            }

        const paper = await Paper.create(questionPaper);
        res.json({message: "Paper Added Successfully", response: "success"})
    } catch (error) {
        res.json({message:"Server Internal Error", response: "failed", error})
    }
}

// Get Paper All Paper
const GetPaper = async (req, res) => {
    try {
        const paper = await Paper.find()
        if(!Paper) {
            res.json({message: "Paper Not Found", response : "success"})
        }

        res.json({message:"Paper Found", response: "success", paper})
    } catch (error) {
        res.json({message:"Server Internal Error", response: "failed", error})
        console.log(error)
    }
    
}

const AddQuestion = async (req, res) => {
    try {
        const question = {
            title: req.body.title,
            a : req.body.a,
            b : req.body.b,
            c : req.body.c,
            d : req.body.d,
            answer : req.body.answer,
        }
        await Question.create(question)
        res.json({message: "Qeustion Added Successfully", response: "success"})
    } catch (error) {
        res.json({message: "Server Internal Error", response: 'failed', error})
    }
    
}


module.exports = {
    Register,
    Login,
    SingelUserDetail,
    AddPaper,
    AddQuestion,
    GetPaper,
}