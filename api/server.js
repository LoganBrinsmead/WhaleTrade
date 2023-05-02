require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const RedisIO = require("ioredis");
const RedisStore = require("connect-redis").default;
const redis = require('redis');

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
