'user strict';

const express       = require('express');
const bodyParser    = require('body-parser'); // handles HTTP POST requests
const config        = require('config');
const guesser       = require('./src/fingerGuess');

const parseData     = require('./src/squadMaker');

// get playerData from config/default.js
const playerData = require('./test/' + config.get('playerData'));

const PORT = 5000;
var results = {};

// set up server side with express 
const app = express();

// body-parser = can use key/val pairs in req.body (ex. getting user's input from post)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using templating language, EJS
app.set('view engine', 'ejs');

// required to serve static files from multiple directories
    // https://stackoverflow.com/questions/29619721/add-stylesheet-to-express-app
app.use(express.static('public'));

/*** SQUAD-MAKER / MAIN PAGE ***/
app.route('/')
    .get(function(req, res) {
        results.title = "Squad Maker";

        // [OPTIONAL] implement a "upload" JSON file section in the code so custom/test files can be uploaded

        // as soon as page is loaded, get & parse the data
            // parsing may not be necessary but will be helpful to use later w/ everything set
        let players = parseData(playerData.players);

        results.players = players;
        
        res.render('index', results); // arg1 = ejs/html, objects/data to pass
    })
    .post(function(req, res) {
        results.title = "Squad Maker";

        res.render('index', results);
});

/*** FINGERS GAME PAGE ***/
app.route('/fingers')
    .get(function(req, res) {
        results.title = "Fingers Game";
        results.guess = "___";
        results.count = "___";
        results.errorMsg = "";

        res.render('fingers', results);
    })
    .post(function(req, res) {
        let results = guesser(req.body.test);
        results.title = "Fingers Game";

        res.render('fingers', results);
});

let port = process.env.PORT || PORT; // production uses differen port
console.log("Server listening on port " + port);
app.listen(port);

//https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b