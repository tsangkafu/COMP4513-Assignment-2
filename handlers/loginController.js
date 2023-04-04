const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require("bcrypt");

const passportInit = (app) => {
    // Configure session middleware
    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

const login = (User) => {
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
        (username, password, done) => {
            getBcrypt(User, username)
                .then((user) => {
                    // User exists, check if password match
                    if (user !== null) {
                        authenticate(password, user.password_bcrypt)
                            .then((success) => {
                                // if the password matches
                                if (success) {
                                    return done(null, user, { message: 'You have successfully logged in.' });
                                } else {
                                    return done(null, false, { message: 'Incorrect password.' });}
                            }) 
                    } else {
                        // User does not exist
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                })
                .catch((err) => {
                    return done(err);
                });
        }
    ));

    // The serializeUser and deserializeUser methods are used to
    // convert user objects to and from a unique identifier
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

// if the user exists, return the user object
const getBcrypt = (User, username) => {
    return new Promise ((res, rej) => {
        User.find({email: username})
            // return the bcrypt if user exists else return null
            .then((data) => data.length > 0 ? res(data[0]) : res(null))
            .catch((err) => rej(err));
    })
}

// returning true or false indicating if the password matches
const authenticate = (password, password_bcrypt) => {
    // if user exists, compare the digest
    return new Promise ((res, rej) => {
        bcrypt.compare(password, password_bcrypt, function(err, success) {
            err? rej(err) : res(success);
        })
    })
}

// add middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    req.isAuthenticated()? next() : res.render('login', {message : "Please login before using APIs."});
}

module.exports = {
    login,
    passportInit,
    getBcrypt,
    authenticate,
    isAuthenticated,
};