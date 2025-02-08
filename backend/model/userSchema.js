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
            name: this.name,
            user: this.username,
            email: this.email,
            role : this.role,
         },
            process.env.JWT_SECRETKEY,
            {expiresIn: "15m"}
        );
    } catch (error) {
        console.error(error)
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;