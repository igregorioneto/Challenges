
/**
 * 
 * @param {number[]} arr 
 * @param {Function} fn
 * @param {number[]} 
 */
var filter = function(arr, fn) {
    var ar = []
    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            ar.push(arr[i])
        }
    }
    return ar
}

/**
 * 
 * @param {number} n 
 * @returns {boolean}
 */
function greaterThan10(n) { return n > 10; }

/**
 * 
 * @param {number} n 
 * @param {number} i 
 * @returns {boolean}
 */
function firstIndex(n, i) { return i === 0; }

/**
 * 
 * @param {number} n 
 * @returns {boolean}
 */
function plusOne(n) { return n + 1 }

var arr = [0,10,20,30]
console.log(filter(arr, greaterThan10))
console.log(filter(arr, firstIndex))
console.log(filter(arr, plusOne))
