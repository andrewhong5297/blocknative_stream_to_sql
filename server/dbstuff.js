const sqlite3 = require('sqlite3').verbose(); 
const express = require("express");
const bp = require('body-parser')

const app = express();
app.use(bp.json()) //idk why it says deprecated, someone let me know in issue or PR
app.use(bp.urlencoded({ extended: true }))

const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('./db/artblocks.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {

        db.run('CREATE TABLE artblock_mints( \
            event_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            tx_hash NVARCHAR(66)  NOT NULL,\
            status NVARCHAR(10)  NOT NULL,\
            sender NVARCHAR(42) NOT NULL,\
            projectId INTEGER NOT NULL,\
            gas_limit INTEGER NOT NULL,\
            gas_price INTEGER NOT NULL\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            // testing purposes before you setup get/post stuff
            // let insert = 'INSERT INTO artblock_mints (tx_hash, status, sender, projectId, gas_limit, gas_price) VALUES (?,?,?,?,?,?)';
            // db.run(insert, ["0x67b77db0d5022a91a46095cbdeba82deef8337b90e12f5171a830ef50cfb465d", "successful", "0xa55E01a40557fAB9d87F993d8f5344f1b2408072", "120", "1397818","10"]);
            // db.run(insert, ["0x67b77db0d5022a91a46095cbdeba82deef8337b90e12f5171a830ef50cfb465d", "cancelled", "0xa55E01a40557fAB9d87F993d8f5344f1b2408072", "120", "1397818","10"]);
            // db.run(insert, ["0x67b77db0d5022a91a46095cbdeba82deef8337b90e12f5171a830ef50cfb465d", "speed up", "0xa55E01a40557fAB9d87F993d8f5344f1b2408072", "120", "1397818","10"]);
        });
    }
});

app.get("/", (req, res, next) => { 
    return res.status(200).send({ message: 'ok' });
})

app.post("/newMint/", (req, res, next) => {
    const reqBody = req.body;
    // console.log(reqBody)
    db.run(`INSERT INTO artblock_mints (tx_hash, status, sender, projectId, gas_limit, gas_price) VALUES (?,?,?,?,?,?)`,
        [reqBody.tx_hash, reqBody.status, reqBody.sender, reqBody.projectId, reqBody.gas_limit, reqBody.gas_price],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "event_id": this.lastID,
                "tx_hash": reqBody.tx_hash
            })
        });
});