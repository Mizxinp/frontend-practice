Array.prototype.myPop = function () {
    let O = Object(this)

    let len = this.length >>> 0

    if (len === 0) {
        O.length = 0
        return undefined
    }

    len--
    const value = O[len]
    delete O[len]
    O.length = len
    return value
}

const data = [1, 2]
data.myPop()
console.log(data)