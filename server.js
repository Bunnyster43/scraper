var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var db = require("./models");

var PORT = process.env.PORT || 8000;

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper");

require('./routes/routes.js')(app);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});