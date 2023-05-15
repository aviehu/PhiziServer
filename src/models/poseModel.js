const mongoose = require('mongoose');

const part = new mongoose.Schema({
    part: {type: String, required: true},
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    z: {type: Number, required: true},
    // score: {type: Number, required: true},
})

const pose = new mongoose.Schema( {
    name: {type: String, required: true, key: true},
    goals: {type: [String], default: []},
    keypoints: {type: [part] , validate: [(val) => val.length <= 33, 'Must have at most 33 keypoints']},
    keypoints3D: {type: [part] , validate: [(val) => val.length <= 33, 'Must have at most 33 keypoints']}
})

const Pose = mongoose.model('Pose', pose);

module.exports = Pose;