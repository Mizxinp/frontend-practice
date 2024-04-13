function throttle(func, wait, options) {
    let timeout, context, args, result
    let previous = 0

    const { leading, trailing } = options || {}

    const later = function () {
        previous = leading === false ? 0 : new Date().getTime()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }

    const throttled = function () {
        const now = new Date().getTime()
        if (!previous && leading === false) previous = now
        const remaining = wait - (now - previous)
        context = this
        args = arguments

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
        } else if (!timeout && trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
    }

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
}
