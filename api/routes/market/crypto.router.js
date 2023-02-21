require('dotenv').config();

const express = require('express');
const finnhub_api = require('../../providers/finnhubapi.provider');

const apiKey = process.env.FINNHUBAPIKEY;

const crypto_router = express.Router({mergeParams: true});

crypto_router.get('/', (req, res) => {

});

module.exports = crypto_router;