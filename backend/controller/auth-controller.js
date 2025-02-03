require("dotenv").config();
const CryptoJS = require("crypto-js");
const User = require("../model/userSchema");

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
        const decyptPasword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRETKEY
        );
        const password = decyptPasword.toString(CryptoJS.enc.Utf8);
        if (req.body.password !== password) {
            res.json({ message: "Invalid Username  or  Password", response: "Error" });
            return;
        }
        res.status(200).json({
            message: "Logged In Successfully",
            response: "success",
            token: await user.genrateToken(),
            userId: user._id.toString(),
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json("Internal  Server Error")
    }
  
}


module.exports = {
    Register,
    Login
}