function debounce1(func, wait) {
    let timeout

    return function () {
        const context = this // 解决this指向问题
        const args = arguments // 解决event对象问题

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}

// 立即执行一次, 添加cancel
function debounce2(func, wait, immediate) {
    let timeout, result

    const debounced = function () {
        const context = this
        const args = arguments

        if (timeout) clearTimeout(timeout)

        if (immediate) {
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (!timeout) result = func.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait)
        }
        return result
    }

    debounced.cancel = function () {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}
