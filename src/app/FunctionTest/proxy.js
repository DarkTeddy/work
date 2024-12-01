const obj = {
    a: '1',
    b: 2,
    c: {
        value: 3,
    },
    d: [4]
}

const proxy = new Proxy(obj, handler)

function handler()