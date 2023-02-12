const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
const k = 4
/**
 * 解法1 数组暴力排序
 */
const sort_0 = (arr, k) => {
    return arr.sort((a, b) => b - a)[k - 1]
}
/**
 * 解法2 快速排序训练一波
 */
const sort_1 = (arr, k) => {
    const Partition = (nums, l, r) => {
        let pivot = nums[l];
        while (l < r) {
            //从右往左，找到第一个比pivot小的
            while (l < r && nums[r] >= pivot) {
                r--;
            }
            // 右边位置空出来了
            nums[l] = nums[r]
            // 从左往右，找到第一个比pivot大的
            while (l < r && nums[l] <= pivot) {
                l++;
            }
            // 左边位置空出来了
            nums[r] = nums[l]
        }
        nums[l] = pivot;
        return l;
    }
    const quickSort = (arr, l, r) => {
        if (l < r) {
            let pivot = Partition(arr, l, r);
            quickSort(arr, l, pivot - 1)
            quickSort(arr, pivot + 1, r)
        }
    }
    quickSort(arr, 0, arr.length - 1)
    return arr[arr.length - k]
}
/**
 * 解法3
 * 使用堆排序来解决这个问题——建立一个大根堆，做 k−1 次交换后，堆顶元素
 * 就是我们要找的答案。
 */
const sort_2 = (nums, k) => {
    let len = nums.length;
    const swap = (i, j) => {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    // 核心功能，左右比较大小，大的结点向上挪动（交换）
    const maxHeapify = (i, size) => {
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let max = i;
        if (l < size && nums[l] > nums[max]) {
            max = l;
        }
        if (r < size && nums[r] > nums[max]) {
            max = r;
        }
        if (max !== i) {
            // 左右节点值较大的 与 i 交换
            swap(max, i);
            // max进行递归
            maxHeapify(max, size);
        }
    }
    const buildMaxHeap = () => {
        // i 取 一半 ，对应从尾部几个节点开始交换，建立大根堆
        for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
            maxHeapify(i, len)
        }
    }
    //建立好大根堆
    buildMaxHeap()
    // 交换 k -1 次 堆根节点与尾部节点
    for (let i = nums.length - 1; i >= nums.length - (k - 1); i--) {
        swap(i, 0)
        len--;
        maxHeapify(0, len);
    }
    return nums[0]
}
const fn = () => {
    console.log(`[${arr}] 第 ${k} 个最大元素 = `, sort_0(arr, k));
    console.log(`[${arr}] 第 ${k} 个最大元素 = `, sort_1(arr, k));
    console.log(`[${arr}] 第 ${k} 个最大元素 = `, sort_2(arr, k));
}
fn()