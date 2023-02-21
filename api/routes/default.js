const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// require('dotenv').config({ path: require('find-config')('.env') })

// require('dotenv').config();

const app = express();
// const port = process.env.PORT || 3001;
const port = 3000;

const default_router = express.Router();

mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PW}@whalecluster.bcd7wzc.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    portfolio: [{
        stocks: [String],
        crypto: [String],
        options: [String]
    }]
})

const User = mongoose.model("user", userSchema);

// router to register a user's account
// currently only authenticates using a password and a username, salts pw with bcrypt
const salt = 10;
app.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const hashedPW = await bcrypt.hash(req.body.password, salt);
        const insertUser = await User.create({
            username: req.body.username,
            password: hashedPW,
        });
        res.send(insertUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error Occured");
    }
})

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        console.log(user);
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, User.password);
            if (cmp) {
                //   TODO: More code needs to be added here to maintain authentication, i.e JWT or sessions with a tech like Redis
                res.send("Auth Successful");
            } else {
                res.send("Wrong username or password.");
            }
        } else {
            res.send("Wrong username or password.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
})

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

app.listen(port, () => {
    console.log(`Server now listening on port: ${port}`)
});

module.exports = default_router;
