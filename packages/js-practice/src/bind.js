Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    const _this = this
    const args = [...arguments].slice(1)

    return function Fn() {
        if (this instanceof Fn) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}

function text() {
    console.log(this.name)
}

const obj = {
    name: 'zhangsan'
}

const name = text.myBind(obj)
// name()



const str = 'homeDoctor/list?name=123&age=12&gender=man'

function getParams(url) {
    const paramsStr = url.split('?').slice(1)[0]
    console.log(paramsStr)
    let paramsObj = {}
    if (paramsStr) {
        const paramsArr = paramsStr.split('&')
        paramsArr.forEach(item => {
            const [key, value] = item.split('=')
            paramsObj[key] = value
        })
    }
    console.log(paramsObj)
    return paramsObj
}

getParams(str)