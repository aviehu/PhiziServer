const mongoose = require('mongoose');

const userSessionScoreSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    score: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now }
});

const UserSessionScore = mongoose.model('UserSessionScore', userSessionScoreSchema);

module.exports = UserSessionScore;