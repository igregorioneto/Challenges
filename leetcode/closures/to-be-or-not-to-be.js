/**
 * 
 * @param {string} val
 * @return {Object} 
 */
var expect = function(val) {
    var toBe = function(n) {
        if (val === n) return true
        throw "Not Equal"
    }

    var notToBe = function(n) {
        if (val !== n) return true
        throw "Equal"
    }

    return { toBe, notToBe }
}

try {
    console.log({value: expect(5).toBe(5)});
} catch (error) {
    console.log( { error: error.message })
}

try {
    console.log({value: expect(5).notToBe(5)});
} catch (error) {
    console.log({ error: error })
}

try {
    console.log({value: expect(5).toBe(null)});
} catch (error) {
    console.log({ error: error })
}

try {
    console.log({value: expect(5).notToBe(null)});
} catch (error) {
    console.log({ error: error })
}

//console.log(expect(5).toBe(5));
//console.log(expect(5).notToBe(5));
//console.log(expect(5).toBe(null));
//console.log(expect(5).notToBe(null));