const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    user: { type: String, ref: 'User', required: true },
    session: { type: String, ref: 'Session', required: true },
    duration: {type: Number, description: "Time taken to complete in seconds"},
    date: { type: Date, required: true, default: Date.now }
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;