/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    let res = []
    nums.sort((a, b) => a - b)
    const dfs = (path, visited) => {
        if (path.length === nums.length) {
            res.push(Array.from(path))
        }
        for (let i = 0; i < nums.length; i++) {
            if (visited[i]) {
                continue;
            }
            if (i > 0 && nums[i] === nums[i - 1] && visited[i - 1] == true) {
                continue
            }
            visited[i] = true;
            path.push(nums[i])
            dfs(path, visited)
            path.pop()
            visited[i] = false;
        }
    }
    dfs([], [])
    return res
};