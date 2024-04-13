function jsonStringify(data) {
    let type = typeof data

    if (type !== 'object') {
        let result = data

        if (Number.isNaN(data) || data === Infinity) {
            //NaN 和 Infinity 序列化返回 "null"
            result = "null"
        } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
            return undefined
        } else if (type === 'string') {
            result = `"${data}"`
        }

        return String(result)
    } else if (type === 'object') {
        if (data === null) {
            // 处理null
            return "null"
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return jsonStringify(data.toJSON())
        } else if (data instanceof Array) {
            // 处理数组
            let result = []
            data.forEach((item, index) => {
                if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                    result[index] = "null"
                } else {
                    result[index] = jsonStringify(item)
                }
            })
            result = "[" + result + "]"
            return result.replace(/'/g, '"')

        } else {
            // 处理普通对象
            let result = []
            Object.keys(data).forEach((item) => {
                if (typeof item !== 'symbol') {
                    if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
                        // 键值如果是undefined、function、symbol为属性的，忽略
                        result.push('"' + item + '"' + ":" + jsonStringify(data[item]))
                    }
                }
            })
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}