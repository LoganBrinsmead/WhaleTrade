require('dotenv').config();

const express = require('express');
const finnhub_api = require('../../providers/finnhubapi.provider');
const {exchanges, mics} = require('../../utils/static_market_info');

const apiKey = process.env.FINNHUBAPIKEY;

const stock_router = express.Router({mergeParams: true});


// return a static list of available exchanges supported by finnhub
stock_router.get('/list/exchanges', (req, res) => {
    res.status(200).json(exchanges);
});

// return a static list of available mics supported by finnhub
stock_router.get('/list/mics', (req, res) => {
    res.status(200).json(mics);
});

stock_router.get('/exchange=:exchange&mic=:mic', (req, res) => {
    const { exchange, mic } = req.params;
    finnhub_api.getStocks(exchange, mic, apiKey)
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
});

stock_router.get('/recommend?:symbol', (req, res) => {
    const symbol = req.params.symbol;
    finnhub_api.getTrend(symbol, apiKey)
    .then( (data) => {
       res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error)
    });
});


module.exports = stock_router;