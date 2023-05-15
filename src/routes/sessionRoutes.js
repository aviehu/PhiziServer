// src/routes/pose.routes.js

const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/getSession/:name', sessionController.getSession);
router.post('/addSession', sessionController.addSession);
router.delete('/deleteSession/:id', sessionController.deleteSession);
router.post('/updateSession', sessionController.updateSession);
router.get('/getAllSessions', sessionController.getAllSessions);


module.exports = router;
