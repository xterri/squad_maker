const sortBy        = require('./sortBy');

// Calculate players' total averages & find the mean distance for each one
function distanceToAvg(playersArr) {
    let totalPlayersAvg = 0;

    for (key in playersArr) {
        let totalAvg = 0;
        let player = playersArr[key];

        totalAvg += player.shooting;
        totalAvg += player.skating;
        totalAvg += player.checking;

        player.average = totalAvg;
        totalPlayersAvg += totalAvg;
    }
    totalPlayersAvg = Math.floor(totalPlayersAvg / playersArr.length);

    for (key in playersArr) {
        playersArr[key].meanDistance = playersArr[key]['average'] - totalPlayersAvg;
    }
    playersArr.sort(sortBy('meanDistance', false, 'closestToZero'));

    return playersArr;
};

// Put players on a team
function makeTeams(playersArr, squadNbr, nbrOfPlayers) {
    let teamResults = {};

    // teamResults.waitlist = players not on a team
    // teamResults.squads = []; array of teams/squads formed
    let i, k;
    let maxPlayers = Math.floor(nbrOfPlayers / squadNbr);
    teamResults.squads = [];
    teamResults.waitlist = [];

    // populate squads with players with the lowest mean distance
    for (i = 0; i < squadNbr; i++) {
        teamResults.squads[i] = [];
        // for (var j = 0; j < maxPlayers; j++, k++) {
            teamResults.squads[i][0] = playersArr[i];
        // }
        k = i;
    }
    
    // populate the team with the rest of the players
    for (i = 0; i < squadNbr; i++) {
        for (var j = 1; j < maxPlayers; j++) {
            teamResults.squads[i][j] = playersArr[++k];
        }
    }

    // rest of the players not on a team go on the waitlist
    for (i = 0; ++k < nbrOfPlayers; i++) {
        teamResults.waitlist.push(playersArr[k]);
    }
    return teamResults;
}

module.exports = (squadData) => {  
    let sortedArr = distanceToAvg(squadData.waitlist);
    let results = makeTeams(sortedArr, squadData.squadNbr, squadData.nbrOfPlayers);

    return results;
}