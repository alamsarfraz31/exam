const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name : {type: String,},
    username : {
        type: String},
    email : {type: String},
    password : {type: String},
    role: {type : String},
},
{
    timestamps: true,
})

// // Json Web Token
userSchema.methods.genrateToken = async function () {
    try {
        return jwt.sign({ 
            userId : this._id.toString(),
            email: this.email,
            role : this.role,
         },
            process.env.JWT_SECRETKEY,
            {expiresIn: "5m"}
        );
    } catch (error) {
        
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;