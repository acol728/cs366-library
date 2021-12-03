const path = require('path');
const database = require(path.resolve(__dirname, '../database/database'));

exports.getBook = function(req, res) {
    if (req.params.bookid && !isNaN(parseInt(req.params.bookid))) {
        const bookID = parseInt(req.params.bookid);
        const sql = `SELECT * FROM books WHERE bookID=${bookID}`
        database.query(sql, (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result && result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).end();
            }
        });
    }
};