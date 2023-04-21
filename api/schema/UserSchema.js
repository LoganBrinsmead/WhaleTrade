const mongoose = require("mongoose");
const Stock = require("./StockSchema");
const Crypto = require("./CryptoSchema");
const Portfolio = require("./PortfolioSchema");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: String,
    password: {
        type: String,
        required: true,
    },
    portfolios: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Portfolio',
    }],
    followers: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    }],
    follows: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    }],
})

module.exports = mongoose.model("User", userSchema);