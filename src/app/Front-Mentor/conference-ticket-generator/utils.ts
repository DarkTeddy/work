// 存放工具函数

// 寻找页面内的隐藏input元素
export function handleClick() {
  const inputDom = document.getElementById("file-input");
  console.log("?", inputDom);

  inputDom?.click();
}

// 一个异步工具，有的时候延迟太低会导致页面闪烁
// 有一个异步任务，当
type returnPromiseFunc = () => Promise<any>
function getMin(delay: number, func: returnPromiseFunc){
  return new Promise((resolve, reject) => {
    const old = Date.now()

    func().then(res => {
      const now = Date.now()
      if(now-old >= delay){
        resolve(res)
      }else{
        setTimeout(() => {
          resolve(res)
        },delay-now+old)
      }
    }).catch(error => reject(error))
  })
}