const path = require('path');
const database = require(path.resolve(__dirname, '../database/database'));

exports.search = function(req, res) {
    const p = req.query;
    if (p.text && p.sort && p.subject && p.datestart && p.dateend && p.minrating && p.available && p.pagemin && p.pagemax) {
        database.query('CALL getSearchResults(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.text, p.sort, p.subject, p.datestart, p.dateend, parseFloat(p.minrating), p.available == 1 ? 0 : -1, parseInt(p.pagemin), parseInt(p.pagemax)],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).end();
            }
        });
    }
};

exports.getBook = function(req, res) {
    if (req.params.bookid && !isNaN(parseInt(req.params.bookid))) {
        const bookID = parseInt(req.params.bookid);
        database.query("SELECT * FROM books WHERE book_id = ?",
        [bookID],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).end();
            }
        });
    }
};