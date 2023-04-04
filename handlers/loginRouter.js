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

    // here define successful/fail login behavior
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
    }), (req, res, next) => {
        const message = req.flash('error')[0];
        res.render('login', { message });
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
    setRoutes
};


