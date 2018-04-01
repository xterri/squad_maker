var userNbr;
const errorMsg = document.getElementById('error')

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
document.getElementById("submit").onclick = () => {

    let guess;
    let count = 0;

    userNbr = document.getElementById("userNbr").value;

    if (isNbr(userNbr) && userNbr) {
        userNbr = Math.floor(Number(userNbr));

        if (userNbr > 5 || userNbr < 0) {
            errorMsg.innerHTML = "";
            errorMsg.innerHTML = "Please Enter a POSITIVE number between 0 and 5";
        } else {
            while (guess != userNbr) {
                guess = Math.floor(Math.random() * 6);
                count++;
            }
            errorMsg.innerHTML = "";
            document.getElementById("reveal").innerHTML = guess + " ";
            document.getElementById("attempts").innerHTML = count + " ";
        }
    } else {
        errorMsg.innerHTML = "";
        errorMsg.innerHTML = "Please Enter a valid WHOLE Number";
    }
}