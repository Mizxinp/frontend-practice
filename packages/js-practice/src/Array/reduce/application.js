// 数组扁平化
const test1 = [1, [2, [3]], [2]]
function flatten(arr) {
    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
}

console.log(flatten(test1))

// 计算出现个数
const testData2 = [1, 1, 2, 3, 4, 5, 5, 6, 6, 1, 5, 5, 7]

const result2 = testData2.reduce((acc, cur) => {
    if (acc[cur]) {
        acc[cur] += 1
    } else {
        acc[cur] = 1
    }
    return acc
}, {})
console.log('2', result2)

// 按属性分类
const testData3 = [
    { type: 'front-end', name: 'js' },
    { type: 'java', name: 'js' },
    { type: 'go', name: 'go1' },
    { type: 'front-end', name: 'css' },
]

const result3 = testData3.reduce((acc, cur) => {
    if (!acc[cur.type]) {
        acc[cur.type] = []
    }
    acc[cur.type].push(cur)
    return acc
}, {})

console.log('3', result3)

// 数组去重
const testData4 = [1, 1, 2, 3, 4, 5, 5, 6, 6, 1, 5, 5, 7]

const result4 = testData4.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
        acc.push(cur)
    }
    return acc
}, [])
console.log('4', result4)

// 最大值最小值

const testData5 = [
    { number: 23 },
    { number: 11 },
    { number: 59 },
    { number: 53 },
]

const result5 = testData5.reduce((acc, cur) => {
    if (!acc) return cur
    if (cur.number > acc.number) {
        acc = cur
    }
    return acc
}, 0)
console.log('5', result5)