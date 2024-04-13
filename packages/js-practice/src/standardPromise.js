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
        if (value instanceof MyPromise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (self.state === PENDING) {
                self.state = RESOLVE
                self.value = value
                self.resolvedCallback.map(cb => cb(self.value))
            }
        }, 0)
    }

    function reject(value) {
        setTimeout(() => {

            if (self.state === PENDING) {
                self.state = REJECTED
                self.value = value
                self.rejectedCallback.map(cb => cb(self.value))
            }
        }, 0)
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
        return (promise2 = new MyPromise((resolve, reject) => {
            self.resolvedCallback.push(() => {
                try {
                    const x = onFulfilled(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch{
                    reject(r)
                }
            })

            self.rejectedCallback.push(() => {
                try {
                    const x = onRejected(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }))
    }

    if (self.state === RESOLVE) {
        return (promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onFulfilled(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }))
    }

    if (self.state === REJECTED) {
        return (promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onRejected(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }))
    }
}

function resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Error'))
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