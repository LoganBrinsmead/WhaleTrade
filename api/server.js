require('dotenv').config();
const express = require('express');
<<<<<<< HEAD

const PORT = process.env.PORT;
=======
const cors = require('cors');
const PORT = process.env.PORT;
>>>>>>> 1c72a58879832adbe722a8bee7027b074b88f58f

const app = express();

app.use(express.json());
app.use(cors());
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


module.exports = app;