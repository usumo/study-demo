console.log('javascript')

// EventLoop 事件循环，js是单线程
// js执行顺序是从上到下依次执行
// 当遇到同步代码时立即执行
// 当遇到异步代码时会将异步代码暂时放到Event Table里执行结果，执行完成后放到Event queue
// 主线程空闲时，才会把Event queue中的异步任务放到主线程中执行
setTimeout(function () {
  console.log(1)
}, 0);
new Promise(function (resolve, reject) {
  console.log(2)
  for (var i = 0; i < 10000; i++) {
    if (i === 10) {
      console.log(10)
    }
    i == 9999 && reject()
  }
  console.log(3)
}).then(function () {
  console.log(4)
}).catch(function () {
  console.log(6)
}).then(function (res) {
  console.log(res)
  console.log(7)
})
console.log(5); // 2,10,3,5,4,6,7,1

// Promise
// 3种状态，pending(等待)，resolved(已完成)，rejected(已拒绝)
// 无论resolve,reject多少次，只有执行第一次
// then后可以继续then，返回结果是undefined
function testPromise1() {
  return new Promise(function (resolve, reject) {
    resolve("testresolve1")
    resolve("testresolve2")
  });
}
testPromise1().then(resp => {
  console.log(resp);
}).then(resp => {
  console.log(resp);
})

// reject后，如果then里定义了reject的回调就会走then里的reject,如果then里没定义，就走到catch里了
function testPromise() {
  return new Promise(function (resolve, reject) {
    reject("testreject")
  });
}
testPromise().then(function (res) {
  console.log("1");
}, err => {
  console.log(err, "2")
}).catch(err => {
  console.log(err, "3")
})

testPromise().then(function (res) {
  console.log("1");
}).catch(err => {
  console.log(err, "3")
})
// Promise.all([1, 2, 3]) 参数是数组，可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值
// 只要任何一个失败了，都会失败
let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
  resolve('success')
})

let p3 = Promise.reject('失败')

Promise.all([p1, p2]).then((result) => {
  console.log(result) //['成功了', 'success']
}).catch((error) => {
  console.log(error)
})

Promise.all([p1, p2, p3]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error) // 失败了，打出 '失败'
})

// Promise.race([1, 2, 3]) 参数是数组，返回的也是数组，
// race 赛跑；哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态
// 适用于多台服务器部署了同样的代码，那台服务器返回的快就用那台服务器返回的结果
let p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

let p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p4, p5]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error) // 打开的是 'failed'
})

// 箭头函数获取arguments
// 箭头函数使用arguments获取参数列表时，实际上得到的是外层函数的arguments,this也一样
// 箭头函数自身使用arguments时，需要使用“剩余运算符”
var obj = {};
obj.fn = function () {
  console.log(arguments);
  let arrow = (...args) => {
    console.log('入参列表 : ', arguments); //外层的入参列表
    console.log('剩余参数 : ', args); //使用剩余参数表示法获得的自身入参列表
  }
  arrow(4, 5, 6)
}

obj.fn(1, 2, 3)

// 事件代理
// 事件代理是利用事件冒泡事件实现的，从内层冒泡到最外层

// 事件委托
// 将事件委托到其他元素，jquery delegate
// 优点：减少内存消耗、动态绑定事件

// 箭头函数和function的区别 https://www.jianshu.com/p/3a0921edd4b7

// 深拷贝与浅拷贝，区别：深拷贝和浅拷贝最根本的区别在于是否真正获取一个对象的复制实体，而不是引用

// promise实现

// 闭包

// 数组去重，Set,循环

// bind,call,apply重点
// bind就是采用函数柯里化来实现的
Function.prototype.mybind = function (context) {
  var _this = this
  var args = Array.prototype.slice.call(arguments, 1)

  return function () {
    return _this.apply(context, args)
  }
}

