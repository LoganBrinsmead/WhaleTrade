const mongoose = require("mongoose");
const Stock = require("./Stock");
const Crypto = require("./Crypto");
const Option = require("./Option");

const tradeSchema = new mongoose.Schema({
    ticker: {
        type: string,
        required: true,
    },
    name: {
        type: string,
        required: true,
    },
    stock: Stock,
    crypto: Crypto,
    option: Option,
    price: String,
    quantity: String
})

module.exports = mongoose.model("Trade", tradeSchema);