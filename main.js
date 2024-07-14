const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'sysdev_recruitment'
});

const HOST = 'localhost';
const PORT = 3000;

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL: ', err);
        return;
    }
    
    console.log('Successfully connected to MySQL!')
});


app.get('/programming_languages', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const queryText = 'SELECT * FROM programming_languages';
    
    connection.query(queryText, (err, results) => {
        if (err) {
            console.log('Error fetching data from MySQL: ', err);
            res.end('Error fetching data from MySQL');
        }
        res.json(results);
    });
});

app.get('*', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<p>Go to: <a href='http://${HOST}:${PORT}/programming_languages'>http://${HOST}:${PORT}/programming_languages</a></p>`);
});

app.listen(PORT, HOST, () => {
    console.log('Listening...');
});