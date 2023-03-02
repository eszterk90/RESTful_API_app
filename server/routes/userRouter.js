const express = require('express');
const router = express.Router();
const {createUser, login, logout, getAllUsers, getUserById, updateUsername} = require('../controllers/userController');
const { check } = require('express-validator');
const { auth } = require('../middleware/authorization')

router.post('/create',[
    check('username')
        .notEmpty()
        .withMessage('Username cannot be empty')
        .isLength({min: 5})
        .withMessage('Username must be at least 5 characters.'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters'),
    check('birthday')
        .isISO8601().toDate()
        .withMessage('Date of birth a real date in YYYY-MM-DD format'),
    check('zipCode')
        .isLength({min: 4, max: 5})
        .withMessage('Zipcode must be at least 4 characters and maximum 5 characters')
        .matches('^[0-9]*$')
        .withMessage('Zip code can only contain numbers'),
    check('phoneNumber')
        .isLength({min: 9, max:13})
        .withMessage('Phone number has to be at least 9 and maximum 11 characters.')
        .matches('^[0-9]*$')
        .withMessage('Phone number can only contain numbers')

], createUser);
router.post('/login', login);
router.get('/logout', logout);
router.get('/all', auth, getAllUsers);
router.get('/:userId', getUserById)
router.patch('/updatename', auth, updateUsername);

module.exports = router;

