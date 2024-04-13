function create(Con, ...args) {
    let obj = {}
    // let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}

function Test(name, age) {
    this.name = name
    this.age = age
}

const f = create(Test, 'zhang', 26)
console.log(f.name)
console.log(f.age)