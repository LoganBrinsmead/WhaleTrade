require('dotenv').config();

const express = require('express');
const finnhub_api = require('../../providers/finnhubapi.provider');
const alphavantage_api = require('../../providers/alphavantage.provider');
const {exchanges, mics} = require('../../utils/static_market_info');

const finnhubapikey = process.env.FINNHUBAPIKEY;
const alphavantageapikey = process.env.ALPHAVANTAGEAPIKEY;

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
    finnhub_api.getStocks(exchange, mic, finnhubapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/profile', (req, res) => {
    const symbol = req.query.symbol;
    finnhub_api.getProfile(symbol, finnhubapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/search', (req, res) => {
    const query = req.query.symbol;
    finnhub_api.searchBySymbol(query,finnhubapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/news', (req, res) => {
    finnhub_api.getMarketNews("general", finnhubapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/peers', (req, res) => {
    const symbol = req.query.symbol;
    finnhub_api.getCompanyPeers(symbol, "industry", finnhubapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/quote', (req, res) => {
    const symbol = req.query.symbol;
    finnhub_api.getQuote(symbol, finnhubapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

stock_router.get('/recommend', (req, res) => {
    const symbol = req.query.symbol;
    finnhub_api.getTrend(symbol, finnhubapikey)
    .then( (data) => {
       res.status(200).json(data);
    }).catch( (error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

// query params symbol, interval, outputsize
stock_router.get('/intraday', (req, res) => {
    const { symbol, interval, outputsize } = req.query;
    alphavantage_api.getIntraDayData(symbol, interval, outputsize, alphavantageapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
})

stock_router.get('/weekly', (req, res) => {
    const symbol = req.query.symbol;
    alphavantage_api.getWeeklyData(symbol, alphavantageapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
})

stock_router.get('/monthly', (req, res) => {
    const symbol = req.query.symbol;
    alphavantage_api.getMonthlyData(symbol, alphavantageapikey)
    .then( (data) => {
        res.status(200).json(data);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    })
})

module.exports = stock_router;


/**
 * @swagger
 * /market/stocks/list/exchanges:
 *  get:
 *      summary: returns a list of valid exchanges
 *      tags: [Market]
 *
 * /market/stocks/list/mics:
 *  get:
 *      summary: returns a list of valid Market Identifier Codes
 *      tags: [Market]
 *
 * /market/stocks/search?symbol={symbol}:
 *  get:
 *      summary: search for symbols by name
 *      description:
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *            description: stock symbol name
 *
 * /market/stocks/exchange={exchange}&mic={mic}:
 *  get:
 *      summary: get a list of symbols filtered by exchange and mic
 *      description:
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: exchange
 *            schema:
 *              type: string
 *            description: stock exchange
 *          - in: path
 *            name: mic
 *            schema:
 *              type: string
 *            description: market identifier code
 *
 * /market/stocks/news:
 *  get:
 *      summary: most recent news headlines
 *      description:
 *      tags: [Market]
 *
 * /market/stocks/peers?symbol={symbol}:
 *  get:
 *      summary: get a list of similar companies
 *      description:
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *            description: stock symbol
 *
 * /market/stocks/quote?symbol={symbol}:
 *  get:
 *      summary: most recent price of a given symbol
 *      description: Get real-time quote data for US stocks. Constant polling is not recommended. Use websocket if you need real-time updates.
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *            description: stock symbol
 *
 * /market/stocks/recommend?symbol={symbol}:
 *  get:
 *      summary: get the latest analyst recommendation trends for a company
 *      description:
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *            description: stock symbol
 *
 * /market/stocks/intraday?symbol={symbol}&interval={interval}&outputsize={outputsize}:
 *  get:
 *      summary: intraday time-series data
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *          - in: path
 *            name: interval
 *            schema:
 *              type: string
 *            description:
 *          - in: path
 *            name: outputsize
 *            scheme:
 *              type: string
 *
 * /market/stocks/weekly?symbol={symbol}:
 *  get:
 *      summary: weekly time-series data
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *
 * /market/stocks/monthly?symbol={symbol}:
 *  get:
 *      summary: monthly time-series data
 *      tags: [Market]
 *      parameters:
 *          - in: path
 *            name: symbol
 *            schema:
 *              type: string
 *
 */
