function *func(){
    const a = 10;
    yield a+11;
    const b = 10;
    const c = yield b+20;
    return c
}
const gene = func();
console.log(gene);
console.log(gene.next());
console.log(gene.next());
console.log(gene.next());
console.log(gene.next());
console.log(gene.next());