/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
var dailyTemperatures = function (temperatures) {
    let dp = new Array(temperatures.length).fill(0);
    let stack = []
    for (let i = temperatures.length - 1; i >= 0; i--) {
        // 当前温度 >= 栈顶位置的温度 ，出栈 
        while (stack.length && temperatures[i] >= temperatures[stack[stack.length - 1]]) {
            stack.pop();
        }
        // 此时栈顶对应的是 最近一天升温时间
        // 最小栈，栈对应的数组降序排列
        // console.log(i, stack)
        if (stack.length) {
            dp[i] = stack[stack.length - 1] - i;
        } else {
            dp[i] = 0;
        }
        stack.push(i)
    }
    return dp;
};
console.log(dailyTemperatures(temperatures));