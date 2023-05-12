const mongoose = require("mongoose");


const cryptoSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Crypto", cryptoSchema);