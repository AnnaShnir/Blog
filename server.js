//app requirements
//express
var express = require('express')
var app = express();

//templating stuff
var ejs = require("ejs")
app.set("view engine", "ejs")
//body parser
var bodyParser = require('body-parser')
//tell app which method to use when parsing
app.use(bodyParser.urlencoded({extended: false}))

//method override setup
var methodOverride = require('method-Override')
//tell app which override method to use
app.use(methodOverride('_method'))

//allow sqlite3
var sqlite3 = require('sqlite3').verbose();
//set database
// var db = new sqlite3.Database('./db/movies.db');
//request
var request = require('request')

//routes

//idiot test
app.get('/', function(req, res){
	res.redirect('/index')
});
app.get("/index", function(req, res) {
	res.render("index.ejs", {posts: posts});
	console.log(req.body);
	console.log(res.body);
});



app.listen('3000')
console.log("Listening on port 3000")