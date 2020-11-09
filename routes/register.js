const router = require("express").Router();
const db = require("../connection/db");

const User = require("../models/User");

router.post("/", (req, res) => {
    const body = req.body;
    User.create({
        name: body.name,
        username: body.username,
        email: body.email,
    })
        .then(() => res.send("Success"))
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
