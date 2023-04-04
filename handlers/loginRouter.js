const passport = require('passport');

const setRoutes = (app, User) => {
    // if not login or not authenticated, go to the login page
    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/home');
        } else {
            res.render('login');
        }
    });

    // if the user is logged in, redirect them to the home page
    // otherwise, render the login page
    app.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('home');
        } else {
            const message = req.flash('error')[0];
            res.render('login', { message: message });
        }
    });

    // home page
    app.get('/home', (req, res) => {
        if (req.isAuthenticated()) {
            const message = req.flash('success')[0];
            res.render('home', { user: req.user, message: message });
        } else {
            res.redirect('/');
        }
    });

    // submitting the form
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            // if the user cannot be authenticated when submitting the form, display error message
            if (!user) { 
                req.flash('error', info.message); 
                return res.redirect('/login'); 
            }
            // if the user is authenticated, display the login message and then redirect to home page
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                req.flash('success', info.message);
                return res.redirect('/home');
            });
        })(req, res, next);
    });

    // logout function which will destroy the login session
    app.post('/logout', (req, res) => {
        req.logout((err) => {
            if (err) { return next(err);}
            req.session.destroy((err) => {
                if (err) { return next(err); }
                return res.render('login', { message: 'You have successfully logged out.' });
            });
        });
    });
}

module.exports = {
    setRoutes
};


