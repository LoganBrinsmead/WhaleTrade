require('dotenv').config();
const { worker } = require('worker_threads');
const express = require('express');


const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// log incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] - ${req.url}`);
    next();
});


// import routes
const routes = require('./routes/default');
app.use("/api/v1", routes);


// start api
app.listen(PORT, () => {
    console.log(`Starting server on port: ${PORT}`);
});
