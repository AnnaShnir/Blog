var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('posts.db');
db.run("INSERT INTO posts (user, author, title, post, tag) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)",
  'Juliana', 'dungbeatle', 'First Roll', 'Welcome to the hive...', 'beatles',
  'Emily', 'bumblebee', 'Useless knowledge', 'Still, nothing cheering here.', 'bees',
  function(err) {
    if (err) {
      throw err;
    }
  });
db.run("INSERT INTO users (user, author) VALUES (?, ?), (?, ?)",
	'Natalia', 'dragonfly',
	'Ruth', 'caterpillar',
	function(err) {
		if (err) {
			throw err;
		}
	});
