const express = require("express");
const userRouter = express.Router();
import User from "../schema/User";

// post a transaction to a user's portfolio to buy a stock
userRouter.post("/buyStock", async ( req, res ) => {
    try {
        // get the stock name (this name will be a ticker, for example VTI or QQQ)
        const stockName = await req.body.stockName;

        // name of the user (user account name)
        const accountName = await req.body.accountName;

        // name of the user's portfolio
        const portfolioName = await req.body.portfolioName;
        /*
            check to see if this user already has this stock in the given portfolio that they are buying for
            if they do, calculate the market value, and += the number of the shares
            and input the new market value.
            if they do not, input a new document into the portfolio with the stock name, number of shares, and market value (the price they bought the shares at)
        */

    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error Occured.");
    }
})

module.exports = userRouter;