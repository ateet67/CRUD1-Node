module.exports = app => {
    const auth = require("../controllers/auth.controller");

    var router = require("express").Router();

    // Create a new User
    router.post("/login", auth.login);

    app.use('/api/auth', router);
};