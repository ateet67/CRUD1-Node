const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("node:fs");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("../routes/user.routes")(app);
// require("../routes/auth.routes")(app);

for (const f of fs.readdirSync("./routes")) {
  require(`../routes/${f}`)(app);
}


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;