const bcrypt = require("bcrypt");

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
        bcrypt.compare(password, password_bcrypt, function(err, result) {
            err? rej(err) : res(result);
        })
    })
}

module.exports = {
    getBcrypt,
    authenticate
};