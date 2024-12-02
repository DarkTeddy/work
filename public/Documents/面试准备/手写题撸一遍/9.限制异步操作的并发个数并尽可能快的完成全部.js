// 这里是我的答案
// 限制异步操作的并发个数

const timer = (delay) => {
  return new Promise(resolve => {
      setTimeout(() => resolve(console.log(`${delay} is done`)), delay);
  })
}

const promise1 = () => timer(7000);
const promise2 = () => timer(1000);
const promise3 = () => timer(36000);
const promise4 = () => timer(6000);
const promise5 = () => timer(5000);
const promise6 = () => timer(6000);
const promise7 = () => timer(2000);
const promise8 = () => timer(8000);
const promise9 = () => timer(3000);
const promise10 = () => timer(10000);
const promise11 = () => timer(5000);

const promiseArray = [promise1,promise2,promise3,promise4,promise5,promise6,promise7,promise8,promise9,promise10,promise11];


class myClass{
  constructor(doing = [], all = [], limit = 3){
      this.doing = doing;
      this.all = all;
      this.limit = limit;
  }

  isDone(){
      return this.all.length === 0;
  }

  doingIsFull(){
      return this.doing.length === this.limit;
  }

  dealNextPromise(item){
      Promise.resolve().then(item).then(res => {
          // 从doing中删掉当前元素
          const deleteIndex = this.doing.findIndex(item);
          this.doing.splice(deleteIndex,1);
          // 判断当前是否还有剩余
          if(this.isDone()){
              return;
          };

          // 数组中肯定有一个剩余的位置
          const next = this.all.shift();
          this.doing.push(next);
          this.dealNextPromise(next);
      })
  }

  main(){
      if(this.all.length <= this.limit){
          Promise.all(this.all)
      }else{
          const addElement = this.all.splice(0,3);
          this.doing.push(...addElement);
          this.doing.forEach(item => {
              this.dealNextPromise(item);
          })
      }
  }
}

const instance = new myClass([],promiseArray,3);
instance.main();


// 下面是原本的题目
var urls = [
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
  ];
  function loadImg(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function() {
        console.log("一张图片加载完成");
        resolve(img);
      };
      img.onerror = function() {
          reject(new Error('Could not load image at' + url));
      };
      img.src = url;
    })}
