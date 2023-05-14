// src/routes/pose.routes.js

const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/sessions/getSession/:name', sessionController.getSession);
router.post('/sessions/addSession', sessionController.addSession);
router.delete('/sessions/deleteSession/:name', sessionController.deleteSession);
router.post('/sessions/updateSession', sessionController.updateSession);
router.get('/sessions/getAllSessions', sessionController.getAllSessions);


module.exports = router;
