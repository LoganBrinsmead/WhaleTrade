require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("name: ", process.env.NAME);
console.log("pw: ", process.env.PW);

const MONGOURI = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@whalecluster.bcd7wzc.mongodb.net/?retryWrites=true&w=majority`;
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
const authRouter = require('./routes/auth');
app.use("/api/v1", routes);
app.use('/api/auth', authRouter)


// start api
app.listen(PORT, () => {
    console.log(`Starting server on port: ${PORT}`);
});
