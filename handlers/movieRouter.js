// canned error message
const errorMsg = { message: "Could not connect to database!"}

// returns all movies in the db
const allMovies = (app, Movie) => {
    app.get('/api/movies', (req, resp) => {
        Movie.find()
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            resp.json(errorMsg);
        });
    });
}

// returns all movies up to the specified limit number, returns message if number range invalid
const allMoviesLimit = (app, Movie) => {
    app.get('/api/movies/limit/:num', (req, resp) => {
        if(req.params.num > 0 && req.params.num  <= 200){
            Movie.find().limit(req.params.num)
            .then((data) => { 
                resp.json(data);
            })
            .catch((error) => {
                resp.json(errorMsg);
            });
        } else {
            resp.json({message: `Num limit must be between 1 and 200`});
        }
    });
}

// returns a single movie by its id, or a message if not found
const singleMovie = (app, Movie) => {
    app.get('/api/movies/:id', (req, resp) => {
        Movie.find({id: req.params.id})
        .then((data) => {
            if(data.length > 0){
                resp.json(data);
            } else {
                resp.json({message: `No movie with id: ${req.params.id} was found.`});
            }
            })
        .catch((error) => {
            resp.json(errorMsg);
        })
    })
}

module.exports = {
    allMovies,
    allMoviesLimit,
    singleMovie
};
