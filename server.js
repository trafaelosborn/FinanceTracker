const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  MONGODB_URI ||
    "mongodb://budget:tracker1@ds133202.mlab.com:33202/heroku_90s5g5jl",
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App listening on : http://localhost:${PORT}`);
});