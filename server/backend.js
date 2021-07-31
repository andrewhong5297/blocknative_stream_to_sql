const sqlite3 = require('sqlite3').verbose(); 
const express = require("express");
const bp = require('body-parser')
const path = require('path');
const ngrok = require('ngrok');
const { send } = require('process');

const app = express();
app.use(bp.json()) //idk why it says deprecated, someone let me know in issue or PR
app.use(bp.urlencoded({ extended: true }))

const user = process.env.USER;
const password = process.env.PASSWORD;

const db = new sqlite3.Database('./db/mempool.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {

        db.run('CREATE TABLE mempool ( \
            event_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            tx_hash NVARCHAR(66)  NOT NULL,\
            status NVARCHAR(10)  NOT NULL,\
            sender NVARCHAR(42) NOT NULL,\
            gas_limit INTEGER NOT NULL,\
            eth_value INTEGER NOT NULL,\
            gas_price INTEGER NOT NULL\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            // testing purposes before you setup get/post stuff
            let insert = 'INSERT INTO mempool (tx_hash, status, sender, gas_limit, gas_price, eth_value) VALUES (?,?,?,?,?,?)';
            db.run(insert, ["0x67b77db0d5022a91a46095cbdeba82deef8337b90e12f5171a830ef50cfb465d", "successful", "0xa55E01a40557fAB9d87F993d8f5344f1b2408072", "1397818","10","0.1"]);
        });
    }
});

app.get("/", (req, res, next) => { 
    return res.status(200).send({ message: 'ok' });
})

app.post("/newMint/", (req, res, next) => {
    const reqBody = req.body;
    
    db.run(`INSERT INTO mempool (tx_hash, status, sender, gas_limit, gas_price, eth_value) VALUES (?,?,?,?,?,?)`,
        [reqBody.hash, reqBody.status, reqBody.from, reqBody.gas, reqBody.gasPrice/1e18, reqBody.value/1e18], //contractCall and params are harder to parse due to internal txs. Should only be internal if confirmed. 
        function (err, result) {
            if (err) {
                console.log("error ", err.message)
                res.status(400).json({ "error": err.message })
                return;
            }
            console.log("new_entry ", reqBody.hash)
            res.status(201).json({
                "event_id": this.lastID,
                "tx_hash": reqBody.hash
            })
        });
});

const server = app.listen(8000, () => {
    console.log('Express listening at ', server.address().port);
})

ngrok.connect({
    proto : 'http',
    addr : 8000
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    } else {
        console.log('Tunnel Created -> ', url);
        console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
    }
});

