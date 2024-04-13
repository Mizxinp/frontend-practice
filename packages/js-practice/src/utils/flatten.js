const arr = [1, [2, [3, 4, 5]]]

// 1.普通递归
function flatten1(arr) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten1(arr[i]))
        } else {
            result.push(arr[i])
        }
    }

    return result
}
console.log('1', flatten1(arr))


// 2.reduce
function flatten2(arr) {
    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten2(cur) : cur), [])
}
console.log('2', flatten2(arr))

// 3.扩展运算符
function flatten3(arr) {
    let result = [...arr]
    while (result.some(item => Array.isArray(item))) {
        result = [].concat(...result)
    }
    return result
}
console.log('3', flatten3(arr))

// 4.split,toString
function flatten4(arr) {
    return arr.toString().split(',')
}
console.log('4', flatten4(arr))

// 5.flat
function flatten5(arr) {
    return arr.flat(Infinity)
}
console.log('5', flatten5(arr))

// 6.正则
function flatten6(arr) {
    let str = JSON.stringify(arr)
    str = str.replace(/(\[|\])/g, '')
    str = '[' + str + ']'
    return JSON.parse(str)
}
console.log('6', flatten6(arr))