var express = require("express");
var mongoose = require('mongoose');
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var app = express();


var methodOverride = require('method-override');

app.use(express.static("public"));

app.use(logger("dev"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./Routes/scraper_controller.js");
app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articles";
mongoose.Promise = Promise;
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

app.listen(PORT, function () {
    console.log("App running on port 3000!");
});