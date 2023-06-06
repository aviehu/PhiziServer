const { StatusCodes } = require("http-status-codes");
const userSessionScore = require('../models/scoreModel');

exports.addScore = async (req, res) => {
    try {
        const score = new userSessionScore(req.body);
        await score.save();
        res.status(StatusCodes.CREATED).json(score);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getSessionScores = async (req, res) => {
    try {
        const scores = await userSessionScore.find({session: req.params.session});
        res.status(StatusCodes.OK).json(scores);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getUserScores = async (req, res) => {
    try {
        const scores = await userSessionScore.find({user: req.params.user});
        res.status(StatusCodes.OK).json(scores);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getAllScores = async (req, res) => {
    try {
        const scores = await userSessionScore.find();
        res.status(StatusCodes.OK).json(scores);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};