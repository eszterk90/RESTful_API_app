const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

const createUser = (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
        console.log(errors)
        res.status(400).json({errors: errors.array()})
    }else {
        const newUser = req.body;
    User.findOne({username: newUser.username})
        .then(result => {
            if(result) {
                res.json({notification: 'Account already exists'})
            }else {
                User.create(newUser)
                    .then(() => res.status(200).json({notification: 'Your account is created'}))
                    .catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }   
}

const login = (req, res) => {
    const loginData = req.body;
    User.findOne({username: loginData.username})
        .then(result => {
            if(result) {
                bcrypt.compare(
                    loginData.password,
                    result.password,
                    (err, response) => {
                        if(response) {
                            const token = jwt.sign({ result }, process.env.ACCESS_TOKEN, {
                                expiresIn: "1h"
                            })
                            res.status(200).json({notification: 'You successfully logged in', result, token})
                        } else {
                            res.json({notification: 'Username and password do not match'})
                        }
                    }
                )
            }
        })
        .catch((err) => console.log(err))
}

const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.json({notification: 'You logged out'})
}

const getAllUsers = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedUser = jwt.decode(token);
    User.find({_id: { $ne: decodedUser.result._id }}).then(result => {
        res.json(result)
    })
    
}

const getUserById = (req, res) => {
    User.findById(req.params.userId)
        .populate('_id')
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

module.exports = {createUser, login, logout, getAllUsers, getUserById}