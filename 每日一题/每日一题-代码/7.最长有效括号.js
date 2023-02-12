const s = "()(())"

/**
 * 解法1 动态规划
 * 根据题意，其实很容易判断出这是一道动态规划类型的题目。
 * 从第一个字符出发，每新增一个字符就可能改变 最长有效括号max 的值。
 * 找到其中规律，得到状态转移方案就成了解题的关键。
 * 
 * 1. 首先，易推出，只有增加右括号 ）, max才会有新增的可能。
 * 2. 第一种情况，易推出，当s[i] = ), s[i - 1] = ( 时, dp[i] = dp[i - 2] + 2
 * 3. 第二种情况，稍微复杂了些。
 *  以 ()(() 对应 s[0,4] 为例，此时，i = 5, s[i] = ')', dp[4] = 2
 *  此时 s[i-1] = s[4] = ')'，但是 s[ i - dp[i-1] - 1] = '(',
 *  这就形成了 (()()()……) 这种类型组合的最外层，所以 dp[i] += dp[i-1] + 2
 * 
 * 然而，这并不是足够的，因为 …… (()()()……) 的前半部分可能还存在括号匹配的情况，
 * 但因为 这种外层括号 在右括号到来前 一直没有形成包裹，造成 统计最长有效括号max值 中断了一部分。
 * 
 */
const longestValidParentheses_0 = (s) => {
    let dp = new Array(s.length).fill(0)
    let max = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                if (i >= 2) {
                    dp[i] = dp[i - 2] + 2;
                } else {
                    dp[i] = 2;
                }
            } else {
                if (s[i - 1 - dp[i - 1]] === '(') {
                    if (i - dp[i - 1] - 2 >= 0) {
                        dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2];
                    } else {
                        dp[i] = dp[i - 1] + 2;
                    }
                }
            }

        }
        max = Math.max(max, dp[i])
    }
    return max;
};


/**
 * 解法2 栈
 * 对于括号匹配类型的题目，栈的入栈 = 识别到左括号，左括号inx入栈
 * 栈的出栈 = 识别到右括号，完成一次匹配，栈顶的左括号inx出栈
 * 
 * 遇到右括号，先默认出栈，
 * 1. 如果栈为空，说明当前的右括号为没有被匹配的右括号，
 * 我们将其下标放入栈中，即 最后一个没有被匹配的右括号的下标。
 * 2. 如果栈不为空，当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」
 * 
 * 需要注意的是，如果一开始栈为空，第一个字符为左括号的时候我们会将其放入栈中，这样就不满足提及的「最后一个没有被匹配的右括号的下标」，
 * 为了保持统一，我们在一开始的时候往栈中放入一个值为 −1-1−1 的元素。
 **/
var longestValidParentheses_1 = function (s) {
    let max = 0;
    let stack = [-1];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i)
        } else {
            stack.pop()
            if (stack.length) {
                max = Math.max(i - stack[stack.length - 1], max)
            } else {
                stack.push(i)
            }
        }
    }
    return max
};

/**
 * 解法3 两个计数器
 * 采用两个计数器，分别统计左括号和右括号
 * 从左往右，当两个计数器相等时，统计最长有效括号。当右括号多于左括号时，计数器清零。
 * 但这种方法会漏掉，例如(()，即左括号个数始终占优的情况。
 * 
 * 为了解决这个问题，我们可以从右到左遍历，条件取反，
 * 而这种方法会漏掉，例如())，即右括号个数始终占优的情况。
 * 
 * 两者结合，即可答案。
 */
var longestValidParentheses_2 = function (s) {
    let maxLen = 0;
    let left = 0;
    let right = 0;
    for (let i = 0; i < s.length; i++) { //从左往右
        if (s[i] == "(") { //遇见'(' left++
            left++;
        } else {
            right++; //遇见')' right++
        }
        if (left == right) { //左右数量相同
            maxLen = Math.max(maxLen, 2 * left); //更新最大长度
        } else if (right > left) { //right大于left 重置left right 重新计数
            left = right = 0;
        }
    }
    left = right = 0;
    for (let i = s.length - 1; i >= 0; i--) { //从右往左
        if (s[i] == "(") {
            left++;
        } else {
            right++;
        }
        if (left == right) {
            maxLen = Math.max(maxLen, right * 2);
        } else if (left > right) {
            left = right = 0;
        }
    }
    return maxLen;
};

(function () {
    console.log(s, '最长有效括号(动态规划) = ', longestValidParentheses_0(s));
    console.log(s, '最长有效括号(栈) = ', longestValidParentheses_1(s));
    console.log(s, '最长有效括号(两个计数器) = ', longestValidParentheses_2(s));
})()