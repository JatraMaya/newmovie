const router = require("express").Router();
const { genSaltSync, hashSync } = require("bcrypt");
const db = require("../connection/db");

const User = require("../models/User");

router.post("/", (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    User.create({
        name: body.name,
        username: body.username,
        password: body.password,
        email: body.email,
    })
        .then(() => res.send("Success"))
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
