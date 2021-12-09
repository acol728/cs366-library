const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

const discoverRouter = require(path.resolve(__dirname, 'routes/discover'));
const accountRouter = require(path.resolve(__dirname, 'routes/account'));

app.use('/discover', discoverRouter);
app.use('/account', accountRouter);

app.use(express.static('public'))

app.listen(port, () => console.log(`Server started on port ${port}`));