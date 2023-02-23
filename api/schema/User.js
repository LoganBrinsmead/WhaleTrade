const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    stocks: [],
    crypto: [],
    options: []
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
    portfolio: portfolioSchema,
})

module.exports = mongoose.model("User", userSchema);
