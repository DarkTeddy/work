const obj ={
    a: 1,
}

Object.defineProperty(obj, 'b', {
    get(){
        console.log('访问b');
        return 10;
    }
})

console.log(Object.hasOwn(obj,'b'))