const express = require('express');
const poseController = require('../controllers/poseController');

const router = express.Router();

router.get('/poses/getPose/:name', poseController.getPose);
router.post('/poses/addPose', poseController.addPose);
router.delete('/poses/deletePose/:name', poseController.deletePose);
router.post('/poses/updatePose', poseController.updatePose);
router.get('/poses/getAllposes', poseController.getAllPoses);


module.exports = router;
