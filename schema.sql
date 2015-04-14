DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT, post TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update BEFORE UPDATE ON posts BEGIN
  UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;