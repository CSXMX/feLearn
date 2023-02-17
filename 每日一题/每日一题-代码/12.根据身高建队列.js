const people = [
    [7, 0],
    [4, 4],
    [7, 1],
    [5, 0],
    [6, 1],
    [5, 2]
]
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
    let queue = [];
    people.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1] //升序
        } else {
            return b[0] - a[0] //降序
        }
    })
    for (let person of people) {
        queue.splice(person[1], 0, person)
    }
    return queue
};


(function () {
    console.log(reconstructQueue(people));
})()