const router = require("express").Router();
const db = require("../connection/db");
const { genSaltSync, hashSync } = require("bcrypt");
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
        attributes: ["name", "username", "email"],
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

router.get("/", (req, res) => {
    console.log(req.query);
    User.findAll({
        attributes: ["name", "username", "email"],
        where: {
            username: req.query.username,
        },
    })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.patch("/edit/:id", (req, res) => {
    const body = req.body;
    const keyValue = {};
    Object.keys(body).forEach((key) => {
        keyValue[key] = body[key];
    });
    const salt = genSaltSync(10);
    if (body.password) body.password = hashSync(body.password, salt);
    User.update(keyValue, {
        where: {
            id: req.params.id,
        },
    })
        .then(() => {
            res.send("Profile Changed");
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete("/delete/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(() => res.send("User deleted!"))
        .catch((err) => res.send(err));
});

module.exports = router;
