function myInstanceof(left, right) {
    // 是基础类型直接返回false
    if (typeof left !== 'object' || left === null) return false
    // 获取left的原型对象
    let proto = Object.getPrototypeOf(left)
    // 循环向下寻找，直到对象的原型为null
    while(true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

console.log(myInstanceof(new Number(1), Number)) // true
console.log(myInstanceof(123, Number)) // false