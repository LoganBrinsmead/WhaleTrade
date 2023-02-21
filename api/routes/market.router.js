require('dotenv').config();

const express = require('express');
const finnhub_api = require('../providers/finnhubapi.provider');

const apiKey = process.env.FINNHUBAPIKEY;

const market_router = express.Router({mergeParams: true});


market_router.get('/', (req, res) => {
    finnhub_api.getStocks("US", "XNYS", apiKey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

market_router.post('/', (req, res) => {
    let params = req.body;
});

market_router.get('/news', (req, res) => {
    finnhub_api.getMarketNews("general", apiKey)
        .then( (data) => {
            res.status(200).json(data)
        }).catch( (error) => {
            console.log(error);
            res.status(400).send(error);
    });
});

market_router.get('/peers/')

module.exports = market_router;