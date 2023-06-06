module.exports = app => {
    const auth = require("../controllers/auth.controller");

    var router = require("express").Router();

    // Create a new User
    router.post("/login", auth.login);

    //Forgot password
    router.post("/forgotPassword", auth.forgotPassword);

    app.use('/api/auth', router);
};