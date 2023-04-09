require('dotenv').config();
const path = require('path');
const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// log incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] - ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// import api router
const routes = require('./routes/default');
app.use("/api/v1", routes);

// start 
if (process.env.SERVER === 'production') {
    console.log('Starting Production Server')
    http.createServer(app)
        .listen(PORT, () => {
            console.log(`starting https server: ${PORT}`)
        });
    https.createServer(app)
        .listen(8081, () => {
            console.log(`starting https server`)
        });
}
else {
    // start development server 
    console.log('Starting Development Server')
    app.listen(PORT, () => {
        console.log(`Starting server on port: ${PORT}`);
    });
}
