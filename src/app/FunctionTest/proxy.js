const obj = {
    a: '1',
    b: 2,
    c: {
        value: 3,
    },
    d: [4]
}
const handler = {
    get (target, property){
        if(typeof target[property] === 'string'){
            console.log('现在在用obj.a');
        }
        return target[property]
    },
    set (target, property, value){
        if(typeof target[property] === 'number'){
            console.log('在修改数字obj.b');
        }
        target[property] = value;
        return true
    }
}
const proxy = new Proxy(obj, handler)

console.log(proxy.a);

proxy.b = 10;
proxy.c
proxy.d