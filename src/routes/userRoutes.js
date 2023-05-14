// src/routes/user.routes.js

const express = require('express');
const userController = require('../controllers/userController');
const {
    isRequestValidated,
    validateSignUpRequest,
    validateSignInRequest,
} = require("../validators/auth");

const router = express.Router();

router.post('/register', validateSignUpRequest, isRequestValidated, userController.register);
router.post('/login', validateSignInRequest, userController.login);
router.post('/getUser', userController.getUser)
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;
