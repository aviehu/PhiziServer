
const { StatusCodes } = require("http-status-codes");
const Pose = require('../models/poseModel')

const poseController = {
    addPose : async (req, res) => {
        try {
            const pose = new Pose(req.body)
            await pose.save();
            res.status(StatusCodes.CREATED).json(pose);
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
}

module.exports = poseController