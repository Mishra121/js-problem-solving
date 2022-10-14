// Input: nums = [1, 3, 4, 2, 2], Output: 2   (Floyd's Cycle Finding Algorithm)

function findDuplicate(nums) {

    let p1=nums[0], p2=nums[nums[0]];

    while(p1!=p2) {
        p1 = nums[p1];
        p2 = nums[nums[p2]];
    }

    p2 = 0;

    while(p1!=p2) {
        p1 = nums[p1];
        p2 = nums[p2];
    }

    return p1;
};


module.exports = {
    findDuplicate,
};