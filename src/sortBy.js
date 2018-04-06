/*
** Sort by any field in a list of object
*/ 

module.exports = (field, reverse, method) => {
    let key = function(x) { return x[field] };
    reverse = !reverse ? 1 : -1;

    if (method === 'closestToZero') {
        return function (a, b) {
            a = key(a);
            b = key(b);  
            if (a < 1 && b >= 1) return -1;
            if (a >= 1 && b < 1) return 1;
            return (Math.abs(1 - a) - Math.abs(1 - b));
        }
    } else {
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b - a));
        }
    }
}