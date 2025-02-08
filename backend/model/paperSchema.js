const mongoose = require("mongoose")

const paperSchema = new mongoose.Schema({
    paperName : {type: String},
    },
{
    timestamps : true,
})

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;

