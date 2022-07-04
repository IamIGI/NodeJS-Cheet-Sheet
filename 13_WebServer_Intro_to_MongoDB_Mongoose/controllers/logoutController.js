const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data;
    },
};
const jwt = require('jsonwebtoken');
const path = require('path');
const fsPromises = require('fs').promises;

const handleLogout = async (req, res) => {
    //On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // if refreshToken in db?
    const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 50 * 60 * 1000 }); // have to be exactly the same as in authController
        return res.sendStatus(204);
    }

    //Delete refreshToken in db
    const otherUsers = usersDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 50 * 60 * 1000 }); //secure: true - only serves on https
    res.sendStatus(204);
};

module.exports = { handleLogout };
