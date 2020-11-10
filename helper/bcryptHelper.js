const bcrypt = require("bcrypt");
const saltRounds = 10;

function salt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
        });
    });
}

function compareSalt(password, hashPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

const bcryptFunctions = {
    salt,
    compareSalt,
};

module.exports = bcryptFunctions;
