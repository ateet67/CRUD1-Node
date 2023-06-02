const { authorize } = require("../middleware/auth");

module.exports = app => {
    const actors = require("../controllers/actor.controller");

    var router = require("express").Router();

    // Create a new Actor
    router.post("/", actors.create);

    // Retrieve all Actors
    router.get("/", actors.findAll);

    // Retrieve a single Actor with id
    router.get("/:id", actors.findOne);

    // Update a Actor with id
    router.put("/:id", actors.update);

    // Delete a Actor with id
    router.delete("/:id", actors.delete);

    // Delete all Actors
    router.delete("/", actors.deleteAll);

    // Get Moives By Actor Id
    router.get("/GetMoivesByActorId/:id", actors.GetMoivesByActorId);

    app.use('/api/actors', authorize, router);
};