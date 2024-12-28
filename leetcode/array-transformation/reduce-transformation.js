
/**
 * 
 * @param {number[]} nums 
 * @param {Function} fn 
 * @param {number} init
 * @return {number} 
 */
var reduce = function(nums, fn, init) {
    let val = init;
    for (let i = 0; i < nums.length; i++) {
        val = fn(val, nums[i]);
    }
    return val;
}

function sum1(accum, curr) {
    return accum + curr;
}

function sum2(accum, curr) { 
    return accum + curr * curr; 
}

function sum3(accum, curr) {
    return 0;
}

var nums = [1,2,3,4];
console.log(reduce(nums, sum1, 0))
console.log(reduce(nums, sum2, 100))
console.log(reduce(nums, sum3, 25))