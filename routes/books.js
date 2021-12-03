const express = require('express');
const path = require('path');

const booksController = require(path.resolve(__dirname, '../controllers/booksController'));
const router = express.Router();

router.get('/:bookid', booksController.getBook);

module.exports = router;