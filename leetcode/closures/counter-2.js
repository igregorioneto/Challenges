/**
 * 
 * @param {integer} init 
 * @returns { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    var initial = init;
    var increment = function() {
        return ++init;
    }

    var decrement = function() {
        return --init;
    }

    var reset = function() {
        init = initial;
        return init;
    }

    return { increment, decrement, reset }
}

const counter = createCounter(5);
console.log(counter.increment());
console.log(counter.reset());
console.log(counter.decrement());