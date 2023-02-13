const arr = [{
        name: "可乐",
        categories: ["热门", "饮料"],
    },
    {
        name: "苹果",
        categories: ["热门", "食物"],
    },
    {
        name: "洗衣液",
        categories: ["生活用品"],
    },
]
const fn = function (arr) {
    let newArr = []
    let map = new Map()
    for (let item of arr) {
        for (const cate of item.categories) {
            if (!map.has(cate)) {
                map.set(cate, [item.name])
            } else {
                map.set(cate, [...map.get(cate), item.name])
            }
        }
    }
    for (let [key, val] of map) {
        newArr.push({
            name: key,
            categories: val
        })
    }
    console.log(newArr);
    return newArr
}
fn(arr)