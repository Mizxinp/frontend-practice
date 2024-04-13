const arr = [1, 2, 3, 4]

Array.prototype.reduceForEach = function (callback) {
    this.reduce((acc, cur, index, array) => {
        callback(cur, index, array)
    }, [])
}

let result = 0
arr.reduceForEach(item => result = result + item)
console.log(result)