const express = require("express");
const userRouter = express.Router();
import User from "../schema/User";
const { Decimal128 } = require('bson');

async function buyStock(Portfolio, stockSymbol, quantity, pricePerShare, session) {
    try {

        // Calculate the total cost of the purchase
        const totalCost = Decimal128.fromString(quantity).mul(Decimal128.fromString(pricePerShare));

        let balance = Number(Portfolio.balance);

        // Check if the user has enough funds to buy the stock
        if (totalCost > balance) {
            throw new Error('Insufficient funds');
        }

        // Deduct the cost of the stock from the user's funds and update the portfolio document
        await Promise.all([
            User.updateOne({ _username: username }, { $inc: { balance: totalCost.neg() } }).session(session),
            Portfolio.updateOne({ $push: { stocks: { symbol: stockSymbol, quantity, pricePerShare } } }).session(session),
        ]);

        // Commit the transaction if everything was successful
        await session.commitTransaction();
    } catch (err) {
        // Abort the transaction if there was an error
        await session.abortTransaction();
        throw err;
    }
}


// post a transaction to a user's portfolio to buy a stock
userRouter.post("/buyStock", async (req, res) => {
    try {
        // name of the user (user account name)
        const accountName = await req.body.accountName;

        // get the stock ticker (this will be a ticker, for example VTI or QQQ)
        const stockTicker = await req.body.stockTicker;

        // name of the user's portfolio
        const portfolioName = await req.body.portfolioName;

        // (number of shares) * (price)... calculate this and pass it on frontend
        const newPositionValue = await req.body.positionValue;

        // the price per share of the stock the user is trying to buy
        const pricePerShare = await req.body.pricePerShare;

        // the quantity that the user is trying to purchase
        const quantity = await req.body.quantity;

        // start the mongoose session
        const session = await mongoose.startSession();

        User.findOne({ 'username': { $elemMatch: { name: accountName } } } , async function (err, foundUser) {
            User.findOne({ 'portfolios.name': { $elemMatch: { name: portfolioName } } }, async function (err, portfolio) {
                // there isn't a portfolio with that name in the user's portfolios
                if (err) {
                    return res.status(400).json({ Error: "Something went wrong: the user does not have a portfolio with that name." })
                }

                // the user does have a portfolio with that name
                portfolio.findOne({ 'Stock.ticker': { $elemMatch: { ticker: stockTicker } } }, async function (err, stock) {
                    // the portfolio does not have that stock, so add it
                    if (err) {
                        // initiate transaction
                        try {
                            await session.withTransaction(async () => {
                                await buyStock(portfolio, stockTicker, quantity, pricePerShare, session);

                            });
                        } finally {
                            session.endSession();
                        }
                    }

                    // the portfolio does have that stock, update the existing market value and number of shares
                    stock.marketValue = stock.marketValue + newPositionValue;
                })


            });

        });

    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error Occured.");
    }
})

module.exports = userRouter;