// common node module
const path = require("path");

// express
const express = require("express");
const app = express();
// using EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
// use the public directory
app.use(express.static(path.join(__dirname, 'public')));

// db connection
const db = require("./database");
db.connect();

// other third-party libraries
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// models and handlers
const Movie = require("./models/Movie");
const movieRouter = require('./handlers/movieRouter.js');
const User = require("./models/User");
const loginRouter = require("./handlers/loginRouter.js")

// start the server
app.listen(8080, () => {
    console.log("Server started on port 8080");
})

//routes to the api
movieRouter.allMovies(app, Movie);
movieRouter.allMoviesLimit(app, Movie);
movieRouter.singleMovie(app, Movie);
movieRouter.movieYearRange(app, Movie);
movieRouter.movieRatingRange(app, Movie);

// routes to the login page
loginRouter.login(app, User);
