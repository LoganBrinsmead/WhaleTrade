const express = require('express');

const default_router = express.Router();

default_router.get("/", (req, res) => {    
    res.sendStatus(200).json({
        version: "1.0.0",
    });
});

default_router.post("/", (req, res) => {
    let data = req.body;
    console.log(data);
    res.sendStatus(200).json(JSON.parse(data));
});

const market_router = require('./market/market.router');
const docs_router = require('./docs.router');

default_router.use("/market", market_router);
// skip if development env var is false
default_router.use("/docs", docs_router);

module.exports = default_router;
