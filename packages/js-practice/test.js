const arr = [
    1, 3, [44, 32, [23, 1], [34], 6]
]

const test1 = [
    
]

console.log('1', arr.toString())

function flatten(arr) {
    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
}

function quickSort(arr) {
    if (arr.length <= 1) return arr
    const leftArr = []
    const rightArr = []
    const pivot = arr[0]
    for (let i = 1; i < arr.length; i++) {
        arr[i] >= pivot ? rightArr.push(arr[i]) : leftArr.push(arr[i])
    }
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]
}


function fn(arr) {
    const temp = flatten(arr)
    // const temp = arr.flat(Infinity)
    // temp.sort((a, b) => a - b)
    const sortArr = quickSort(temp)
    return [...new Set(sortArr)]
}

console.log(fn(arr))