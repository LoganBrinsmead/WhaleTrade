require('dotenv').config();

const express = require('express');
const finnhub_api = require('../../providers/finnhubapi.provider');

const apiKey = process.env.FINNHUBAPIKEY;

const crypto_router = express.Router({mergeParams: true});

crypto_router.get('/exchanges', (req, res) => {
   finnhub_api.getCryptoExchanges(apiKey)
   .then((data) => {
       res.status(200).json(data);
   }).catch( (error) => {
       res.status(400).send(error);
   });
});

crypto_router.get('/symbols&exchange=:exchange', (req, res) => {
    const exchange = req.params.exchange;
    finnhub_api.getCryptoSymbols(exchange,apiKey)
    .then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).send(error);
    });
})

module.exports = crypto_router;
