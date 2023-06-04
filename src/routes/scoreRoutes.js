
const express = require('express');
const userSessionScoreController = require('../controllers/scoreController');

const router = express.Router();

router.post('/addScore', userSessionScoreController.addScore);
router.get('/getSessionScores/:session', userSessionScoreController.getSessionScores);
router.get('/getUserScores/:user', userSessionScoreController.getUserScores);


module.exports = router;
