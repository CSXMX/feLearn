/**
 * 看到题目，我总是会想到高中的排列组合题。
 * 这类题目 其实很相似，本质都是 根据问题生成一棵树，终止的条件在题目里。
 * 算法的优化无非就是对这棵树进行剪枝，避免这棵树的野蛮生长，减少时间复杂度。
 * 
 * 解法1 搜索回溯
 * 
 * 对于这种回溯类的题目，我们基本上都会用到递归，
 * 而递归的终止条件往往就是解法的关键所在。
 * 
 * 在本题中，搜索组合的过程就是一棵树，candidates数组确定这棵树接下来的走向，
 * 
 * idx 代表 已经采用的组合 = candidates[0,idx)
 * 
 * 初始节点 = 0，当 累计值sum >= target时，递归结束。
 * 当 idx === candidates.length，组合耗尽，递归结束。
 * 
 * 因为 candidates的每一项可以 无限制重复被选取 ，所以这棵树接下来的走向就可以分为两类。
 * 
 * 一类是 画饼派，跳过当前选项，除了idx += 1，什么也没做。
 * 哈哈哈，其实是idx += 1后，交给下一层的做事派完成了。
 * 
 * 一类是 做事派，选择当前选项，开始累加选项值
 * */

var combinationSum_0 = function (candidates, target) {
    let res = []
    const dfs = (sum, path, idx) => {
        if (sum === target) {
            res.push(Array.from(path))
            return
        }
        if (sum > target) {
            return
        }
        if (idx === candidates.length) {
            return
        }
        dfs(sum, path, idx + 1)
        dfs(sum + candidates[idx], [...path, candidates[idx]], idx)
    }
    dfs(0, [], 0)
    return res
}




/**
 * 解法2 尝试剪枝优化
 * 在搜索回溯的过程中，sum > target的情况可能会比较多，
 * 这就会导致过多不必要的递归。
 * 
 * 如果我们在组合前对数组进行升序排列，前一个较小数字已经超了的话，
 * 后面就不需要再尝试了，可以提前终止递归，减少时间复杂度。
 * 
 */
function combinationSum_1(candidates, target) {
    const res = [];
    const path = [];
    candidates.sort((a, b) => a - b);

    const backtracking = (j, sum) => {
        if (sum === target) {
            res.push(Array.from(path));
            return;
        }
        for (let i = j; i < candidates.length; i++) {
            if (sum + candidates[i] > target) break;
            path.push(candidates[i]);
            sum += candidates[i];
            backtracking(i, sum);
            path.pop();
            sum -= candidates[i];
        }
    }

    backtracking(0, 0);
    return res;
}
(function () {
    const candidates = [8, 2, 3, 6, 7];
    const target = 7;
    console.log('组合总和', combinationSum_0(candidates, target));
    console.log('组合总和', combinationSum_1(candidates, target));
})()