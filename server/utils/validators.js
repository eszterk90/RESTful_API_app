const {check} = require('express-validator');

const registerValidator = () => {
    return [
        check('username')
            .notEmpty()
            .withMessage('Username cannot be empty')
            .isLength({min: 5})
            .withMessage('Username must be at least 5 characters.'),
        check('password')
            .notEmpty()
            .withMessage('Password cannot be empty')
            .isLength({min: 6})
            .withMessage('Password must be at least 6 characters'),
        check('birthday')
            .notEmpty()
            .withMessage('Birthday cannot be empty')
            .isISO8601().toDate()
            .withMessage('Date of birth a real date in YYYY-MM-DD format')
            .custom(value => value < new Date())
            .withMessage('Date of birth has to be in the past')
            .custom(value => value !== null)
            .withMessage('Date of birth a real date in YYYY-MM-DD format'),
        check('zipCode')
            .notEmpty()
            .withMessage('Zipcode cannot be empty')
            .isLength({min: 4, max: 5})
            .withMessage('Zipcode must be at least 4 characters and maximum 5 characters')
            .matches('^[0-9]*$')
            .withMessage('Zip code can only contain numbers'),
        check('phoneNumber')
            .notEmpty()
            .withMessage('Phone number cannot be empty')
            .isLength({min: 9, max:13})
            .withMessage('Phone number has to be at least 9 and maximum 11 characters.')
            .matches('^[0-9]*$')
            .withMessage('Phone number can only contain numbers')
    ];
}

module.exports = {registerValidator};

