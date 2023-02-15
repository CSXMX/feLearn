## 1. 今日语录
思维定势，害人不浅。

## 2. 题目
** N皇后 **
按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。


## 3. 思路


这是一道很经典的回溯题目，通过遍历每一个位置，
对于可以放皇后的位置，有放皇后和不放皇后两个选项，这表明可以用树结构来模拟整个流程。

问题的难点在于如何判断该位置是否能放皇后。

根据国际象棋的规则，所以皇后一行最多放一个，所以 行的情况 不用考虑。

1. 固定列的索引值col，行索引值 [0,row-1]，遍历是否有皇后，有说明该位置不可选。

2. 一个位置有45、135、225、315 度 四个方向，225和315是在下半区，此时皇后还没放，所以肯定选。

3. 45 度：[row-1,col+1] -> [0,n-1]
   135度：[row-1,col+1] -> [0,0]

对于笔者在写这题时遇到的问题，感觉是犯了思维定势的错误,
对于下面这份代码，我一开始是真没看出来有什么区别。
```js
for (let i = 0, j = 0; i <= row - 1 && j <= col - 1; i++, j++) {
    if (dp[i][j] === 'Q') {
       return false
    }
}
for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (dp[i][j] === 'Q') {
        return false
    }
}
```
其实，这就是一个45度方向的箭头指向问题，
因为笔者思维只考虑了 类似 n * n 这种，从 [0,0]到[n,n] 和 [n,n]到[0,0]当然是可以等价的。
但是，在回溯过程中，除了中间对角线的情况，其他的斜线就完全走错方向了，
所以斜线的情况只能是 从当前位置出发 向45度、135度方向移动一个单位。

最后，这只是 N皇后问题 的 基础解法，后续待更新。

```js
var solveNQueens = function (n) {
    function isValid(row, col, chessBoard, n) {

        for (let i = 0; i < row; i++) {
            if (chessBoard[i][col] === 'Q') {
                return false
            }
        }

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (chessBoard[i][j] === 'Q') {
                return false
            }
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (chessBoard[i][j] === 'Q') {
                return false
            }
        }
        return true
    }

    function transformChessBoard(chessBoard) {
        let chessBoardBack = []
        chessBoard.forEach(row => {
            let rowStr = ''
            row.forEach(value => {
                rowStr += value
            })
            chessBoardBack.push(rowStr)
        })

        return chessBoardBack
    }

    let result = []

    function backtracing(row, chessBoard) {
        if (row === n) {
            result.push(transformChessBoard(chessBoard))
            return
        }
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backtracing(row + 1, chessBoard)
                chessBoard[row][col] = '.'
            }
        }
    }
    let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))
    backtracing(0, chessBoard)
    return result

};
```

## 4. 关键字

** 回溯、思维定势**