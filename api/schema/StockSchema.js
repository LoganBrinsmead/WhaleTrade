const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    stockName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    marketValue: {
        type: String,
        required: true
    }
})

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;