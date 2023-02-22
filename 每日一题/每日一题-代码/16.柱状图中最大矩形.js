var largestRectangleArea = function (heights) {
    const len = heights.length;
    const minLeft = new Array(len);
    const maxRight = new Array(len);
    minLeft[0] = -1;
    for (let i = 1; i < len; i++) {
        let t = i - 1;
        while (t >= 0 && heights[t] >= heights[i]) {
            t = minLeft[t];
        }
        minLeft[i] = t;
    }
    maxRight[len - 1] = len;
    for (let i = len - 2; i >= 0; i--) {
        let t = i + 1;
        while (t < len && heights[t] >= heights[i]) {
            t = maxRight[t];
        }
        maxRight[i] = t;
    }
    let maxArea = 0;
    for (let i = 0; i < len; i++) {
        let sum = heights[i] * (maxRight[i] - minLeft[i] - 1);
        maxArea = Math.max(maxArea, sum);
    }
    return maxArea;
};

var largestRectangleArea_0 = function (heights) {
    let maxArea = 0;
    const stack = [];
    heights = [0, ...heights, 0]; // 数组头部加入元素0 数组尾部加入元素0
    for (let i = 0; i < heights.length; i++) { // 只用考虑情况一 当前遍历的元素heights[i]小于栈顶元素heights[stack[stack.length-1]]]的情况
        while (heights[i] < heights[stack[stack.length - 1]]) { // 当前bar比栈顶bar矮
            const stackTopIndex = stack.pop(); // 栈顶元素出栈，并保存栈顶bar的索引
            let w = i - stack[stack.length - 1] - 1;
            let h = heights[stackTopIndex]
            // 计算面积，并取最大面积
            maxArea = Math.max(maxArea, w * h);
        }
        stack.push(i); // 当前bar比栈顶bar高了，入栈
    }
    return maxArea;
};


const heights = [2, 1, 5, 6, 2, 3];

(function () {
    console.log('动态规划', largestRectangleArea(heights))
    console.log('单调栈', largestRectangleArea_0(heights))
})();