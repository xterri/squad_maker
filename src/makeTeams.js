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
    let i, k, j;
    let maxPlayers = Math.floor(nbrOfPlayers / squadNbr);
    let maxPlayersNeeded = maxPlayers * squadNbr;
    // teamResults.waitlist = players not on a team
    // teamResults.squads = []; array of teams/squads formed
    teamResults.squads = [];
    teamResults.waitlist = [];

    // init each squad Array
    i = 0; 
    while (i < squadNbr) {
        teamResults.squads[i++] = [];
    };

    // populate the team with the players
    for (i = 0, k = 0; k < maxPlayersNeeded; i++) {
        let tmp = 0;
        while (tmp < squadNbr) {
            teamResults.squads[tmp][i] = [];
            //  console.log('squad[' + tmp + '][' + i + '] = ' + playersArr[k].name);
            teamResults.squads[tmp][i] = playersArr[k++];
            tmp++;
        }
    }
    // rest of the players not on a team go on the waitlist
    for (i = 0; k < nbrOfPlayers; i++) {
        teamResults.waitlist.push(playersArr[k++]);
    }

    // get squad averages
    for (i = 0; i < squadNbr; i++) {
        let  skateAvg = 0, 
            shootAvg = 0, 
            checkAvg = 0;
        for (j = 0; j <= maxPlayers; j++) {
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
                let player = teamResults.squads[i][j];
                
                skateAvg += player['skating'];
                shootAvg += player['shooting'];
                checkAvg += player['checking'];
            }
        }
    }

    return teamResults;
}

module.exports = (squadData) => {  
    let sortedArr = distanceToAvg(squadData.waitlist);
    let results = makeTeams(sortedArr, squadData.squadNbr, squadData.nbrOfPlayers);

    return results;
}