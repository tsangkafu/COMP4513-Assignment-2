const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: Number,
    tmdb_id: Number,
    imdb_id: String,
    release_date: String,
    runtime: Number,
    revenue: Number,
    tagline: String,
    poster: String,
    backdrop: String,
    ratings: {
        popularity: Number,
        average: Number,
        count: Number
    },
    details: {
        overview: String,
        genres: [{
            id: Number,
            name: String
        }]
    }
});

module.exports = mongoose.model('Movie', movieSchema);