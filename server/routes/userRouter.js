const express = require('express');
const router = express.Router();
const {
    createUser, 
    login, 
    logout, 
    getAllUsers, 
    getUserById, 
    updateUsername, 
    updateBirthday, 
    updatePhone, 
    updateZipCode, 
    deleteUserById
} = require('../controllers/userController');
const {registerValidator} = require('../utils/validators');
const {check} = require('express-validator');
const { auth } = require('../middleware/authorization');

//create and auth user
router.post('/create',registerValidator(), createUser);
router.post('/login', login);
router.get('/logout', logout);

//retrieve user data
router.get('/all', auth, getAllUsers);
router.get('/:userId', auth, getUserById);

//update user data
router.patch('/updatename', check('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({min: 5})
    .withMessage('Username must be at least 5 characters.'), auth, updateUsername);
router.patch('/updatebirthday', check('birthday')
    .notEmpty()
    .withMessage('Birthday cannot be empty')
    .isISO8601().toDate()
    .withMessage('Date of birth a real date in YYYY-MM-DD format')
    .custom(value => value < new Date())
    .withMessage('Date of birth has to be in the past')
    .custom(value => value !== null)
    .withMessage('Date of birth a real date in YYYY-MM-DD format'), auth, updateBirthday);  
router.patch('/updatephone', check('phoneNumber')
    .notEmpty()
    .withMessage('Phone number cannot be empty')
    .isLength({min: 9, max:13})
    .withMessage('Phone number has to be at least 9 and maximum 11 characters.')
    .matches('^[0-9]*$')
    .withMessage('Phone number can only contain numbers'), auth, updatePhone);
router.patch('/updatezip', check('zipCode')
    .notEmpty()
    .withMessage('Zipcode cannot be empty')
    .isLength({min: 4, max: 5})
    .withMessage('Zipcode must be at least 4 characters and maximum 5 characters')
    .matches('^[0-9]*$')
    .withMessage('Zip code can only contain numbers'), auth, updateZipCode);

//delete user
router.delete('/delete', auth, deleteUserById)

module.exports = router;

