// src/models/pose.model.js

const mongoose = require('mongoose');

const part = new mongoose.Schema({
    part: {type: String, required: true},
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    z: {type: Number, required: true},
    // score: {type: Number, required: true},
})

const pose = new mongoose.Schema( {
    keypoints: {type: [part] , validate: [(val) => val.length <= 33, 'Must have exactly 33 keypoints']}
})

const sessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    difficulty: { type: Number , min:1, max:10},
    poses: {type: [pose], validate: [(val) => val.length > 0, 'Must have at least one pose']}
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

