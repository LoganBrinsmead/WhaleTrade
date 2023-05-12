const mongoose = require("mongoose");
const Stock = require("./StockSchema");
const Crypto = require("./CryptoSchema");
const Option = require("./OptionSchema");

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