// 假设页面上有两个button


{/* <button id="start">Start</button>
<button id="cancel">Cancel</button> */}


// 下面是脚本内容

const startButton = document.querySelector('#start');
const cancelButton = document.querySelector('#cancel');

class CancelToken{
    constructor(cancelFn){
        this.promise = new Promise((resolve, reject) => {
            cancelFn(() => {
                setTimeout(console.log, 0, '取消了任务');
                resolve();
            })
        })
    }
}



function cancellableDelayResove(delay){
    setTimeout(console.log, 0, '计时开始')
    
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            setTimeout(console.log,0,'计时结束');
            resolve();
        },delay);

        const cancelToken = new CancelToken(cancelCallback => cancelButton.addEventListener('click', cancelCallback));
        cancelToken.promise.then(()=> clearTimeout(id));
    })
}

startButton.addEventListener('click', cancellableDelayResove(1000));