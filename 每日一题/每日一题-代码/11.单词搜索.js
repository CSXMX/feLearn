var exist = function (board, word) {
    const dfs = (i, j, k) => {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] !== word[k]) {
            return false;
        }
        if (k === word.length - 1) {
            return true;
        }
        board[i][j] = ''; //标记为已经找过了
        let res = dfs(i - 1, j, k + 1) || dfs(i, j - 1, k + 1) ||
            dfs(i + 1, j, k + 1) || dfs(i, j + 1, k + 1);
        board[i][j] = word[k]; //结果得到，返回
        return res;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
}
const board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"]
]
const word = "ABCCED"
console.log(exist(board, word));