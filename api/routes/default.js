const express = require('express');

const default_router = express.Router();

default_router.get("/", (req, res) => {    
    res.sendStatus(200);
});

const market_router = require('./market/market.router');
const docs_router = require('./docs.router');

default_router.use("/market", market_router);

if (process.env.DEVELOPMENT) {
    default_router.use("/docs", docs_router);
}

module.exports = default_router;