// new操作符原理
/**
 * 1.创建一个新对象
 * 2.将构造函数的作用域赋值给新对象(因此this就指向了这新对象)
 * 3.执行构造函数中的代码（为这个新对象添加属性）
 * 4.返回新对象
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.message = function () {
    console.log(`${this.name}，${this.age}`);
  }
}

function objectFactory() {
  const obj = new Object()
  const Constructor = [].shift.call(arguments)
  console.log(Constructor);
  obj._proto_ = Constructor.prototype
  const ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}
const o = objectFactory(Person, 'cxk', '18');
console.log('==========');
console.log(o);
console.log(o.message());

// 继承(extends) es5:call,bind;es6:extends

// class function

// JS基本类型：boolean,null,undefined,number,string,symbol(es6新增),bigint

// JS引用类型：统称：object，细分：Object,Array,Date,RegRxp,Function

// JS中引用类型和基本类型的区别
// 1.引用类型可以动态添加属性
// 2.基本类型不可变，不可复制
// https://www.cnblogs.com/cxying93/p/6106469.html

// JS内存回收机制

// ES6立即执行函数

// 深拷贝与浅拷贝

// prototype

// 写一个函数，第一秒打印1，第二秒打印2
function printNum() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000)
  }
}

printNum();

// 写代码，满足以下条件： 
// （1）Hero("37er");执行结果为 Hi! This is 37er
// （2）Hero("37er").kill(1).recover(30); 执 行 结 果 为 Hi! This is 37er Kill 1 bug Recover 30 bloods
// （3）Hero("37er").sleep(10).kill(2)执行结果为 Hi! This is 37er //等待 10s 后 Kill 2 bugs //注意为 bugs （双斜线后的为提示信息，不需要打印）
function Hero(name) {
  let o = new Object();
  o.name = name;
  o.time = 0;
  console.log("Hi! This is " + o.name);
  o.kill = function (bugs) {
    if (bugs == 1) {
      console.log("Kill " + (bugs) + " bug");
    } else {
      setTimeout(function () {
        console.log("Kill " + (bugs) + " bugs");
      }, 1000 * this.time);
    }
    return o;
  };
  o.recover = function (bloods) {
    console.log("Recover " + (bloods) + " bloods");
    return o;
  }
  o.sleep = function (sleepTime) {
    o.time = sleepTime;
    return o;
  }
  return o;
}

Hero("37er").sleep(10).kill(2);

// requestAnimationFrame
// https://zhuanlan.zhihu.com/p/145793042
// setTimeout 间隔时间为16.7 
// 浏览器的刷新频率为每秒 60 帧 ，1 秒=1000 毫秒， 1000/60=16.7ms

// js暂时性死区
// https://www.cnblogs.com/mengfangui/p/9934327.html

// this指向
// https://www.cnblogs.com/Rivend/p/12649922.html

// 重绘，重排（回流）
// 回流必将引起重绘，而重绘不一定会引起回流。回流会导致渲染树需要重新计算，开销比重绘大，所以我们要尽量避免回流的产生

// 红绿灯
function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}


let myLight = (timer, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};


let myStep = () => {
  Promise.resolve().then(() => {
    return myLight(3000, red);
  }).then(() => {
    return myLight(2000, green);
  }).then(() => {
    return myLight(1000, yellow);
  }).then(() => {
    myStep();
  })
};
myStep();

function sleep(ms, color) {
  return new Promise(resolve => {
    console.log('================================' + color);
    setTimeout(resolve, ms)
  });
}

async function myStep1() {
  await sleep(0, 'red');
  await sleep(5000, 'green');
  await sleep(1000, 'yellow');
  myStep1();
}

myStep1();


// sleep
// promise实现
function sleep1(ms) {
  var temp = new Promise(resolve => {
    console.log('=========================111');
    setTimeout(resolve, ms)
  })
  return temp;
}

sleep1(500).then(() => {
  console.log('========================222');
});

// async
function sleep2(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  await sleep2(1000);
  console.log('=====================333');
}
test();

// ==、===和Object.is
// ===与Object.is相似

// 如何实现一个私有变量，用 getName 方法可以访问，不能直接访问
function Product() {
  var name = '1234';
  this.getName = function () {
    return name;
  }
}

var obj = new Product();
console.log('----------------------------------' + obj.getName());

// JS监听对象属性改变
// Object.defineProperty, Proxy

// 使用promise封装一个ajax
function ajax(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(data);
    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject('error');
      }
    }
  })
}

// ajax('http://t.music.migu.cn/v3/api/user/getUserInfo', '');

// 实现一个once函数，传入函数参数只执行一次
function once(fn) {
  let flag = true;
  return function () {
    if (tag) {
      fn.apply(null, arguments);
      flag = false;
    }
    return undefined;
  }
}

function testOnce(args) {
  console.log(args);
}

once(testOnce('1234567890'));

// 防抖，节流

// JS函数柯里化
// 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
// 普通的add函数
function add(x, y) {
  return x + y
}

// Currying后
function curryingAdd(x) {
  return function (y) {
    return x + y
  }
}

add(1, 2) // 3
curryingAdd(1)(2) // 3

function add1() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  // let _args = Array.prototype.slice.call(arguments);
  let _args = [...arguments];
  console.log(_args); // 1,2,3,9 第一个括号里的参数

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有参数
  let _adder = function () {
    _args.push(...arguments); // 将第一个括号后的所有参数添加到数组
    console.log(_args);
    return _adder;
  }

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    console.log(_args); // 1,2,3,9,4,5,6,7,8,0
    return _args.reduce(function (a, b) {
      return a + b;
    })
  }

  return _adder;
}

console.log('+++++++++++++++++++++++++++++++++++++++add1+++：' + add1(1, 2, 3, 9)(4)(5)(6, 7)(8)(0));

// 框架兼容不同模式写法
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : // cmd
	typeof define === 'function' && define.amd ? define(factory) : (global.Vue = factory()); // amd window 
})(window, function() {
  console.log('======================start');
})

// 数组顺序打乱
var arr = [1, 2, 3, 4, 5, 6, 7];
arr.sort(function() {
    return (0.5 - Math.random());
});
console.log(arr);

// 深度优先遍历
/**
 * 基本思路
 * 1. 从最顶点开始
 * 2. 从未被访问的邻节点中选取一个顶点，从选取的顶点做深度优先遍历
 * 3. 重复以上两步操作，直至所有路径和节点被访问完
 */
