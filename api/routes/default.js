const express = require('express');

const default_router = express.Router();

default_router.get("/", (req, res) => {    
    res.json({
        version: "1.0.0",
    });

});

default_router.post("/", (req, res) => {
    let data = req.body;
    console.log(data);
    res.send('ok')
});

const market_router = require('./market/market.router');
default_router.use("/market", market_router);

module.exports = default_router;
