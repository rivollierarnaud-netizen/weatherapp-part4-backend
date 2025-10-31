var express = require("express");
var router = express.Router();

const User = require("../models/users");
const {checkBody} = require("../modules/checkBody")
//const OWM_API_KEY = "71863f1a595bc4e94b550c06a55211b5";

router.post("/signup", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!checkBody(req.body, ["name", "email", "password"])) {
        return res.json({ result: false, error: "Missing or empty fields" });
    }
    User.findOne({ email: email }).then((data) => {
        if (data) {
            return res.json({ result: false, error: "User already exists" });
        }
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        newUser.save().then(() => {
            res.json({ result: true });
        });
    });
});

router.post("/signin", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!!checkBody(req.body, ["email", "password"])) {
        return res.json({ result: false, error: "Missing or empty fields" });
    }
    User.findOne({ email: email}).then((data) => {
        if (data) {
            res.json({ result: true });
        } else {
            return res.json({ result: false, error: 'User not found' });
        }
    });
});

module.exports = router;
