/**
 * 
 * @param {number} n 
 * @returns {Function} counter
 */
var createCounter = function(n) {

    return function() {
        return n++
    }
}

const counter = createCounter(10);
console.log(counter())
console.log(counter())
console.log(counter())
console.log(counter())
console.log(counter())