const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true , min: 3, max:20},
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    bmi: { type: Number },
    goals: { type: [String] },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
