const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const express = require("express");
const db = require("./database");

const app = express();

// connect to mongoDB
db.connect();

const Movie = require("./models/Movie");
const movieRouter = require('./handlers/movieRouter.js');

const User = require("./models/User");
const userRouter = require("./handlers/userRouter.js")

// using EJS (a node templating system)
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
// use the public directory
app.use(express.static(path.join(__dirname, 'public')));

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
userRouter.login(app);
