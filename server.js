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
var db = new sqlite3.Database('posts.db');
//request
var request = require('request')

//routes

//idiot test
app.get('/', function(req, res){
	res.redirect('/index')
});

// show all posts
app.get("/index", function(req, res) {
	db.all("SELECT * FROM posts;", function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var posts = data;
			console.log(posts);
		}
		res.render("index.ejs", {posts: posts});

	});

});

//show one post from the database
app.get("/post/:id", function(req, res) {
	var id = req.params.id
	db.get("SELECT * FROM posts WHERE id = ?", id, function(err, data) {
		console.log(data);
		res.render("post.ejs")
	});
});

//serve a new page to create a blog post
app.get("/posts/new", function(req, res) {
	res.render("new.ejs");
});
//create a new post from form
app.post("/posts/new", function(req, res) {
	console.log(req.body);
	db.add("INSERT INTO posts (user, author, title, post, tag) VALUES (?, ?, ?, ?, ?)", function(err, data) {
		console.log(data);
	});
	res.redirect("/");  //to the main page after the post has been submitted
});

//edit existing post from the database, serving the edit page first


// delete post
app.delete("post/id:", function(req, res) {
	db.delete("DELETE FROM posts WHERE title = ?", function(err, data) {
		console.log(data);
	});
});













app.listen('3000')
console.log("the humming of nature on a warm spring evening is actually the sound of thousands of insects trying to find a mate")