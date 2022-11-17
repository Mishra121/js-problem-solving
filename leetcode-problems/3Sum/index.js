// 15. 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]

var threeSum = function(nums) {
    if(nums.length < 3) return [];
    const output = [];

    nums.sort((a,b) => a - b);

    console.log({nums});

    for(let i = 0; i < nums.length - 2; i++) {
        // we don't want repeats, so skip numbers we've already seen
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i+1;
        let right = nums.length-1;

        while (left < right) {
            const sum = nums[i] + nums[right] + nums[left];

            if(sum===0) {
                output.push([nums[i], nums[left], nums[right]]);
                while(nums[left]===nums[left+1]) left++;
                while(nums[right]===nums[right-1]) right--;
                left++;
                right--;
            } else if (sum > 0) {
               right--;
            } else {
                left++;
            }
        }
    }

    return output;
};

console.log(threeSum([-1,0,1,2,-1,-4]))
