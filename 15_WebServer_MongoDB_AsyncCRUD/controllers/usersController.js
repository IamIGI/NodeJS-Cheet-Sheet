const Users = require('../model/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const users = await Users.find();
    if (!users) return res.status(204).json({ message: 'No users found' });
    res.json(users);
};

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'User ID required' });

    const user = await Users.findOne({ _id: req.params.id }).exec();
    if (!user) return res.status(204).json({ message: `No user matched ${req.params.id}` });
    console.log(user);
    res.json(user);
};

const updateUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ message: 'ID parameter is required' });

    const user = await Users.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(204).json({ message: `No user matched ${res.body.id}` });
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.roles) user.roles = req.body.roles;
    if (req.body?.password) {
        console.log(req.body.roles);
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPwd;
    }
    const result = await user.save();
    res.json(result);
};

const deleteUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'User ID required' });

    const user = await Users.findOne({ _id: req.params.id }).exec();
    if (!user) return res.status(204).json({ message: `No user find ${req.params.id}` });

    const result = await user.deleteOne({ _id: req.params.id });
    res.json(result);
};

module.exports = {
    getAllUsers,
    updateUser,
    getUser,
    deleteUser,
};
