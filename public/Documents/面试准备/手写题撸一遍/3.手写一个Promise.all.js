function myPromiseAll(promiseArray){
    const res = [];
    return new Promise((resolve, reject) => {
        for (let index = 0; index < promiseArray.length; index++) {
            const promsie = promiseArray[index];
            Promise.resolve(promsie).then(value => {
                res[index] = value;
                if(index === promiseArray.length - 1){
                    resolve(res);
                }
            }, rej => reject(rej))
        }
    })
}