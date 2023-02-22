/**
 * @param {number[]} ratings
 * @return {number}
 */
const ratings = [1, 0, 2]
var candy = function (ratings) {
    let a = new Array(ratings.length).fill(1)
    for (let i = 1; i < ratings.length; i++) {
        // 右边 > 左边，右边 += 1
        if (ratings[i - 1] < ratings[i]) {
            a[i] = a[i - 1] + 1
        }
    }
    let res = 0;
    for (let i = ratings.length - 1; i > 0; i--) {
        // 左边 > 右边， 左边糖果要求更多，最少为a[i]+1
        if (ratings[i - 1] > ratings[i]) {
            a[i - 1] = Math.max(a[i - 1], a[i] + 1);
        }
        // 顺便统计当前值
        res += a[i - 1]
    }
    res += a[0];;
    return res
};


var candy_0 = function (ratings) {
    let pre = 1;
    let res = 1;
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i - 1] < ratings[i]) {
            pre += 1;
        } else {
            pre = 1;
        } 
        res += pre;
    }
    return res;
};

(function () {
    console.log(ratings, '最少需要', candy(ratings), '个糖果');
    console.log(ratings, '最少需要', candy_0(ratings), '个糖果');
})();