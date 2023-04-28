const express = require('express');
const authRouter = require('./auth');
const userRouter = require("./UserRouter");

const default_router = express.Router();

default_router.get("/", (req, res) => {
    res.json({
        version: "1.0.0",
    });
});

default_router.post("/posttest", (req, res) => {
    let data = req.body;
    console.log(data);
    res.send('ok')
});

default_router.use("/auth", authRouter);
default_router.use("/transact", userRouter);

module.exports = default_router;
