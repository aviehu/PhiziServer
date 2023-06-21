const { StatusCodes } = require("http-status-codes");
const Message = require('../models/messageModel');
require('dotenv').config()

exports.addMessage = async (req, res) => {
    try {
        const { from, to,content } = req.body;
        const message = new Message(req.body)
        await message.save()
        res.status(StatusCodes.CREATED).json(message);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error });
    }
};

exports.markedAsRead = async (req, res) => {
    try {
        const message = await Message.findOneAndUpdate(
            { _id: req.body.id },
            {
                read: true
            },
            { new: true }
        );
        if (!message) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `message does not exist` });
        }
        res.status(StatusCodes.OK).json(message);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};


exports.getUserMessages = async (req, res) => {
    try {
        
        const messages = await Message.find({to: req.body.user});
        if (!messages) {
            return res.status(StatusCodes.OK).json([]);
        }
        res.status(StatusCodes.OK).json(messages);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};