import data from './data'
// console.log(data);
// - 递归实现，找出节点ID
function depthFirstSearch(data) {
  const result = [];
  
  const dfs = data => {
    // 遍历数组
    data.forEach(element => {
      // 将当前节点id放进结果中
      result.push(element.id);
      // 当前节点有子节点，则递归调用
      if (element.children && element.children.length > 0) {
        dfs(element.children);
      }
    });
  }

  dfs(data);

  return result;
}

console.log(`深度优先遍历递归实现：${depthFirstSearch(data)}`);

//- 栈实现
function depthFirstSearch2(data) {
  // 存放结果的数组
  const result = []; 
  // 当前栈内为全部数组
  const stack = JSON.parse(JSON.stringify(data));;
  // 循环条件，栈不为空
  while (stack.length !== 0) {
    // 最上层节点出栈
    const node = stack.shift(); // 这个地方回改变原有数组的数据，第一次就只有第一个元素
    // 存放节点
    result.push(node.id);
    node.children.slice().reverse().forEach(child => stack.unshift(child)); // 从头部插入进栈元素
  }
  
  return result;
}

console.log(`深度优先遍历栈实现：${depthFirstSearch2(data)}`);

// 广度优先遍历

function breadthFirstSearch(data) {
  // 存放结果的数组
  const result = [];
  // 当前队列为全部数组
  const queue = JSON.parse(JSON.stringify(data));
  // 循环条件，队列不能为空
  while (queue.length > 0) {
    // 第1个节点出队列
    const node = queue.shift();
    // 存放结果数组
    result.push(node.id);
    node.children.forEach(child => queue.push(child));
  }

  return result;
}

console.log(`广度优先遍历栈实现：${breadthFirstSearch(data)}`);


// 获取url中的参数
function queryParams(name) {
  const temp = location.search.split('?')[1].split('&');
  const temp1 = temp.filter(item => item.includes(name));
  const [temp2, ...rest] = temp1;
  return temp2.split('=')[1];
}











