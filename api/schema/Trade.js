const mongoose = require("mongoose");
const Stock = require("./Stock");
const Crypto = require("./Crypto");
const Option = require("./Option");

const tradeSchema = new mongoose.Schema({
    ticker: {
        type: string,
        required: trusted,
    },
    name: {
        type: string,
        required: trusted,
    },
    stock: Stock,
    crypto: Crypto,
    option: Option,
    price: String,
    quantity: String
})

module.exports = mongoose.model("Trade", tradeSchema);