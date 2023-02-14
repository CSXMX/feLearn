var s = "ADOBECODEBANC";
var t = "ABC";

var minWindow = function (s, t) {
    // 根据数组t新建个map表，记录每个字符的出现个数
    let map = new Map()
    for (let ch of t) {
        if (map.has(ch)) {
            map.set(ch, map.get(ch) + 1)
        } else {
            map.set(ch, 1)
        }
    }
    // 滑动窗口 [l,r]
    let l = r = 0;
    // 字符串的种类个数
    let size = map.size;
    let res = '';
    while (r < s.length) {
        if (map.has(s[r])) {
            let n = map.get(s[r])
            map.set(s[r], n - 1)
            // 某个字符匹配完,剩余匹配数size -= 1
            if (n === 1) {
                size--;
            }
        }
        // size == 0时，说明所有字符都匹配完
        while (size === 0) {
            let str = s.slice(l, r + 1)
            // res 为 出现过的str 的 最小值
            if (res) {
                res = res.length <= str.length ? res : str;
            } else {
                res = str;
            }
            // 左侧开始滑动,一方面是尽可能缩减窗口的大小
            // 另一面是
            if (map.has(s[l])) {
                const n = map.get(s[l])
                map.set(s[l], n + 1)
                // 某一字符从0到1,剩余匹配数size -= 1
                if (n === 0) {
                    size += 1
                }

            }
            l++;
        }
        r++;
    }
    return res;
};

console.log(minWindow(s, t))