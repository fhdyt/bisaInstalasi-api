const jwt = require("jsonwebtoken");

require('dotenv/config')

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');

    if (!token) {
        return res.json({ status: false, message: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded
    } catch (err) {
        return res.json({ status: false, message: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;