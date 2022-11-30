function log (showVar) {
    console.log(showVar);
}

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


// sort() polyfill
Array.prototype.mySort = function(compareFn) {
    log("Inside our Array.sort implementation :)");

    return mergeSort(this);

    // Split the array into halves and merge them recursively
    function mergeSort(arr) {
        if(arr.length === 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        return merge(
            mergeSort(left),
            mergeSort(right)
        )
    }

    // compare the arrays item by item and return the concatenated result
    function merge(left, right) {
        let result = [];
        let indexLeft = 0;
        let indexRight = 0;

        while(indexLeft < left.length && indexRight < right.length) {
            let _left = left[indexLeft];
            let _right = right[indexRight];

            let compare;
            let compareFnDefault = (l, r) => l < r;
            if(compareFn)
                compare = composeCompareFn(compareFn(_left, _right))
            else
                compare = composeCompareFn(compareFnDefault(_left, _right))

            if(compare) {
                result.push(left[indexLeft]);
                indexLeft++;
            } else {
                result.push(right[indexRight]);
                indexRight++;
            }
        }

        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }

    function composeCompareFn(compareResult) {
        if(Math.sign(compareResult) == -1) return false
        if(Math.sign(compareResult) == 1) return true
        if(compareResult == 0) return false
    }
}

const list = [2, 5, 1, 3, 7, 2, 3, 8, 6, 3]
log(list.mySort());
log(list.mySort((a, b) => a - b))

const strSort = ["c", "a", "e"]
log(strSort.mySort())

// Inside our Array.sort implementation :)
// [
//   1, 2, 2, 3, 3,
//   3, 5, 6, 7, 8
// ]
// Inside our Array.sort implementation :)
// [
//   8, 7, 6, 5, 3,
//   3, 3, 2, 2, 1
// ]
// Inside our Array.sort implementation :)
// [ 'a', 'c', 'e' ]
