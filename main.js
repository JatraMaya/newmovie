require('dotenv').config()
const express = require("express");
const app = express();
const db = require("./connection/db");
const register = require("./routes/register");
const user = require("./routes/user")

app.use(express.json());
app.use("/register", register);
app.use("/user", user);

db.authenticate()
    .then(() => {
        console.log("Data base connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.send("Hello");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App running");
});
