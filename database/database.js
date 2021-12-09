const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library',
    dateStrings: true
});

db.connect((err) =>{
    if (err) throw err;
    console.log("Connected to MySql Server");
});

module.exports = db;