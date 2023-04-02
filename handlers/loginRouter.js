const login = (app, User) => {
    // if not login
    app.get('/', (req, res) => {
        res.render('login');
    });

    console.log(User.find());

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        // Check if username and password are correct
        if (username === 'myusername' && password === 'mypassword') {
            res.send('Logged in successfully!');
        } else {
            res.send('Incorrect username or password.');
        }
    });
}

module.exports = {
    login
};
