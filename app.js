require("./config/express");
const connection = require("./config/mongoose");
const config = require("./config/config")


const db = require("./models/tutorial.model");
console.log(config.url);
connection
    .connect(config.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });