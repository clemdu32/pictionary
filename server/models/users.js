const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const UserSchema = new Schema({
    email: String,
    pwd: String,
    pseudo: String,
    isAdmin: Boolean
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
