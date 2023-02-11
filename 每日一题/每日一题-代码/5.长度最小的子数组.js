const target = 7
const nums = [2, 3, 1, 2, 4, 3]

/**
 * 解法1 
 * 暴力法，永不过时,也很容易想到
 */
var minSubArrayLen_0 = function (target, nums) {
    if (!nums || nums.length == 0) {
        return []
    }
    let res = Infinity
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j]
            if (sum >= target) {
                res = Math.min(j - i + 1, res)
                break;
            }
        }
    }
    return res == Infinity ? 0 : res;
};

/**
 * 解法2 
 * 滑动窗口
 * 其实这题目有个细节，一个含有 n 个正整数的数组，
 * 这一性质 => 子数组多一个元素，sum必定增大，少一个元素，sum必定减小。
 * 
 * 这一定律得到确立后，我们就可以推导出 滑动窗口该如何运行？
 * 
 * 1. 设置滑动窗口的范围, sum < target
 * 2. 设立两个左边界l,右边界r，初始值 = 0
 * 3. 当 sum < target , 移动右边界
 * 4. 当 sum >= target , 满足条件， 统计 r - l 最小值, 移动左边界
 * 
 * 
 * 经过这道题应该能大概明白滑动窗口是个什么东西了，就是先定义一组满足条件的数据使其成为一个窗口，
 * 再通过滑动这个窗口来满足我们需要的条件，我们处理的数据就是窗口中的数据。
 */
var minSubArrayLen_1 = function (target, nums) {
    if (!nums || nums.length == 0) {
        return []
    }
    let res = Infinity
    let l = r = 0
    let sum = 0; //[l,r)的子数组总和
    while (r < nums.length) {
        sum += nums[r++]
        while (sum >= target) {
            res = Math.min(r - l, res);
            sum -= nums[l++];
        }
    }
    return res == Infinity ? 0 : res

};
(function () {
    console.log('nums', nums);
    console.log('target', target);
    console.log('长度最小的子数组（暴力法）', minSubArrayLen_0(target, nums));
    console.log('长度最小的子数组（滑动窗口）', minSubArrayLen_0(target, nums));
    // console.log('长度最小的子数组', minSubArrayLen(target, nums));
})()