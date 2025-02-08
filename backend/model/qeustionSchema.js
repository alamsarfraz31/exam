const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title : {type: String},
    a: {type: String},
    b: {type: String},
    c: {type: String},
    d: {type: String},
    answer: {type: String},
    },
    {
        timestamps : true,
    })

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

