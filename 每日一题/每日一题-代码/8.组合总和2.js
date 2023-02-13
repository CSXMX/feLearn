var combinationSum2 = function (candidates, target) {
    let res = []
    candidates.sort((a, b) => a - b)
    const dfs = (sum, path, inx) => {
        if (sum === target) {
            res.push(Array.from(path))
            return
        }
        for (let i = inx; i < candidates.length; i++) {
            if (i > inx && candidates[i] === candidates[i - 1]) {
                continue;
            }
            if (sum > target) {
                break;
            }
            path.push(candidates[i]);
            sum += candidates[i];
            dfs(sum, path, i + 1)
            path.pop();
            sum -= candidates[i];
        }
    }
    dfs(0, [], 0)
    return res;
};


(function () {
    const candidates = [10, 1, 2, 7, 6, 1, 5];
    const target = 8;
    console.log('组合总和', combinationSum2(candidates, target));
})()