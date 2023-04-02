const controller = require('./loginController.js');

const login = (app, User) => {
    // if not login
    app.get('/', (req, res) => {
        res.render('login');
    });

    // if login successfuly
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        // if the user exists
        controller.getBcrypt(User, username)
            .then((password_bcrypt) => {
                if (password_bcrypt !== null) {
                    // User exists, check if password match
                    controller.authenticate(password, password_bcrypt)
                        .then((result) => {
                            if (result) {
                                res.render("login", { error: "Correct password." });
                            } else {
                                res.render("login", { error: "Incorrect password." });
                            }
                        })
                } else {
                    // User does not exist
                    res.render("login", { error: "User does not exists." });
                }
            })
    });
}

module.exports = {
    login
};
