require('dotenv').config();

const express = require('express');
const finnhub_api = require('../../providers/finnhubapi.provider');

const apiKey = process.env.FINNHUBAPIKEY;

const stock_router = express.Router({mergeParams: true});


stock_router.get('/', (req, res) => {
    finnhub_api.getStocks("US", "XNYS", apiKey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/search?:symbol', (req, res) => {
   const query = req.params.symbol;
    finnhub_api.searchBySymbol(query,apiKey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/news', (req, res) => {
    finnhub_api.getMarketNews("general", apiKey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/peers?:symbol', (req, res) => {
    const symbol = req.params.symbol;
    finnhub_api.getCompanyPeers(symbol, "industry", apiKey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/quote?:symbol', (req, res) => {
    const symbol = req.params.symbol;
    finnhub_api.getQuote(symbol, apiKey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
})

module.exports = stock_router;