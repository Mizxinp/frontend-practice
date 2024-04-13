Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    context = context || window
    context.fn = this

    let result
    if (arguments[1]) {
        result = context.fn(arguments[1])
    } else {
        result = context.fn()
    }

    delete context.fn
    return result
}

function text() {
    console.log(this.a)
}

const obj = {
    a: 11
}

text.myApply(obj)