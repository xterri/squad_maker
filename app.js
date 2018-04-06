'use strict';

const express       = require('express');
const bodyParser    = require('body-parser'); // handles HTTP POST requests
const config        = require('config');
const guesser       = require('./src/fingerGuess');

const parseData     = require('./src/parseData');
const makeSquads    = require('./src/makeTeams');

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
app.use(express.static('public'));

/*** SQUAD-MAKER / MAIN PAGE ***/
app.route('/')
    .get(function(req, res) {
        results.title = "Squad Maker";
        results.squads = "";
        // [OPTIONAL] implement an "upload" JSON file section in the code so custom/test files can be uploaded

        // page is loaded, parse the data
        let players = results.players ? results.player : parseData(playerData.players);

        results.waitlist = players;
        results.nbrOfPlayers = players.length; // max. nbr of teams that can be formed
        
        res.render('index', results); // arg1 = ejs/html, objects/data to pass
    })
    .post(function(req, res) {
        results.title = "Squad Maker";
        results.squadNbr = parseInt(req.body.squadNbr);
        let players = req.body.playersList ? req.body.playersList : parseData(playerData.players);
        results.nbrOfPlayers = players.length; 

        if (results.squadNbr) {
            let returnSquad;

            // must repopulate the waitlist values each time post is clicked
            results.waitlist = players; 
            
            returnSquad = makeSquads(results);
            results.squads = returnSquad.squads;
            results.waitlist = returnSquad.waitlist;

            res.render('index', results);
        }
        else {
            res.redirect("/");
        }
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

let port = process.env.PORT || PORT; // production uses different port
console.log("Server listening on port " + port);
app.listen(port);