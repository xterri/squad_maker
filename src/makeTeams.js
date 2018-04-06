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

    console.log(playersArr);
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
        teamResults.squads[i][0] = playersArr[i];
        nbrOfPlayers--;
        k = i;
    }
    
    // populate the team with the rest of the players
    for (i = 0; i < squadNbr && nbrOfPlayers; i++) {
        var skateAvg = teamResults.squads[i][0]['skating'];
        var shootAvg = teamResults.squads[i][0]['shooting'];
        var checkAvg = teamResults.squads[i][0]['checking'];

        if (i + 1 === squadNbr && nbrOfPlayers) {
            i = 0;
            j++;
        }
        for (var j = 1; j <= maxPlayers; j++) {
            if (j === maxPlayers) {
                let avgScore = teamResults.squads[i];
                let avgObjects = {
                    name: 'Average',
                    skating: Math.floor(skateAvg / j),
                    shooting: Math.floor(shootAvg / j),
                    checking: Math.floor(checkAvg / j)
                }
                avgScore.push(avgObjects);
            } else {
                teamResults.squads[i][j] = playersArr[++k];
                skateAvg += playersArr[k]['skating'];
                shootAvg += playersArr[k]['shooting'];
                checkAvg += playersArr[k]['checking'];
            }            
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