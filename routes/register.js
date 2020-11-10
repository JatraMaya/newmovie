const router = require("express").Router();
const { salt } = require("../helper/bcryptHelper");
const db = require("../connection/db");
const User = require("../models/User");

router.post("/", async (req, res) => {
    const { name, username, email } = req.body;
    let password = req.body.password;
    password = await salt(password);
    console.log(password);
    try {
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
