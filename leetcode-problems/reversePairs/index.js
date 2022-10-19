// 493. Reverse Pairs
// Input: nums = [1,3,2,3,1]
// Output: 2
// Explanation: The reverse pairs are:
// (1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
// (3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1

var reversePairs = function(nums) {
    return mergeSort(nums, 0, nums.length - 1);
};

function mergeSort(nums, low, high) {
    if(low >= high) return 0;
    let mid = Math.floor((low + high) / 2);
    let inv = mergeSort(nums, low, mid);
    inv += mergeSort(nums, mid + 1, high);
    inv += merge(nums, low, mid, high);
    return inv;
}

function merge(nums, low, mid, high) {
    let count = 0;
    let j = mid + 1;

    for(let i = low; i <= mid; i++) {
        while(j<=high && nums[i] > 2*nums[j]) j++;
        count += (j - (mid + 1)); // count of pairs in particular merge call
    }

    let temp = [];
    let left = low, right = mid + 1;

    while(left <= mid && right <= high) {
        if(nums[left] <= nums[right]) temp.push(nums[left++]);
        else temp.push(nums[right++]);
    }

    while(left <= mid) temp.push(nums[left++]);

    while(right <= high) temp.push(nums[right++]);

    for(let i=low; i<=high; i++) nums[i] = temp[i - low];

    return count;
}


module.exports = {
    reversePairs
}