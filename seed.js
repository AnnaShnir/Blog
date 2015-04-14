var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('posts.db');
db.run("INSERT INTO posts (title, post) VALUES (?, ?), (?, ?)",
  'First Post', 'Welcome to the most useless blog ever...',
  'Second Post', 'Still, nothing cheering here.',
  function(err) {
    if (err) {
      throw err;
    }
  });