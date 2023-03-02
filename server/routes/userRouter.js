const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const {createUser, login, logout} = require('../controllers/userController');

router.post('/create', createUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;

