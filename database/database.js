const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '85pA[izp]366',
    database: 'library'
});

db.connect((err) =>{
    if (err) throw err;
    console.log("Connected to MySql Server");
});

exports.query = function(sql, callback) {
    db.query(sql, callback);
}