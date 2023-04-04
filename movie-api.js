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

// other third party libraries
const flash = require('connect-flash');
app.use(flash());

// models and handlers
const Movie = require("./models/Movie");
const User = require("./models/User");
const movieRouter = require('./handlers/movieRouter.js');
const loginRouter = require("./handlers/loginRouter.js");

// controllers
const loginController = require('./handlers/loginController.js');
loginController.passportInit(app);
// pass in the user model to the login method in the controller
loginController.login(User);

// start the server
app.listen(8080, () => {
    console.log("Server started on port 8080");
})

// routes to the login page
loginRouter.setRoutes(app, User);

// force the user to login before using the APIs
app.use('/api/movies', loginController.isAuthenticated);

//routes to the api
movieRouter.allMovies(app, Movie);
movieRouter.allMoviesLimit(app, Movie);
movieRouter.singleMovie(app, Movie);
movieRouter.movieYearRange(app, Movie);
movieRouter.movieRatingRange(app, Movie);
movieRouter.movieTitle(app, Movie);
movieRouter.movieGenre(app, Movie);