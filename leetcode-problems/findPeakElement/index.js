// 162. Find Peak Element


// we will take that part that is increasing as for sure there will be one peak present in that part
var findPeakElement = function(nums) {
    if (nums.length === 1) return 0;
    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left+right)/2);

        if(nums[mid] > nums[mid+1])
            right = mid;
        else
            left = mid + 1;
    }
    return left;
};