const a = [1,2]
console.log(a.constructor === Array);
// 编码
// 1.实现一个 once 函数，记忆返回结果只执行一次
// 2.实现一个函数 max，找到数组中最大的一个值/两个值/N个值
// 3.实现一个 Promise.all
// 4.实现一个无限累加的 sum 函数
// sum(1, 2, 3).valueOf(); //6
// sum(2, 3)(2).valueOf(); //7
// sum(1)(2)(3)(4).valueOf(); //10
// sum(2)(4, 1)(2).valueOf(); //9
// sum(1)(2)(3)(4)(5)(6).valueOf(); // 21

// function once(fn){
//     let executed = false;
//     return () => {
//         if(!executed){
//             executed = true;
//             return fn.apply(this)
//         }else{
//             throw new Error('Function has executed!');
//         }
//     }
// }

// function fn(){
//     console.log('fn函数执行了');
//     return 10;
// }

// var initial = once(fn);
// initial();
// initial()

// function sum(...args){
//     let allArgs = args;
//     function fn(...nextArgs){
//         allArgs = allArgs.concat(nextArgs);
//         return fn;
//     }
//     fn.valueOf = () => {
//         return allArgs.reduce((prev, cur) => prev + cur);
//     }

//     return fn;
// }

// console.log(sum(1)(2)(3)(4)(5)(6).valueOf())

// function once(fn){
//     let res;
//     let executed = false;

//     res = fn.apply(this);

//     try {
//         if(executed){
//             throw new Error('fn has executed')
//         }else{
//             res = fn.apply(this);
//             executed = true;
            
//         }
//     } catch (error) {
        
//     }
// }

const arr =[1,2,3]
arr.splice(0,0,4)
console.log(arr);
