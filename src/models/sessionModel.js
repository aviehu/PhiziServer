// src/models/pose.model.js

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, key: true },
    description: { type: String },
    difficulty: { type: Number , min:1, max:10},
    poses: {type: [String], ref: "Pose", validate: [(val) => val.length > 0, 'Must have at least one pose']},
    goals: { type: [String] }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

