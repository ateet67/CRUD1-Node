const exrciseController = require("../controllers/exrcise.controller");
let router = require("express").Router();

module.exports = app => {
    
    // Retrieve all Actors
    router.post("/", exrciseController.findAll);

    // Retrieve a single Actor with id
    // router.get("/:id", actors.findOne);

    app.use('/api/exrcise', router);
};