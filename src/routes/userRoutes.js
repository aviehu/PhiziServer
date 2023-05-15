const express = require('express');
const userController = require('../controllers/userController');
const {
    isRequestValidated,
    validateSignUpRequest,
    validateSignInRequest,
} = require("../validators/auth");

const router = express.Router();

router.post('/register',validateSignUpRequest, userController.register);
router.post('/login', validateSignInRequest, userController.login);
router.get('/getUser/:email', userController.getUser)
router.get('/getAllUsers', userController.getAllUsers);
router.post('/updateUser', userController.updateUser)

module.exports = router;
