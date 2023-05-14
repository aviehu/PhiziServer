// src/routes/pose.routes.js

const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/sessions/getSession', sessionController.getSession);
router.post('/sessions/addSession', sessionController.addSession);
router.post('/sessions/deleteSession', sessionController.deleteSession);
router.post('/sessions/updateSession', sessionController.updateSession);
router.get('/sessions/getAllSessions', sessionController.getAllSessions);


module.exports = router;
