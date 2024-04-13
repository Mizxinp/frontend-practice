Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null")
    }

    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackFn + ' is not a function')
    }

    let O = Object(this)
    let len = this.length >>> 0
    let k = 0
    let accumulator = initialValue
    if (accumulator === undefined) {
        throw new Error('Each element of the array is empty')

        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k]
                k++
                break
            }
        }
    }

    for (; k < len; k++) {
        if (k in O) {
            accumulator = callbackFn.call(undefined, accumulator, O[k], O)
        }
    }
    return accumulator
}

const data = [1, 2, 3]
const result = data.myReduce((acc, cur) => acc + cur, 2)
console.log(result)