const express = require('express');
const router = express.Router();
const {createUser, login, logout, getAllUsers, getUserById, updateUsername, updateBirthday, updatePhone } = require('../controllers/userController');
const {registerValidator} = require('../utils/validators');
const {check} = require('express-validator');
const { auth } = require('../middleware/authorization');

//create and auth user
router.post('/create',registerValidator(), createUser);
router.post('/login', login);
router.get('/logout', logout);

//retrieve user data
router.get('/all', auth, getAllUsers);
router.get('/:userId', getUserById);

//update user data
router.patch('/updatename', check('username')
.notEmpty()
.withMessage('Username cannot be empty')
.isLength({min: 5})
.withMessage('Username must be at least 5 characters.'), auth, updateUsername);
router.patch('/updatebirthday', check('birthday')
.isISO8601().toDate()
.withMessage('Date of birth a real date in YYYY-MM-DD format'), auth, updateBirthday);
router.patch('/updatephone', check('phoneNumber')
.isLength({min: 9, max:13})
.withMessage('Phone number has to be at least 9 and maximum 11 characters.')
.matches('^[0-9]*$')
.withMessage('Phone number can only contain numbers'), auth, updatePhone)

module.exports = router;

