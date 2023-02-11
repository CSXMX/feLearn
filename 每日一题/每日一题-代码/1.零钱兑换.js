// 解法1
var coinChange_0 = function (coins, amount) {
    if (amount === 0) {
        return 0;
    }
    /**
     * 暴力美学,回溯大法，先得出结果
     * 1. 可以把整个过程想像成一棵树，coins数组的长度为n，初始节点的值为amount
     * 2. 每个节点最多有n个子节点，子节点的值为amount-coins[i]
     * 3. 当子节点小于0时，即为叶子节点，计算值为0的叶子节点的高度，取最小值。
     * */
    let min = Infinity;
    const dfs = (sum, coins, height) => {
        if (sum < 0) {
            return;
        } else if (sum == 0) {
            min = Math.min(min, height)
            return;
        } else {
            for (let coin of coins) {
                dfs(sum - coin, coins, height + 1)
            }
        }
    }
    dfs(amount, coins, 0)
    return min === Infinity ? -1 : min
};

/**
 * 解法2
 * 不用怀疑，上面解法必定是超时的。
 * 那么如何优化时间复杂度呢？以空间换时间，这是常用的办法。
 * 在回溯的过程中，其实是有很多子问题是被重复计算的。
 * 
 * 例如,coins = 【1，2，5】，amount = 11
 * 初始节点的值：11，高度为1的子节点的值：10，9，6
 * 这个大问题的结果 = 三个子问题的结果 + 1
 * 
 * 即 假设已知amount = 10，9，6 时的问题结果，3个结果取最小值，即为amount = 11的结果。
 */
var coinChange_1 = function (coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity)
    const dfs = (sum, coins) => {
        if (sum <= 0) {
            return sum;
        }
        if (dp[sum] !== Infinity) {
            return dp[sum]
        } else {
            let min = Infinity;
            for (let coin of coins) {
                let res = dfs(sum - coin, coins)
                if (res >= 0 && res < min) {
                    min = res + 1;
                }
            }
            dp[sum] = min == Infinity ? -1 : min;
            return dp[sum];
        }
    }
    return dfs(amount, coins)
};
/**
 * 解法3
 * 回顾解法2，其实就是一棵递归树，由上到下计算，记录子问题的答案，可以叫记忆化搜索
 * 其实从叶子节点反过来去找初始节点，自下而上，就是我们常说的动态规划问题
 * 
 * 例如,coins = 【1，2，5】，amount = 11
 * dp[0]= 0, dp[1] = 1, dp[2] = 1,dp[5] = 1
 * dp[3] = 最小值(dp[2] + 1, dp[1] + 1) = 2
 * ……
 * 由此可知，转移方程 dp[j] = min（ amount -  dp[j - coins[i]]）+ 1
 * */

var coinChange = function (coins, amount) {
    if (amount === 0) {
        return 0;
    }
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};

const fn = (coins, amount) => {
    console.log('硬币:', coins);
    console.log('目标金额:', amount);
    // console.log('最少硬币数（暴力回溯）:', coinChange_0(coins, amount));
    console.log('最少硬币数（记忆化搜索）:', coinChange_1(coins, amount));
    console.log('最少硬币数（动态规划）:', coinChange(coins, amount));
}
// fn([1, 2, 5], 11)
fn([186, 419, 83, 408], 6249)