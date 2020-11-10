const router = require("express").Router();
const db = require("../connection/db");
const User = require("../models/User");
const { salt } = require("../helper/bcryptHelper");

// Finding all user
router.get("/all", async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["name", "username", "email"],
        });
        res.status(200).json({ users: users });
        return;
    } catch (err) {
        res.send(err);
        return;
    }
});

// Finding user by id
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ["name", "username", "email"],
            where: {
                id: req.params.id,
            },
        });
        if (user === null) {
            res.status(400).json({ error: "User not found" });
        } else {
            res.status(200).json({ user });
        }
    } catch (err) {
        res.send(err);
        return;
    }
});

//Edit user data by id
router.patch("/edit/:id", (req, res) => {
    const body = req.body;
    const keyValue = {};
    Object.keys(body).forEach((key) => {
        keyValue[key] = body[key];
    });
    try {
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
    } catch (err) {
        res.send(err);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const userExist = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (userExist) {
            User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({ message: "User deleted" });
            return;
        } else {
            res.status(404).json({ error: "User not found" });
            return;
        }
    } catch (err) {
        res.send(err);
        return;
    }
});

module.exports = router;
