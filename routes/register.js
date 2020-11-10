const router = require("express").Router();
const db = require("../connection/db");
const User = require("../models/User");

router.post("/", async (req, res) => {
    try {
        const { name, username, password, email } = req.body;
        const existedUser = await User.findOne({
            where: {
                username,
                email,
            },
        });
        if (!existedUser) {
            await User.create({
                name,
                username,
                password,
                email,
            });
            res.status(200).json({ message: "User added sucessfully" });
            return;
        }
        res.status(409).json({ message: "User already exist" });
        return;
    } catch (err) {
        const errmsg = err.errors[0].message;
        if (errmsg) res.status(409).json({ message: errmsg });
        return;
    }
});

module.exports = router;
