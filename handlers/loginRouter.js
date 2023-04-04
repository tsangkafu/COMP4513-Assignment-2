const controller = require('./loginController.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const login = (app, User) => {
    // Configure session middleware
    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    
    // if not login or not authenticated, go to the login page
    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/home');
        } else {
            res.render('login');
        }
    });
    
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
        (username, password, done) => {
            controller.getBcrypt(User, username)
                .then((user) => {
                    // User exists, check if password match
                    if (user !== null) {
                        controller.authenticate(password, user.password_bcrypt)
                            .then((result) => {
                                if (result)
                                    return done(null, user);
                                else
                                    return done(null, false, { message: 'Incorrect password.' });
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

    // here define successful/fail login behavior
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
    }), (req, res, next) => {
        const message = req.flash('error')[0];
        res.render('login', { message });
    });

    // if the user is logged in, redirect them to the home page
    // otherwise, render the login page
    app.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/home');
        } else {
            const message = req.flash('error')[0];
            res.render('login', { message });
        }
    });

    // home page
    app.get('/home', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('home', { user: req.user });
        } else {
            res.redirect('/');
        }
    });

    // logout function which will destroy the login session
    app.post('/logout', (req, res) => {
        req.logout((err) => {
            if (err) { return next(err); }
            req.session.destroy((err) => {
                if (err) { return next(err); }
                    return res.render('login', { message: 'You have successfully logged out.' });
            });
        });
    });
      
    

}

module.exports = {
    login
};


