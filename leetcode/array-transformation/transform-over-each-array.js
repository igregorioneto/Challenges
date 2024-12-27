/**
 * 
 * @param {number[]} arr 
 * @param {Function} fn
 * @return {number[]} 
 */
var map = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = fn(arr[i], i)
    }
    return arr
};

/**
 * 
 * @param {number} n 
 * @return {number}
 */
var plusone = function(n) {
    return n + 1;
}

/**
 * 
 * @param {number} n 
 * @param {number} i 
 * @returns {number}
 */
function plusI(n, i) { return n + i; }

/**
 * 
 * @returns {number}
 */
function constant() { return 42; }

var arr = [1,2,3];
console.log(map(arr, plusone))
console.log(map(arr, plusI))
console.log(map(arr, constant))