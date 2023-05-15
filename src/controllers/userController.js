// src/controllers/user.controller.js
const { StatusCodes } = require("http-status-codes");
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const JWTSECRET = process.env.JWTSECRET



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            throw new Error('Missing info')
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication failed' });
        }
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ email: user.email }, JWTSECRET);
        res.json({ token });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

exports.register = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User not found' });
        }
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const session = await User.findOneAndUpdate(
            { email: req.body.email },
            {
                $set: {
                    name: req.body.name,
                    password:  req.body.password,
                    age: req.body.age,
                    weight: req.body.weight,
                    height: req.body.height,
                    bmi: req.body.bmi,
                    goals: req.body.goals,
                }
            },
            { returnOriginal: false }
        );
        if (!session) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Session does not exist: ${req.params.name}` });
        }
        res.status(StatusCodes.OK).json(session);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}
