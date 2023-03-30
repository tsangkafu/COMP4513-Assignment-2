// canned error message
const movieController = require('./movieController.js');

// returns all movies in the db
const allMovies = (app, Movie) => {
    app.get('/api/movies', (req, resp) => {
        movieController.retrieveAll(Movie, req, resp);
    });
}

// returns all movies up to the specified limit number, returns message if number range invalid
const allMoviesLimit = (app, Movie) => {
    app.get('/api/movies/limit/:num', (req, resp) => {
        movieController.retrieveAllLimit(Movie, req, resp);
    });
}

// returns a single movie by its id, or a message if not found
const singleMovie = (app, Movie) => {
    app.get('/api/movies/:id', (req, resp) => {
        movieController.retrieveSingle(Movie, req, resp);
    });
}

// returns a single movie by its tmdbid, or a message if not found
const singleMovieTMDB = (app, Movie) => {
    app.get('/api/movies/tmdb/:id', (req, resp) => {
        movieController.retrieveSingleTMDB(Movie, req, resp);
    });
}

// returns movies within a specified range of years, or a message if no matches found
const movieYearRange = (app, Movie) => {
    app.get('/api/movies/year/:min/:max', (req, resp) => {
        movieController.retrieveMinMax(Movie, req, resp, "release_date");
    })
}

// returns movies within a specified range of ratings,  or a message if no matches found
const movieRatingRange = (app, Movie) => {
    app.get('/api/movies/ratings/:min/:max', (req, resp) => {
        movieController.retrieveMinMax(Movie, req, resp, "ratings.average");
    })
}

module.exports = {
    allMovies,
    allMoviesLimit,
    singleMovie,
    singleMovieTMDB,
    movieYearRange,
    movieRatingRange
};
