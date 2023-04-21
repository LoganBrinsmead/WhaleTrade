const mongoose = require("mongoose");
const Stock = require("./StockSchema");
const Crypto = require("./CryptoSchema");

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stocks: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stock',
    }],
    crypto: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Crypto'
    }],
    options: [String],
    balance: {
        type: String,
        required: true
    },
    marketValue: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Portfolio", portfolioSchema);