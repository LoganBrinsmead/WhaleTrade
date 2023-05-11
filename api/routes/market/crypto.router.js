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

crypto_router.get('/symbols&exchange', (req, res) => {
    const exchange = req.query.exchange;
    finnhub_api.getCryptoSymbols(exchange,apiKey)
    .then((data) => {
        res.status(200).json(data);
    }).catch((error) => {
        res.status(400).send(error);
    });
})

module.exports = crypto_router;

/**
 * @swagger
 * /market/crypto/exchanges:
 *  get:
 *      summary: returns a list of valid crypto exchanges
 *      tags: [Crypto]
 *
 * /market/crypto/symbols&exchange={exchange}:
 *  get:
 *      summary: return a list of available crypto symbols by exchange
 *      tags: [Crypto]
 *      parameters:
 *          - in: path
 *            name: exchange
 *            schema:
 *              type: string
 *            description: name  of crypto exchange
 */