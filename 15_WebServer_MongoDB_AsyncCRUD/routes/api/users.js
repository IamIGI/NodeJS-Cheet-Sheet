const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
    .route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersControllers.getAllUsers)
    .put(verifyRoles(ROLES_LIST.Admin), usersControllers.updateUser);

router
    .route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersControllers.getUser)
    .delete(verifyRoles(ROLES_LIST.Admin), usersControllers.deleteUser);

module.exports = router;
