require('dotenv');
const { version } = require('../package.json');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: "Whale Trade API Documentation",
        version,
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api/v1`,
        },
    ],
};

module.exports = swaggerDef;