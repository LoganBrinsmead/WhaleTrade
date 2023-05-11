require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const RedisIO = require("ioredis");
const RedisStore = require("connect-redis").default;
const redis = require('redis');
const https = require('https');
const http = require('http');
const cors = require('cors');


const app = express();

mongoose.set('strictQuery', false);

const redisClient = new RedisIO.Redis();

// middleware for session
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.REDISSTORESECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie 
            maxAge: 1000 * 60 * 10 // session max age in miliseconds
        }
    })
)

redisClient.on('error', function (err) {
    console.log("There was an error establishing the connection with Redis: " + err);
});
redisClient.on('connect', function (err) {
    console.log("Connection to Redis established.");
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 9000;

app.use(express.json());

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// log incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] - ${req.url}`);
    next();
});

// import api router
const routes = require('./routes/default');
app.use("/api/v1", routes);

// ui routes
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start 
if (process.env.SERVER === 'production') {
    console.log('Starting Production Server')
    http.createServer(app)
        .listen(PORT, () => {
            console.log(`starting http server: ${PORT}`)
        });
    https.createServer(app)
        .listen(443, () => {
            console.log(`starting https server: 443`)
        });
}
else {
    console.log('Starting Development Server')
    app.listen(PORT, () => {
        console.log(`Starting server on port: ${PORT}`);
    });
}

module.exports = app;
