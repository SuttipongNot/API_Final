const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Initialize the app
const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',  // replace with your MySQL password
    database: 'db_miniprojectfinal'  // replace with your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// -------- ROUTES --------

// Get all Thai Celebrities
app.get('/thaiCelebrities', (req, res) => {
    const sql = 'SELECT * FROM ThaiCelebrities';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new Thai Celebrity
app.post('/thaiCelebrities', (req, res) => {
    const { ThaiCelebrities_Imagefile } = req.body;
    const sql = 'INSERT INTO ThaiCelebrities (ThaiCelebrities_Imagefile) VALUES (?)';
    db.query(sql, [ThaiCelebrities_Imagefile], (err, result) => {
        if (err) throw err;
        res.send('Thai celebrity added!');
    });
});

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const { username, password, Role_ID } = req.body;
    const sql = 'INSERT INTO Users (username, password, Role_ID) VALUES (?, ?, ?)';
    db.query(sql, [username, password, Role_ID], (err, result) => {
        if (err) throw err;
        res.send('User added!');
    });
});

// Get all roles
app.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM Role';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new role
app.post('/roles', (req, res) => {
    const { Type_Name } = req.body;
    const sql = 'INSERT INTO Role (Type_Name) VALUES (?)';
    db.query(sql, [Type_Name], (err, result) => {
        if (err) throw err;
        res.send('Role added!');
    });
});

// Get all similarity records
app.get('/similarity', (req, res) => {
    const sql = 'SELECT * FROM similarity';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a similarity record
app.post('/similarity', (req, res) => {
    const { similarity_Date, similarityDetail_userimage, similarityDetail_Percent, ThaiCelebrities_ID } = req.body;
    const sql = 'INSERT INTO similarity (similarity_Date, similarityDetail_userimage, similarityDetail_Percent, ThaiCelebrities_ID) VALUES (?, ?, ?, ?)';
    db.query(sql, [similarity_Date, similarityDetail_userimage, similarityDetail_Percent, ThaiCelebrities_ID], (err, result) => {
        if (err) throw err;
        res.send('Similarity record added!');
    });
});

// Get all age records
app.get('/age', (req, res) => {
    const sql = 'SELECT * FROM age';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add an age record
app.post('/age', (req, res) => {
    const { age_Imageuser, age_Date, age_Percent, age_result } = req.body;
    const sql = 'INSERT INTO age (age_Imageuser, age_Date, age_Percent, age_result) VALUES (?, ?, ?, ?)';
    db.query(sql, [age_Imageuser, age_Date, age_Percent, age_result], (err, result) => {
        if (err) throw err;
        res.send('Age record added!');
    });
});

// -------- START SERVER --------
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
