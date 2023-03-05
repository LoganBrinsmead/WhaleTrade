const mongoose = require("mongoose");


const optionSchema = new mongoose.Schema({
    optionName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    strikePrice: {
        type: String,
        required: true
    },
    expDate: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model("Option", optionSchema);