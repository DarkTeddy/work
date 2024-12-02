const arr = [1,2,3];


arr.reduce((p,c) => {
    return p.then(() => {
        return new Promise(r => {
            setTimeout(() => r(console.log(c)),1000);
        })
    });
},Promise.resolve())