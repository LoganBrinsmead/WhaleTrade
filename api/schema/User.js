const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    stocks: [String],
    crypto: [String],
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
