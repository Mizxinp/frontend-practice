/**
 * 深拷贝
 * @param {any} target 被拷贝对象
 * @param {*} map map结构
 */
function deepClone(target, map = new WeakMap) {
    if (typeof target === 'object' && target !== null) {
        const result = Array.isArray(target) ? [] : {}
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, result)
        for (const key in target) {
            result[key] = deepClone(target[key], map)
        }
        return result
    }
    return target
}

// 处理for in循环慢的问题
function forEach(array, callback) {
    let index = -1
    const length = array.length

    while (++index < length) {
        callback(array[index], index)
    }
    return array
}

function deepClone2(target, map = new WeakMap) {
    if (typeof target === 'object' && target !== null) {
        const isArray = Array.isArray(target)
        let result = isArray ? [] : {}
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, result)
        const keys = isArray ? undefined : Object.keys(target)
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value
            }
            result[key] = deepClone2(target[key], map)
        })
        return result
    }
    return target
}

const target = {
    a: 1,
    b: undefined,
    c: null,
    d: {
        name: 'jack',
    },
    e: [2],
}
target.target = target

console.time()
const result = deepClone(target)
// console.log(result)
console.timeEnd()
console.log('---------')
result.f = 'jjj'
console.time()
const result2 = deepClone2(target)
// console.log(result2)
console.timeEnd()