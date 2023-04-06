require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
// log incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] - ${req.url}`);
    next();
});

// serve built react app as static file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});


// import routes
const routes = require('./routes/default');
app.use("/api/v1", routes);


// start api
app.listen(PORT, () => {
    console.log(`Starting server on port: ${PORT}`);
});


module.exports = app;