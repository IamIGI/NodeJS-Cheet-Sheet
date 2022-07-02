const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config(path.join(__dirname, '..', '.env'));

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // if we do note have authHeader, and even if we have authHeader but optionaly it don't start with Bearer, return 401
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // invalid token (forbidden)
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};

module.exports = verifyJWT;
