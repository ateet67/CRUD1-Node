const { authorize } = require("../middleware/auth");

module.exports = app => {
    const movies = require("../controllers/movie.controller");

    var router = require("express").Router();

    // Create a new Movie
    router.post("/", movies.create);

    // Retrieve all Movies
    router.get("/", movies.findAll);

    // Retrieve a single Movie with id
    router.get("/:id", movies.findOne);

    // Update a Movie with id
    router.put("/:id", movies.update);

    // Delete a Movie with id
    router.delete("/:id", movies.delete);

    // Delete all Movies
    router.delete("/", movies.deleteAll);

    // Get Actors By Movie Id 
    router.get("/GetActorsByMovieId/:id", movies.GetActorsByMovieId);

    app.use('/api/movies', authorize, router);
};