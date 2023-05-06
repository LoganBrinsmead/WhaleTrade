const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../docs/swaggerDef');

const docsRouter = express.Router();

const specs = swaggerJsdoc({
    swaggerDefinition,
    apis: ['./routes/*.js', './routes/market/*.js'],
});

docsRouter.use('/', swaggerUi.serve);
docsRouter.get('/', swaggerUi.setup(specs, { explorer: true }));

module.exports = docsRouter;