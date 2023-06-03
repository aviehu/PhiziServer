// src/controllers/pose.controller.js
const { StatusCodes } = require("http-status-codes");
const Session = require('../models/sessionModel');
const Poses = require('../models/poseModel')

exports.getSession = async (req, res) => {
    try {
        const session = await Session.findOne({name: req.params.name});
        if (!session) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Session does not exist: ${req.params.name}` });
        }
        res.status(StatusCodes.OK).json(session);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findOneAndDelete({_id: req.params.id});
        if (!session) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Session does not exist: ${req.params.name}` });
        }
        res.status(StatusCodes.OK).json(session);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.addSession = async (req, res) => {
    try {
        const session = new Session(req.body);
        await session.save();
        res.status(StatusCodes.CREATED).json(session);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.updateSession = async (req, res) => {
    try {
        const {description, difficulty, poses, goals, name} = req.body
        const session = await Session.findOneAndUpdate(
            { name },
            {
                $set: {
                    description,
                    difficulty,
                    poses,
                    goals
                }
            },
            { returnOriginal: false }
        );
        if (!session) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Session does not exist: ${req.body.name}` });
        }
        res.status(StatusCodes.OK).json(session);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find();
        res.status(StatusCodes.OK).json(sessions);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getSessionForUser = async (req, res) => {
    try {
        const { body } = req
        const session = await Session.findOne({goals: { $in: body.goals }})
        const sessionPoses = await Poses.find({name: { $in: session.poses }})
        res.status(StatusCodes.OK).json({session, sessionPoses});
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}