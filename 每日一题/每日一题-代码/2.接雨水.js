var height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// var height = [4, 2, 0, 3, 2, 5]


/**
 * 解法1 按行求
 * 已知最高墙的高度为max，行数 i 为 [1,max]
 * 第 i 行，遍历 height 数组 ,索引 为 j
 * 如果两层有墙，满足 两侧墙的高度都 >= i, height[j] < i 两个条件，则 总水量 sum += 1
 * 
 * 当 i = 1时， height[j] = 0，说明该位置没有墙， 两侧墙的高度 >= 1，
 * 即只要两侧有墙，第一行此位置必定有水
 */
var trap_0 = (height) => {
    let max = Math.max(...height)
    let sum = 0;
    for (let i = 1; i <= max; i++) {
        let target = 0;
        let flag = false;
        for (let j = 0; j < height.length; j++) {
            if (flag && height[j] < i) {
                target++;
            }
            // 存在墙的高度 >= i
            // 左边墙：flag = true，此时 target 本次累计水量 应为0，后续逻辑不影响
            // 右边墙：target记录了height[j] < i的所有情况，每次水量+1，总水量 += 累计水量，累计水量统计后清零
            if (height[j] >= i) {
                flag = true
                sum += target
                target = 0
            }
        }
    }
    return sum
}

/**
 * 解法2 按列求
 * 只关注 当前列高度，左边最高的墙，右边最高的墙。
 * result = min（左，右）- 当前高度
 * 总水量 +=  result > 0 ? result : 0
 */
const trap_1 = (height) => {
    let sum = 0;
    // 边界肯定不会有水！
    for (let i = 1; i < height.length - 1; i++) {
        // 左边最高墙 0 -> i - 1
        let leftMax = Math.max(...height.slice(0, i))
        // 右边最高墙 i + 1 -> height.length - 1
        let rightMax = Math.max(...height.slice(i + 1, height.length))
        let result = Math.min(leftMax, rightMax) - height[i]
        if (result > 0) {
            sum += result
        }
    }
    return sum
}
/**
 * 解法3 
 * 老办法，以空间换时间
 * leftDp[i] 表示 左边最高墙 0 -> i - 1
 * rightDp[i] 表示 右边最高墙 i + 1 -> height.length - 1
 * 通过数组方法，记录结果
 */
const trap_2 = (height) => {
    let sum = 0;
    let leftDp = new Array(height.length).fill(-1)
    let rightDp = new Array(height.length).fill(-1)
    // 边界肯定不会有水！
    for (let i = 1; i < height.length - 1; i++) {
        // 左边最高墙 0 -> i - 1
        let leftMax, rightMax;
        if (leftDp[i] !== -1) {
            leftMax = leftDp[i]
        } else {
            leftMax = Math.max(...height.slice(0, i))
        }
        if (rightDp[i] !== -1) {
            rightMax = leftDp[i]
        } else {
            rightMax = Math.max(...height.slice(i + 1, height.length))
        }
        // 右边最高墙 i + 1 -> height.length - 1
        let result = Math.min(leftMax, rightMax) - height[i]
        if (result > 0) {
            sum += result
        }
    }
    return sum
}
/**
 * 解法4 双指针
 * 针对解法3，动态规划虽然减少了时间复杂度，但也提升了空间复杂度，那么有没有什么好办法呢？
 * 其实不难看出一个规律
 * 举例，i = 0, i = 1 ,i = 2, i = 3 4个位置的墙
 * leftMax[1] = height[0]
 * leftMax[2] = leftMax[1] 与 height[1] 中取较大值
 * leftMax[3] = leftMax[2] 与 height[2] 中取较大值
 * ……
 * 以此内推，其实我们只需要一个变量存储 左侧最高墙就行了
 * 同理可推出，右侧最高墙也是如此，但是 i 是从 height.length - 1 缩减的
 * 
 * 一个索引从左到右，一个索引从右到左，这就是双指针
 * 
 * 下面，我们需要确定两个指针的移动规律
 * 当 height[left] < height[right]时，
 * 可以确定 [0,left-1] leftMax 必定 小于 [right+ 1,height.length - 1] rightMax
 * 
 * 为什么呢？
 * 因为 left的增加、right的减少 依赖于 height[left] < height[right] 这个条件，
 * 
 * leftMax 的 结果 是由 height[left] 更新过来的
 * rightMax 的 结果 是由 height[right] 更新过来的
 * 
 * 所以 leftMax < rightMax === height[left] < height[right] 这两个条件是等价的
 * 
 * 为了方便理解，举个例子。
 * leftMax : 1 (上一轮),rightMax: 3（上一轮）, 所以left++。
 * left: 1, 2（ 2是新增 ）, right: 3 , leftMax : 1 (上一轮),rightMax: 3（上一轮），
 * 此时 height[left](2) < height[right](3), 
 * leftMax上一轮就是较小的，这一轮left这边又多了个较小值，所以肯定还是leftMax更小
 * 
 */
const trap_3 = (height) => {
    //双指针法，比较左右墙的较小高度，计算当前水的高度，累计值
    let leftMax = rightMax = 0
    let sum = 0
    let left = 0,
        right = height.length - 1;
    while (left < right) {

        if (height[left] < height[right]) {
            // console.log('l', leftMax - height[left]);
            leftMax = Math.max(leftMax, height[left])
            sum += leftMax - height[left]
            left++;
        } else {
            // console.log('r', rightMax - height[right]);
            rightMax = Math.max(rightMax, height[right])
            sum += rightMax - height[right]
            right--;
        }
    }
    return sum
}
/**
 * 解法5 单调栈
 * 
 *  这是一次全新的思路，从左到右，类似于括号匹配。
 *  1. 当前高度小于等于栈顶高度，入栈，指针后移。
 *  2. 当前高度大于栈顶高度，出栈，计算出当前墙和栈顶的墙之间水的多少.
 *  3. 直到当前墙的高度不大于栈顶高度或者栈空，然后把当前墙入栈，指针后移。
 * 
 * 计算水量方式：出栈，结果为peek, 栈顶和当前的墙高度，取较小值min
 * 栈顶 = 左括号，当前墙 = 右括号 , 长度为 distacne
 * 水量 = (min  - peek) * distance
 */
const trap_4 = (height) => {
    // 单调栈,从左到右,括号匹配的思想，按行计算
    let stack = []
    let cur = 0
    let sum = 0
    while (cur < height.length) {
        while (stack.length && height[cur] > height[stack[stack.length - 1]]) {
            //遇到高的墙，计算之前的积水
            let peek = height[stack[stack.length - 1]]
            // console.log('stack', stack);
            // console.log('value', stack.map(item => height[item]));
            stack.pop()
            // 坐标轴不是墙，停止
            if (stack.length === 0) {
                break;
            }
            let distance = cur - 1 - stack[stack.length - 1]
            let min = Math.min(height[cur], height[stack[stack.length - 1]])
            sum += (min - peek) * distance
        }
        stack.push(cur)
        cur++
    }
    return sum;
}
const fn = () => {
    console.log('高度', height);
    console.log('接雨水（按行求）:', trap_0(height));
    console.log('接雨水（按列求）:', trap_1(height));
    console.log('接雨水（动态规划，数组记忆）:', trap_2(height));
    console.log('接雨水（双指针）:', trap_3(height));
    console.log('接雨水（单调栈）:', trap_4(height));
}
fn()