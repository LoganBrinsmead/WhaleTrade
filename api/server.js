require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGOURI = process.env.URI;
const PORT = process.env.PORT;


app.use(express.json());

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


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
