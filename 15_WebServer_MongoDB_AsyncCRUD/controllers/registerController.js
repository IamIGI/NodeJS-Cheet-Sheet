const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' });
    // check for duplicate usernames in the db
    //If you don't use callback from mongoose method and you use async->await, you need to write .exec()
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        // Encrypted password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // Create and tore the new user
        const result = await User.create({
            username: user,
            password: hashedPwd,
        });

        console.log(result);

        res.status(201).json({ success: `New user ${user} created!` }); //201 - created new data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
