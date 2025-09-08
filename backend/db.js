const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("mydatabase.db", (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to database");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);
});


module.exports = db;