const arr = [1, 2, 3, 4]

Array.prototype.reduceMap = function (callback) {
    return this.reduce((acc, cur, index, array) => {
        const item = callback(cur, index, array)
        acc.push(item)
        return acc
    }, [])
}

const result = arr.reduceMap((item, index) => item + index)
console.log(result)