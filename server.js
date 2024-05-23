const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5557;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = new sqlite3.Database('../bot.db', err => {
    if (err) {
        console.error('Failed to open database:', err);
        return;
    }
    db.run("PRAGMA journal_mode=WAL;", err => {
        if (err) {
            console.error("Failed to set PRAGMA journal_mode:", err);
        }
    });
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS faq
        (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            name    TEXT,
            email   TEXT,
            phone   TEXT,
            message TEXT
        )`);

app.post('/faq', (req, res) => {
    const {name, email, phone, comment} = req.body;
    console.log(name, email, phone, comment);
    db.run('INSERT INTO faq (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone, comment],
        function (err) {
            if (err) {
                console.error('Failed to insert data into database:', err);
                res.status(500).send('Failed to save data.');
            } else {
                console.log('Data inserted successfully with id:', this.lastID);
                res.status(200).send('Data saved successfully.');
            }
        }
    );
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
