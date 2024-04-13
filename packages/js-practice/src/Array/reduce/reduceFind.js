const arr = [
    { name: 'jack', },
    { name: 'mike', },
]

Array.prototype.reduceFind = function (callback) {
    return this.reduce((acc, cur, index, array) => {
        if (callback(cur, index, array)) {
            if (acc instanceof Array && acc.length === 0) {
                acc = cur
            }
        }
        if ((index === array.length - 1) && (acc instanceof Array && acc.length === 0)) {
            acc = undefined
        }
        return acc
    }, [])
}

const result = arr.reduceFind(item => item.name === 'jack')
console.log(result)