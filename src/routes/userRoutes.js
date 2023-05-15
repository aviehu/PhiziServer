const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUser/:email', userController.getUser)
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;
