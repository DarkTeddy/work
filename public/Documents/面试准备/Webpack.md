* ESM和CJS有什么区别？
  1.CJS运行时加载，ESM是编译时输出接口
  2.CJS的require是同步加载模块，ES6的import命令是异步加载，有单独的依赖解析阶段
  3.CJS输出的是一个值的拷贝，ES6输出的是值的引用



* 什么是Tree-shaking?
  
  是一种基于ESM规范的代码清除技术，会在运行过程中静态分析模块之间的导入导出，确实ESM模块中有哪些导出未曾被其他模块使用，
  并删除，从而实现打包产物的优化；

  注意：
  1、Tree-Shaking只能基于ESM实现，因为ESM只允许顶层导入，而CommonJS的导入导出行为是高度动态的，可以在代码中间
  导入，难以预测；
  2、Tree-shaking类似于js的垃圾收集：分析，标记，删除；

从Webpack（前端工程化）的角度对网站进行性能优化你会怎么做？
————缩小查找范围，比如减小node_modules的查找范围，alias，extensions之类的进行配置
————减少需要解析的文件，比如noParse来减少范围
————thread-loader这种插件来减少使用
    





