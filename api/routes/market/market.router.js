const express = require('express');

const market_router = express.Router({mergeParams: true});

const stock_routes = require('./stock.router');
const crypto_routes = require('./crypto.router');

market_router.use("/stocks", stock_routes);
market_router.use("/crypto", crypto_routes);

module.exports = market_router;