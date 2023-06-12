// src/routes/pose.routes.js

const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/getSession/:name', sessionController.getSession);
router.post('/addSession', sessionController.addSession);
router.delete('/deleteSession/:name', sessionController.deleteSession);
router.post('/updateSession/:name', sessionController.updateSession);
router.get('/getAllSessions', sessionController.getAllSessions);
router.post('/getSessionForUser', sessionController.getSessionForUser)
router.post('/getAllSessionsForUser', sessionController.getAllSessionsForUser)
router.post('/getSessionPoses', sessionController.getSessionPoses)


module.exports = router;
