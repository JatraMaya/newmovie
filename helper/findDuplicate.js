const User = require("../models/User");
const { Op } = require("sequelize");

const findUser = async (body) => {
    await User.findAll({
        attribute: ["name", "username", "email"],
        where: {
            [Op.or]: [{ name: body.name }, { username: body.username }, { email: body.email }],
        },
    });
};

module.exports = findUser;
