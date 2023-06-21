const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: { type: String, required: true , min: 3, max:20},
    to: { type: String, required: true , min: 3, max:20},
    subject: { type: String},
    content: { type: String, required: true },
    read: { type: Boolean },
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;