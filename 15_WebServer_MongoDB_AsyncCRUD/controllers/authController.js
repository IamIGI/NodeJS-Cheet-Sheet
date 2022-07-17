const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // JWT token.
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    roles: roles,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '10s', //CHANGE!!!!  //give new access token
            }
        );
        const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d', //logOut after that time
        });
        // Saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        //Secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 50 * 60 * 1000,
        }); //secure: true, //back when in production (chrome )
        res.json({ roles, accessToken }); // send via the HTTP HEADERS
    } else {
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };
