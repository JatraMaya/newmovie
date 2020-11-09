const { DataTypes } = require("sequelize");
const db = require("../connection/db");

const User = db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
(async () => {
    await db.sync();
})();

module.exports = User;
