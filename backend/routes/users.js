const express = require('express');
const { getUsers, deleteUser,updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


module.exports = router;
