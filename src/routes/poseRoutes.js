const express = require('express');
const poseController = require('../controllers/poseController');

const router = express.Router();

router.post('/getPose', poseController.getPose);
router.post('/addPose', poseController.addPose);
router.delete('/deletePose/:name', poseController.deletePose);
router.post('/updatePose', poseController.updatePose);
router.get('/getAllposes', poseController.getAllPoses);
router.post('/getPosesByGoals', poseController.getPosesByGoals)


module.exports = router;
