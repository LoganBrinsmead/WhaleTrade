const express = require('express');

const market_router = express.Router({mergeParams: true});

const stock_routes = require('./stock.router');
const crypto_routes = require('./crypto.router');

market_router.use("/stocks", stock_routes);
market_router.use("/crypto", crypto_routes);

module.exports = market_router;

/**
 * @swagger
 * tags:
 *  name: Market
 */
/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: Express Stock API
 *   description: An API for retrieving stock data using the Finnhub API
 * basePath: /api/v1
 * schemes:
 *   - http
 * consumes:
 *   - application/json
 * produces:
 *   - application/json
 *
 * definitions:
 *   Exchange:
 *     type: string
 *     description: An available stock exchange supported by Finnhub
 *   Mic:
 *     type: string
 *     description: An available market identifier code (MIC) supported by Finnhub
 *   Stock:
 *     type: object
 *     properties:
 *       symbol:
 *         type: string
 *         description: The stock symbol
 *       description:
 *         type: string
 *         description: A description of the stock
 *       exchange:
 *         $ref: "#/definitions/Exchange"
 *       mic:
 *         $ref: "#/definitions/Mic"
 *   Company:
 *     type: object
 *     properties:
 *       symbol:
 *         type: string
 *         description: The stock symbol
 *       name:
 *         type: string
 *         description: The name of the company
 *   Quote:
 *     type: object
 *     properties:
 *       symbol:
 *         type: string
 *         description: The stock symbol
 *       c:
 *         type: number
 *         description: The current price of the stock
 *       h:
 *         type: number
 *         description: The high price of the stock for the day
 *       l:
 *         type: number
 *         description: The low price of the stock for the day
 *       o:
 *         type: number
 *         description: The opening price of the stock for the day
 *       pc:
 *         type: number
 *         description: The previous close price of the stock
 *
 * paths:
 *   /list/exchanges:
 *     get:
 *       summary: Get a list of available exchanges
 *       description: Returns a list of all the available stock exchanges supported by Finnhub
 *       responses:
 *         200:
 *           description: A list of available exchanges
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/definitions/Exchange"
 *         400:
 *           description: Invalid request
 *
 *   /list/mics:
 *     get:
 *       summary: Get a list of available MICs
 *       description: Returns a list of all the available market identifier codes (MICs) supported by Finnhub
 *       responses:
 *         200:
 *           description: A list of available MICs
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/definitions/Mic"
 *         400:
 *           description: Invalid request
 *
 *   /exchange={exchange}&mic={mic}:
 *     get:
 *       summary: Get stocks for a specific exchange and MIC
 *       description: Returns a list of all the available stocks for a specific stock exchange and market identifier code (MIC)
 *       parameters:
 *         - name: exchange
 *           in: path
 *           type: string
 *           description: The stock exchange code
 *           required: true
 *         - name: mic
 *           in: path
 *           type: string
 *           description: The market identifier code
 *           required: true
 *       responses:
 *         200:
 *           description: A list of stocks for the specified exchange and MIC
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/definitions/Stock"
 *         400:
 *           description: Invalid request
 *
 *   /search?symbol={symbol}:
 *     get:
 *       summary: Search for a stock by symbol
 *       description: Returns information about a stock based on its symbol
 *       parameters:
 *         - name: symbol
 *           in: query
 *           type:
 *
 */

