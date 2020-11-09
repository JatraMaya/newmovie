const router = require("express").Router();
const db = require("../connection/db");
const User = require("../models/User");

router.get("/", (req, res) => {
    User.findAll({
        attributes: ["name", "username", "email"],
    })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
    User.findAll({
        where: {
            id: req.params.id,
        },
    })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
