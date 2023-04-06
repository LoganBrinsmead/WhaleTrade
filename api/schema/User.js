const mongoose = require("mongoose");
import Stock from "../schema/Stock";
import Crypto from "../schema/Crypto";

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stocks: [{ Stock }],
    crypto: [{
        crypto: Crypto,
        marketValue: Number
    }],
    options: [String],
    balance: {
        type: String,
        required: true
    }
})

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
    portfolios: [portfolioSchema],
    followers: [userSchema],
    follows: [userSchema]
})

module.exports = mongoose.model("User", userSchema);