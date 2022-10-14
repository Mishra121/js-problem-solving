let arr = [1,2,3,4,5];

// forEach Polyfill implementation
Array.prototype.pForEach = function(callback) {
    for(let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

arr.pForEach(function(num) {
    console.log(num);
});


// map polyfill implementation
Array.prototype.pMap = function(callback) {
    let res = [];

    for(let i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this));
    }

    return res;
}

const newArr = arr.pMap(elem => {
    return elem * 2
});
console.log(newArr); // [ 2, 4, 6, 8, 10 ]

// filter - It returns an array with all the elements that satisfy the condition passed into the callback function
// Polyfill implementation

Array.prototype.pFilter = function(callback) {
    let res = [];
    for(let i = 0; i < this.length; i++) {
        if(callback(this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
}

let result = arr.pFilter(elem => elem < 3);
console.log(result) // [ 1, 2 ]

// Reduce polyfill implementation
Array.prototype.pReduce = function(callback, initialValue) {
    var accumulator = initialValue === undefined ? undefined : initialValue
    console.log({accumulator})

    for(var i = 0; i < this.length; i++) {
        console.log({accumulator, i})
        if(accumulator != undefined) {
            accumulator = callback(accumulator, this[i], i, this)
        } else {
            accumulator = this[i]
        }
    }

    return accumulator;
}

result = arr.pReduce((prev, curr) => prev+curr, 0);
console.log(result); // 15

// Bind Polyfill - we use when we have to create a reference for a function (to refer a particular object to a given function we use bind).

Function.prototype.pBind = function(newThis) {
    var parentArgs = Array.prototype.slice.call(arguments, 1);
    return () => {
        let args = [...arguments, ...parentArgs];
        this.apply(newThis, args)
    }
}

let sum = function() {
    console.log(this.a + this.b);
};

sum() // NaN, undefined + undefined | window.a and window.b is undefined as this is window for now

let sumParam = {
    a: 10,
    b: 23,
}

sum = sum.pBind(sumParam);
sum() // this is sumParam, 33