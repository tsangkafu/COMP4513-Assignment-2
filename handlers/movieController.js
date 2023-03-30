// canned error message
const errorMsg = { message: "Could not connect to database!"}

// returns all movies in the db
const retrieveAll = (Movie, req, resp) => {
        Movie.find()
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            resp.json(errorMsg);
        });
}

// returns all movies up to the specified limit number, returns message if number range invalid
const retrieveAllLimit = (Movie, req, resp) => {
    if(parseInt(req.params.num) > 0 && parseInt(req.params.num)  <= 200){
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
}

// returns a single movie by its id, or a message if not found
const retrieveSingle = (Movie, req, resp) => {
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
}

// returns a single movie by its tmdb id, or a message if not found
const retrieveSingleTMDB = (Movie, req, resp) => {
    Movie.find({tmdb_id: req.params.id})
        .then((data) => {
            if(data.length > 0){
                resp.json(data);
            } else {
                resp.json({message: `No movie with tmdb_id: ${req.params.id} was found.`});
            }
            })
        .catch((error) => {
            resp.json(errorMsg);
        })
}

// finds movies in a range of either rating or years when specified, or returns a message if no matches found
const retrieveMinMax = (Movie, req, resp, type) => {
    if(parseInt(req.params.max) > parseInt(req.params.min)){

        let min;
        let max;

        if(type == "release_date"){
            // converts the years to string of the format for comparison
            min = req.params.min.toString().concat("-00-00");
            max = req.params.max.toString().concat("-00-00");
        } else {
            min = req.params.min;
            max = req.params.max;
        }
        
        Movie.find().where(type).gte(min).lte(max)
        .then((data) => { 
            if(data.length > 0){
                resp.json(data);
            } else {
                resp.json({message: `No movies found within specified ${type} range of ${req.params.min} and ${req.params.max}`});
            }
        })
        .catch((error) => {
            resp.json(errorMsg);
        });
    } else {
        resp.json({message: `Max must be larger than min`});
    }
}

module.exports = {
    retrieveAll,
    retrieveAllLimit,
    retrieveSingle,
    retrieveSingleTMDB,
    retrieveMinMax
}