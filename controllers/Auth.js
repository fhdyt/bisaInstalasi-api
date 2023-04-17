const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const user = await User.findOne({ "username": req.body.username })
    if (!user) {
        return res.json({ status: false, message: 'Invalid Username' });
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            const token = jwt.sign({ user: user._id, username: user.username }, process.env.JWT_KEY);
            res.json({ status: true, token, user });
        }
        else {
            res.json({ status: false });
        }
    });
}

const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hash,
    })
    try {
        const postUser = await user.save()
        res.json({ status: true, "data": postUser })
    }
    catch (err) {
        res.json({ status: false, message: err })
    }
}


module.exports = { login, register }