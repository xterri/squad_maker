/*
** Where the magic happens
*/

// Get player data from JSON file
    // Pull all the data and list the players as is from the JSON file
    // { name: data.firstName + data.lastName, skating: data.skills.type.skating, ... }
var getData = (data) => {
    let returnObj = [];

    for (i in data) {
        let player = data[i];
        let obj = {};

        obj.name = player.firstName + " " + player.lastName;

        player.skills.forEach((skill) => {
            let type = skill.type.toLowerCase();

            // not necessary to check b/c JSON file should all be the same
                // but handle in case categories are out of order
            if (type === 'shooting')
                obj.shooting = skill.rating;
            else if (type === 'skating')
                obj.skating = skill.rating;
            else if (type === 'checking')
                obj.checking = skill.rating;
        });
        returnObj[i] = obj;
    };
    return (returnObj);
};

module.exports = getData;