const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

const createUser = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
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
                        });
                        res.cookie("token", token, {
                            expires: new Date(Date.now() + 172800000),
                            httpOnly: true, path: '/', domain: 'localhost'})
                            .status(200)
                            .json({notification: 'You successfully logged in', result})
                    }else {
                        res.json({notification: 'Incorrect password'})
                    }
                })
        }else {
            res.json({notification: 'Incorrect username'})
        }
    })
    .catch((err) => console.log(err))
}

const logout = (req, res) => {
    res.clearCookie('token', {domain: 'localhost', path: '/'}).json({notification: 'You logged out'})
}

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';
        let sort = req.query.sort || '_id';
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);

        let sortBy = {};
        if(sort[1]) {
            sortBy[sort[0]] = sort[1];
        }else {
            sortBy[sort[0]] = 'asc';
        }

        const users = await User.find({$and: [{_id: { $ne: req.user.result._id }}, {"username": {$regex: search, $options: 'i'}}]}).sort(sortBy).skip(page * limit).limit(limit);

        const total = await User.countDocuments({$and: [{_id: { $ne: req.user.result._id }}, {"username": {$regex: search, $options: 'i'}}]})

        const result = {
            error: false,
            total,
            page: page + 1,
            limit,
            users
        }
       
        res.status(200).json(result)

    }catch(err) {
        res.status(500).json({error: true, message: 'Internal server error'});
    }
}

const getUserById = (req, res) => {
    User.findById(req.params.userId)
        .populate('_id')
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

const updateUsername = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }else {
        const id = req.user.result._id;
        const name = { username: req.body.username }
        User.findByIdAndUpdate(id, name, {new: true})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }   
}

const updateBirthday = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }else {
        const id = req.user.result._id;
        const birthday = {birthday: req.body.birthday}
        
        User.findByIdAndUpdate(id, birthday, {new: true})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }
}

const updatePhone = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }else {
        const id = req.user.result._id;
        const phone = { phoneNumber: req.body.phoneNumber }
        User.findByIdAndUpdate(id, phone, {new: true})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }
}

const updateZipCode = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }else {
        const id = req.user.result._id;
        const zipCode = { zipCode: req.body.zipCode }
        User.findByIdAndUpdate(id, zipCode, {new: true})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    }
}

const deleteUserById = (req, res) => {
    const id = req.user.result._id;
    User.findByIdAndDelete(id)
    .then(() => {
        res.clearCookie('token', {domain: 'localhost', path: '/'}).json({notification: 'You deleted your user'})
    })

}

module.exports = {createUser, login, logout, getAllUsers, getUserById, updateUsername, updateBirthday, updatePhone, updateZipCode, deleteUserById }