const arr = [1, 2, 3, 4]

Array.prototype.reduceFilter = function (callback) {
    return this.reduce((acc, cur, index, array) => {
        if (callback(cur, index, array)) {
            acc.push(cur)
        }
        return acc
    }, [])
}

const result = arr.reduceFilter(item => item > 1)
console.log(result)