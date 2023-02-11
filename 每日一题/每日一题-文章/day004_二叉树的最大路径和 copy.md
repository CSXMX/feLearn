## 1. 今日语录
把困难题拆成多个简单题，这也是生活的一部分。
## 2. 题目
二叉树的最大路径和

## 3. 思路

```js
/**
 * 先copy一份代码 如何根据数组 构建二叉树
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function buildTree(node) {
    // 若没有参数或数组长度为0，则视为空树
    if (!node || node.length === 0) {
        return null;
    }
    let arr = [...node]
    // 先将数组第一个元素 设置为根结点
    let root = new TreeNode(arr.shift());

    // 节点队列 陆续从数组中为节点添加左右叶子
    let nodeQueue = [root];

    // 当数组剩余仍有元素，则持续为最近的节点添加叶子
    while (arr.length > 0) {

        // 从节点数组头部取出节点 为了添加叶子备用
        let node = nodeQueue.shift();

        // 若数组中无元素，则视为无叶子可添加,返回即可
        if (!arr.length) {
            break;
        }

        // 先从节点数组中取一个元素 转化为节点 拼接为左叶子
        let left = new TreeNode(arr.shift());
        node.left = left;
        nodeQueue.push(left);

        // 每拼接一片叶子节点 重新判断剩余叶子数量 若无剩余视为拼接完毕
        if (!arr.length) {
            break;
        }

        // 左侧叶子拼完，右边一样的操作
        let right = new TreeNode(arr.shift());
        node.right = right;
        nodeQueue.push(right);
    }

    // 最后返回根结点，通过根结点就能得到整个二叉树的结构
    return root;
}
const arr = [-10, 9, 20, null, null, 15, 7]
const root = buildTree(arr)

/**
 * 题目 二叉树的最大路径和
 *
 * 看到二叉树 我往往会想到 递归、回溯、动态规划 这些词
 * 这类题目往往考验的是 程序员拆分问题的能力
 * 或者说 把大问题拆成小问题的能力
 * 
 * 以此题为例，二叉树的最大路径和 为 max
 * 如果是一个节点，max = 节点值
 * 如果是3个节点， [1,2,-2]，这时 根节点的大问题 就拆成了 两个节点的小问题。
 * 
 * 当左右子树不存在时，问题结果 = 0 
 * 当子树存在，但求和为负值时，这与 二叉树的最大路径和 理念 是冲突的，应该被舍弃，所以 问题结果 = 0
 * 
 * 当左右子树都存在，且结果一大一小时，取较大值
 * 加上根节点本身，也就是 二叉树的最大路径和 了
 * 
 * 捋清楚这一思路后，这题也就是easy题了
 */
var maxPathSum = function (root) {
    let maxSum = -Number.MAX_VALUE;
    const dfs = (root) => {
        if (root == null) {
            return 0;
        }
        let left = dfs(root.left);
        let right = dfs(root.right);
        let sum = left + right + root.val;
        maxSum = Math.max(sum, maxSum);
        let result = Math.max(left, right) + root.val;
        return result > 0 ? result : 0
    }
    dfs(root);
    return maxSum;
};

(function () {
    console.log(arr, '的最大路径和 = ', maxPathSum(root))
})()
```

## 4. 关键字

**二叉树，大问题变小问题，递归，回溯**