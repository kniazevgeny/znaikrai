const express = require('express');
var https = require('https');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000;

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static content
app.use(express.static(STATIC));

// All GET request handled by INDEX file
app.get('*', function (req, res) {
    res.sendFile(INDEX);
});

// Start server
app.listen(PORT, function () {
    console.log('Server up and running on ', `http://localhost:${PORT}/`);
});
