// const express = require('express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Whale Trade API docs",
            version: "0.1.0",
            description:
                "",
            license: {
                name: "",
                url: "",
            },
            contact: {
                name: "WhaleTrader",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: `http://localhost:9000/api/v1`,
            },
        ],
    },
    apis: ['./market/*.router.js']
};

module.exports = options;