const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
    avatar: String
});

module.exports = mongoose.model('User', UserSchema);