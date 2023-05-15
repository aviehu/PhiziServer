const express = require('express');
const poseController = require('../controllers/poseController')

const router = express.Router();

router.post('/', poseController.addPose);

module.exports = router;
