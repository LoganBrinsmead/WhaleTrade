const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../schema/UserSchema");

const salt = 10;
authRouter.post("/register", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
    try {
        const session = req.session;
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        if (user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if (cmp) {
                console.log(session);
                session.username = req.body.username;
                session.password = req.body.password;
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

// logout route (removes the user from the session store in Redis)
authRouter.get("logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log("There was an error logging out, " + err);
        }
        res.redirect("/login");
    })
})

module.exports = authRouter;