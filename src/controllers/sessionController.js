// src/controllers/pose.controller.js
const { StatusCodes } = require("http-status-codes");
const Session = require('../models/sessionModel');

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
        const session = await Session.findOneAndDelete({name: req.params.name});
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
        const session = new Session({
            name: req.body.name,
            description: req.body.description,
            difficulty: req.body.difficulty,
            poses: req.body.poses
        });
        await session.save();
        res.status(StatusCodes.CREATED).json(session);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.updateSession = async (req, res) => {
    try {
        const session = await Session.findOneAndUpdate(
            { name: req.params.name },
            {
                $set: {
                    description: req.body.description,
                    difficulty: req.body.difficulty,
                    poses: req.body.poses
                }
            },
            { returnOriginal: false }
        );
        if (!session) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Session does not exist: ${req.params.name}` });
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