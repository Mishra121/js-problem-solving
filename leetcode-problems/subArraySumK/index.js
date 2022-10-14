// 560. Subarray Sum Equals K
// Input: nums = [1,2,3], k = 3  | (using hashmap) prefix sum
// Output: 2

var subarraySum = function(nums, k) {
    let prevSum = new Map();
    let count = 0;
    let currSum = 0;

    for(let i = 0; i < nums.length; i++) {

        currSum = currSum + nums[i];

        if(currSum == k) count++;

        if(prevSum.has(currSum - k))
            count += prevSum.get(currSum - k);

        let prevSumCount = prevSum.get(currSum);
        if(prevSumCount == null)
            prevSum.set(currSum, 1);
        else
            prevSum.set(currSum, prevSumCount + 1);
    }

    return count;
};

module.exports = {
    subarraySum
};