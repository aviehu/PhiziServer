const express = require('express');
const messageController = require('../controllers/messageController');
const {
    isRequestValidated,
    validateSignUpRequest,
    validateSignInRequest,
} = require("../validators/auth");

const router = express.Router();

router.post('/markedAsRead', messageController.markedAsRead);
router.post('/addMessage', messageController.addMessage)
router.post('/getUserMessages', messageController.getUserMessages)

module.exports = router;
