'user strict';

const express       = require('express');
const bodyParser    = require('body-parser'); // handles HTTP POST requests
const config        = require('config');

// get playerData from config/default.js
const playerData = require('./test/' + config.get('playerData'));

const PORT = 5000;

// set up server side with express 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required to serve static files from multiple directories
    // https://stackoverflow.com/questions/29619721/add-stylesheet-to-express-app
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('public/index.html', { root: __dirname });
});

let port = process.env.PORT || PORT; // production uses differen port
console.log("Server listening on port " + port);
app.listen(port);