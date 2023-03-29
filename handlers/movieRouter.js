const allMovies = (app, Movie) => {
    app.get('/api/movies', (req, resp) => {
        Movie.find()
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            resp.json({message: error});
        });
    });
}

module.exports = {
    allMovies
};
