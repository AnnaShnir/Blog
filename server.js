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
		//loop through the user array in the dropdown menu
		db.all("SELECT user FROM users", function(err, data) {
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
	var currentUser = req.body.users;
	var user = req.body.newcritter;
	var id = req.params.id;

	if (req.body.newcritter != null && req.body.newcritter !="") {
		db.run("INSERT INTO users (user) VALUES ( ?)", user, function(err, data) {
			// console.log(data)
			res.redirect("/index");
		});
	} else {
		db.all("SELECT user FROM users WHERE id =?", id, function(err, data) {
			res.redirect("/index");
		});
	}
});


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
	db.get("SELECT posts.id, posts.post, users.user FROM posts, users Where posts.id = ? AND users.id = posts.user_id", id, function(err, data) {
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
	var body = req.body.post;
	var title = req.body.title;

	db.run("UPDATE posts SET title = ?, post = ? WHERE id = ?", title, body, id, function(err, data) {
		// console.log(data)
		res.redirect("/index");
	});
});


//serve a new page to create a blog post
app.get("/post/new", function(req, res) {
	db.all("SELECT * FROM users;", function (err, data) {
		if (err) {
			console.log(err);
		} else {
			var users = data;
		}

		res.render("new.ejs", {users: users});
	});

});


//create a new post from form
app.post("/new", function(req, res) {
	var title=req.body.title;
	var post=req.body.post;
	var tag=req.body.tag;
	var user = req.body.user;

	console.log(req.body);
	
	db.run("INSERT INTO posts (user_id, title, post, tag) VALUES (?, ?, ?, ?)", user, title, post, tag,
		function(err) {
		res.redirect("/index");
	});  //to the main page after the post has been submitted
});


// delete post
app.delete("/editPost/:id", function(req, res) {
	var id = req.params.id;
	console.log('DELETE!')
	db.run("DELETE FROM posts WHERE id = ?", id, function(err, data) {
		res.redirect("/index");
	});
});





app.listen('3000')
console.log("the humming of nature on a warm spring evening is actually the sound of thousands of insects trying to find a mate");