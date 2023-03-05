require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

const app = express();

mongoose.set('strictQuery', false);

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


// Redis configuration (session storing)
// const RedisStore = connectRedis(session);

// configure Redis
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

redisClient.on('error', function(err) {
    console.log("There was an error establishing the connection with Redis: " + err);
});
redisClient.on('connect', function (err) {
    console.log("Connection to Redis established.");
});

// middleware for session
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDISSTORESECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))

// start api
app.listen(PORT, () => {
    console.log(`Starting server on port: ${PORT}`);
});
