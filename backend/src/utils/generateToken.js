const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
    // if (!process.env.JWT_SECRET) {
    //     throw new Error("JWT_SECRET is not defined");
    // }

    return jwt.sign({ id: userId, role: role }, 'secret' || process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

module.exports = generateToken;
