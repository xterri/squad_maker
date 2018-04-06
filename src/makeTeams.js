/*
** Sort and put players on a squad
*/

// create array(s) to sort user's skill levels
function sortSkillLevel(skillData) {
    // sort each category
    let skateArr = [];
    let shootArr = [];
    let checkArr = [];

    // let user sort by any field in list/obj
    let sort_by = (field, reverse) => {
        let key = function(x) { return x[field] };
        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b - a));
        }
    }

    // sort into arrays
    let sortSkills = (data, field) => {
        let arr = [];
        let avg = 0;
        let i;

        data.sort(sort_by(field, false));

        for (i = 0; i <= skillData.nbrOfPlayers; i++) {
            let key = data[i];
            let tmp = {};

            // add avg skill scored
            if (i === skillData.nbrOfPlayers) {
                tmp['name'] = field.toUpperCase() + ' AVG';
                tmp[field] = Math.floor(avg / i);
            } else {
                tmp['name'] = data[i].name;
                tmp[field] = data[i][field];
                avg += tmp[field];
            }
            arr.push(tmp);
        }
        return arr;
    };

    skateArr = sortSkills(skillData.players, 'skating');
    shootArr = sortSkills(skillData.players, "shooting");
    checkArr = sortSkills(skillData.players, "checking");
    // console.log(skateArr);
    console.log('\n', shootArr);
    // console.log('\n', checkArr);

    /* COMPARE PLAYERS AND MAKE TEAMS */
    let checkBelowAvg = true;
    let tmpSquads = [];
    let maxPlayers = Math.floor(skillData.nbrOfPlayers / skillData.squadNbr);

   // for (var j = 0; j < skillData.nbrOfPlayers; j++) {
        //tmpSquads[j] = [];
        let k = 0;
        let track = 0;
        let max = skillData.nbrOfPlayers;
        let tmpMax = max - 1;
        let individualAvg = shootArr[max]['shooting'];
        let teamAvg = 0;

        while (track < maxPlayers) {    
            if (track % 2 === 0) {
                console.log(shootArr[k]['name']);
                teamAvg += shootArr[k]['shooting'];
                k++;
            } else {
                console.log(shootArr[tmpMax]['name']);
                teamAvg += shootArr[tmpMax]['shooting'];
                tmpMax--;
            }
            track++;
        }

        if (checkBelowAvg && (teamAvg / maxPlayers) <= individualAvg) {
            console.log('teamAvg: ', teamAvg / maxPlayers);
            console.log('individualAvg: ', individualAvg);
        } else {
            console.log('ya done fucked up');
            console.log('teamAvg: ', teamAvg / maxPlayers);
            console.log('individualAvg: ', individualAvg);
        }
    //}

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

    for (i = 0, k = i; i < squadNbr; i++) {
        teamResults.squads[i] = [];
        for (var j = 0; j < maxPlayers; j++, k++) {
            teamResults.squads[i][j] = playersArr[k];
        }
    }

    // rest of the players not on a team go on the waitlist
    for ( ; k < nbrOfPlayers; k++)
        teamResults.waitlist.push(playersArr[k]);

    return teamResults;
}

module.exports = (squadData) => {
    // algorithm to decide how to form teams
    sortSkillLevel(squadData);
    // make the teams
}