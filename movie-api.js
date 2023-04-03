const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const express = require("express");
const db = require("./database");

const app = express();

db.connect();

app.listen(8080, () => {
    console.log("Server started on port 8080");
})

const Movie = require("./models/Movie");

const movieRouter = require('./handlers/movieRouter.js');



app.use(express.urlencoded({extended: true}));

//routes
movieRouter.allMovies(app, Movie);
movieRouter.allMoviesLimit(app, Movie);
movieRouter.singleMovie(app, Movie);
movieRouter.movieYearRange(app, Movie);
movieRouter.movieRatingRange(app, Movie);
movieRouter.movieTitle(app, Movie);
movieRouter.movieGenre(app, Movie);
