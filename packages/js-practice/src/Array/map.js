Array.prototype.myMap = function (callbackFn, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null")
    }

    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackFn + ' is not a function')
    }

    let O = Object(this)
    let len = this.length >>> 0
    let A = new Array(len)

    for (let k = 0; k < len; k++) {
        if (k in O) {
            let kValue = O[k]
            let mappedValue = callbackFn.call(thisArg, kValue, k, O)
            A[k] = mappedValue
        }
    }
    return A
}

const data = [{ count: '1' }, { count: 2 }]
const result = data.myMap(item => item.count * 2)
console.log(result)