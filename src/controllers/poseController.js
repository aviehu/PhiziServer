// src/controllers/pose.controller.js
const { StatusCodes } = require("http-status-codes");
const Pose = require('../models/poseModel');

exports.getPose = async (req, res) => {
    try {
        const pose = await Pose.findOne({name: req.params.name});
        if (!pose) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Pose does not exist: ${req.params.name}` });
        }
        res.status(StatusCodes.OK).json(pose);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.deletePose = async (req, res) => {
    try {
        const pose = await Pose.findOneAndDelete({name: req.params.name});
        if (!pose) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Pose does not exist: ${req.params.name}` });
        }
        res.status(StatusCodes.OK).json(pose);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.addPose = async (req, res) => {
    try {
        const pose = new Pose({
            name: req.body.name,
            goals: req.body.goals,
            keypoints: req.body.keypoints,
        });
        await pose.save();
        res.status(StatusCodes.CREATED).json(pose);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.updatePose = async (req, res) => {
    try {
        const pose = await Pose.findOneAndUpdate(
            { name: req.params.name },
            {
                $set: {
                    goals: req.body.goals,
                    keypoints: req.body.keypoints
                }
            },
            { new: true }
        );
        if (!pose) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Pose does not exist: ${req.params.name}` });
        }
        res.status(StatusCodes.OK).json(pose);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

exports.getAllPoses = async (req, res) => {
    try {
        const poses = await Pose.find();
        res.status(StatusCodes.OK).json(poses);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};