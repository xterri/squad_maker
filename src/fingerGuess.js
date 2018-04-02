const errorMsg = "";

var isNbr = function(str){
	var i = 0;
    
    if (str) {
		while (str[i]) {
		    if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z') || str[i] === ' ' || str[i] === '\t')
			    return false;
			i++;
        }
    	return true;
	} 
    return false;
};

// need an event to occur before being able to get values
module.exports = (userNbr) => {

    let guess;
    let count = 0;

    if (isNbr(userNbr) && userNbr) {
        userNbr = Math.floor(Number(userNbr));

        if (userNbr > 5 || userNbr < 0) {
            errorMsg = "Please Enter a POSITIVE number between 0 and 5";
        } else {
            while (guess != userNbr) {
                guess = Math.floor(Math.random() * 6);
                count++;
            }
            return { guess, count, errorMsg };
        }
    } else {
        errorMsg = "Please Enter a valid WHOLE Number";
    }
    return errorMsg;
}