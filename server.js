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
var methodOverride = require('method-override')
//tell app which override method to use
app.use(methodOverride('_method'))

//app.use(express.cookieParser('S3CRE7'));
//app.use(express.cookieSession());

//allow sqlite3
var sqlite3 = require('sqlite3').verbose();
//set database
var db = new sqlite3.Database('posts.db');
//request
var request = require('request')

//routes

app.get("/", function(req, res) {
	res.redirect("/newUser");
});

//serve a page to create new user or choose the existing one
app.get("/newUser", function(req, res) {
		//if dropdown is selected, choose this used id and and assign a temporary variable that will carry throughout the session
		//if all new user fields have input, "create new user button" can be pushed, thereby adding a new user into the list;
		//select from database all users and have them as objects in the array
		//loop through the user array in the dropdown menu
		db.all("SELECT user FROM posts", function(err, data) {
			if (err) {
				console.log(err);
			} else {
				var users = data;
			}
			res.render("newUser.ejs", {users: users});
		});
		
		console.log("user incoming");
});


app.post("/newUser", function(req, res) { 
	var currentUser = req.body.users
	console.log(currentUser);
	res.redirect("/index");
	// show all post
	});
	// //create entirely new post
	// app.post("/new", function (req, res))

app.get("/index", function (req, res) {
	db.all("SELECT * FROM posts;", function (err, data) {
		if (err) {
			console.log(err);
		} else {
			var posts = data;
				// console.log(posts);
			}

			res.render("index.ejs", {posts: posts});
	});

});



//show one post from the database
app.get("/posts/:id", function (req, res) {
	var id = req.params.id;
	db.get("SELECT * FROM posts Where id = ?", id, function(err, data) {
		res.render("individualPost.ejs", { post: data})
	});
});

//updating posts, first serve an update page, the app.put to edit the actual post
app.get("/editPost/:id", function (req, res) {
	var id = req.params.id;

	db.get("SELECT * FROM posts WHERE id = ?", id, function(err, data) {
		console.log(data);
		res.render("editPost.ejs", { post: data });
	});
});


	
//edit the post
app.put("/editPost/:id", function (req, res) {
	var id = req.params.id;

	db.run("UPDATE posts SET user = ?, author = ?, title = ?, post = ?, tag = ? WHERE id = ?", id,  function(err, data) {
		console.log(data)
		res.render("editPost.ejs", { post: data });
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
app.delete("/post/:id", function(req, res) {
	var id = req.params.id;
console.log('DELETE!')
	db.run("DELETE FROM posts WHERE id = ?", id, function(err, data) {
		console.log(data);
	});
});













app.listen('3000')
console.log("the humming of nature on a warm spring evening is actually the sound of thousands of insects trying to find a mate")