// 907. Sum of Subarray Minimums
// Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.

// Input: arr = [3,1,2,4]
// Output: 17
// Explanation:
// Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4].
// Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
// Sum is 17.

var sumSubarrayMins = function(arr) {

    M = 10**9+7
    stack = [-1]
    res = 0
    arr.push(0)

    for(let i2 = 0; i2 < arr.length; i2++){
        while(arr[i2] < arr[stack[stack.length -1]]){
            i = stack.pop()
            i1 = stack[stack.length-1]
            Left = i - i1
            Right = i2 -i
            res += (Left*Right*arr[i])
        };
        stack.push(i2)
    };

    return res%M
};

console.log(sumSubarrayMins([3,1,2,4]))
