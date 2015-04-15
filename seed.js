var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('posts.db');
db.run("INSERT INTO posts (user, author, title, post, tag) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)",
  'Juliana', 'dungbeetle', 'First Roll', 'Welcome to the hive...',
  'Emily', 'bumblebee', 'Useless knowledge', 'Still, nothing cheering here.',
  function(err) {
    if (err) {
      throw err;
    }
  });