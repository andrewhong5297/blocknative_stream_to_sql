const sqlite3 = require('sqlite3').verbose(); 
const express = require("express");
const app = express();

const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

let db = new sqlite3.Database('./db/artblocks.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

//create table once, then insert into table after webhook each time
// db.serialize(() => {
// db.each(`SELECT PlaylistId as id,
//                 Name as name
//             FROM playlists`, (err, row) => {
//     if (err) {
//     console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
// });
// });

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });