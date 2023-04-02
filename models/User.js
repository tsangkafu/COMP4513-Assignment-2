const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    details: {
        firstname: String,
        lastname: String,
        city: String,
        country: String
    },
    picture: {
        large: String,
        thumbnail: String
    },
    membership: {
        date_joined: Date,
        last_Update: Date,
        likes: Number
    },
    email: String,
    password_bcrypt: String,
    apikey: String,
    favorites: Array
});

module.exports = mongoose.model('User', userSchema, 'user');