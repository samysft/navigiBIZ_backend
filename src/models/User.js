// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, enum: ['consumer', 'company'], required: true },
    photo: { type: String, required: false },
    ceoName: { type: String }, // Fields specific to companies
    location: { type: String },
    websiteLink: { type: String },
    description: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

