const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECTED = 'REJECTED'

function MyPromise(fn) {
    const self = this
    self.state = PENDING
    self.value = null
    self.resolvedCallback = []
    self.rejectedCallback = []

    function resolve(value) {
        if (self.state === PENDING) {
            self.state = RESOLVE
            self.value = value
            self.resolvedCallback.map(cb => cb(self.value))
        }
    }

    function reject(value) {
        if (self.state === PENDING) {
            self.state = REJECTED
            self.value = value
            self.rejectedCallback.map(cb => cb(self.value))
        }
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

    if (self.state === PENDING) {
        self.resolvedCallback.push(onFulfilled)
        self.rejectedCallback.push(onRejected)
    }

    if (self.state === RESOLVE) {
        onFulfilled(self.value)
    }

    if (self.state === REJECTED) {
        onRejected(self.value)
    }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0)
})
    .then((res) => {
        console.log(res)
    })