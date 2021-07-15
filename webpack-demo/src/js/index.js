// https://www.cxymsg.com/guide
// https://www.cnblogs.com/liuhao-web/p/11589848.html
// https://github.com/yygmind/blog/issues/43
// https://segmentfault.com/a/1190000018992363
// https://juejin.im/post/6869376045636648973
// https://juejin.im/post/6869908820353810445
// https://juejin.im/post/6875705865798844430
// https://mp.weixin.qq.com/s/sBAQ_BKfAvMZooDGROmwKw

console.log('index')

import { cube, square } from './math'
import _ from 'lodash'
import $ from 'jQuery'

function todo() {
  console.info($('#ipt').val());
}

$('#ipt').on('keyup', debounce(todo, 500));

/**
 * 防抖，在规定的时间内，无论调用多少次，都只执行最后一次
 * @param {function} fn 
 * @param {number} delay s
 */
function debounce(fn, delay) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 节流，在规定的时间内只执行一次
 * @param {function} fn 
 * @param {number} delay s
 */
function throttle(fn, delay) {
  let flag = true
  return () => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = true
    }, delay)
  }
}

function sayHi(e) {
  console.log('12345')
}
window.addEventListener('resize', throttle(sayHi, 1000));
// window.addEventListener('resize', _.throttle(sayHi, 1000));


console.log(cube(5))
console.log(square(5))
console.log(parseInt('4215213', 5));
console.log(4 * Math.pow(5, 2) + 2 * Math.pow(5, 1) + 1 * Math.pow(5, 0));

console.log(parseInt('4215213', 9));
console.log(4 * Math.pow(9, 6) + 2 * Math.pow(9, 5) + 1 * Math.pow(9, 4) + 5 * Math.pow(9, 3) + 2 * Math.pow(9, 2) + 1 * Math.pow(9, 1) + 3 * Math.pow(9, 0));

console.log(parseInt('100', 0)); // 100
console.log(parseInt('100', 1)); // NAN
console.log(parseInt('100', 2)); // 4
console.log(1 * Math.pow(2, 2) + 0 * Math.pow(2, 1) + 0 * Math.pow(2, 0)); // 4
console.log(parseInt('100', 3)); // 9
console.log(1 * Math.pow(3, 2) + 0 * Math.pow(3, 1) + 0 * Math.pow(3, 0)); // 9
console.log(parseInt('100', 4)); // 16
console.log(1 * Math.pow(4, 2) + 0 * Math.pow(4, 1) + 0 * Math.pow(4, 0)); // 16

console.log(parseInt('10', 0)); // 10
console.log(parseInt('10', 1)); // NAN
console.log(parseInt('10', 2)); // 2
console.log(1 * Math.pow(2, 1) + 0 * Math.pow(2, 0)); // 2
console.log(parseInt('10', 3)); // 3
console.log(1 * Math.pow(3, 1) + 0 * Math.pow(3, 0)); // 3
console.log(parseInt('10', 4)); // 4
console.log(1 * Math.pow(4, 1) + 0 * Math.pow(4, 0)); // 4

// https://juejin.im/post/6875152247714480136
// 13.函数珂里化
function add() {
  const _args = [...arguments];

  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return _args.reduce((sum, cur) => sum + cur);
  }
  return fn;
}
console.log(add(1)(2)(3)(4)); // 10
// console.log(add(1)(1,2,3)(2)); // 9

// https://juejin.im/post/6874275613360783368

// 1.如何获取数组中最大的数
const nums = [1, 2, 4, 5, 100]
console.log('es6：' + Math.max(...nums));
console.log('es5：' + Math.max.apply(null, nums));
const temp = nums.reduce((a, b) => {
  return a > b ? a : b
})
console.log('reduce: ' + temp);
const temp1 = nums.reduce((a, b) => {
  return a + b
})
console.log('数组求和：' + temp1);
// 2.数组和链表的使用场景
// 数组：数据比较少；经常做的运算是按序号访问数据元素；数组更容易实现，任何高级语言都支持；构建的线性表较稳定
// 链表：对线性表的长度或者规模难以估计；频繁做插入删除操作；构建动态性比较强的线性表

// 3.排序算法，说说冒泡排序和快排的区别
// 冒泡排序，选择排序，插入排序，希尔排序，快速排序，归并排序，堆排序

var arr = [1, 3, 10, 4, 20, 5]
var len = 6
// 冒泡排序
function bubbleSort(arr, len) {
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp
        temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

console.log('冒泡排序：' + bubbleSort(arr, len))

// 选择排序
function selectSort(arr, len) {
  for (var i = 0; i < len; i++) {
    var index = i
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[index]) {
        index = j
      }
    }

    if (index === i) {
      continue
    } else {
      var temp
      temp = arr[index]
      arr[index] = arr[i]
      arr[i] = temp
    }
  }

  return arr
}

console.log('选择排序：' + selectSort(arr, len))

// 4.背包问题

// 5.浏览器缓存 https://www.jianshu.com/p/54cc04190252
// 5.1 缓存位置
//  Service Worker，传输协议必须为https
//  Memory Cache
//  Disk Cache
//  Push Cache
// 5.2强缓存
// expires 缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点；Expires 是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效
// cache-control 

// 6.TCP的三次握手，建立连接的

// 7.TCP的四次挥手，断开连接的

// 8.浏览器输入URL到页面呈现的过程，https://segmentfault.com/a/1190000014311983

// 9.vm.$set
// 原理：将新增属性设置为响应式
// 作用：在vue中页面加载完成后再增加对象的属性或数组增加元素，页面上就不会发生变化，此时用到this.$set()就会触发页面改变

// 10.深拷贝与浅拷贝
// https://www.cnblogs.com/mikeCao/p/8710837.html
// 区别：深拷贝和浅拷贝最根本的区别在于是否真正获取一个对象的复制实体，而不是引用

// 11.深拷贝如何解决循环引用

// 12.http 缓存头部字段

// 13.vue和react的区别
//    相同点：
//        1.Virtual Dom（虚拟DOM）
//        2.响应式和组件化的视图组件
//        3.都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关库
//    不同点：
//        1.template jsx
//        2.mvvm mvc
//        1，React中，当某组件的状态发生改变时，它会以该组件为根，重新渲染整个组件子树，而在Vue中，组件的依赖是在渲染的过程中自动追踪的，所以系统能准确知晓哪个组件确实需要被重新渲染。
//        2，Vue的路由库和状态管理库都由官方维护支持且与核心库同步更新，而React选择把这些问题交给社区维护，因此生态更丰富。
//        3，Vue-cli脚手架可进行配置

// 14.前端路由 https://www.cnblogs.com/lguow/p/10921564.html
//    hash
//        window.addEventListenter('DOMContentLoad', () => {}) //页面加载完不会出发hashchange，需要手动触发
//        window.addEventListenter('hashchange', () => {}) // 监听url变化
//    history
//        window.addEventListenter('DOMContentLoad', () => {}) //页面加载完不会出发popstate，需要手动触发
//        window.addEventListenter('popstate', () => {}) // 监听url变化
//            history.pushState()
//            history.replaceState()

// 15.webpack工作流

// 16.webpack优化
//    webpack-bundle-analyzer

// 17.vue生命周期
//    https://segmentfault.com/a/1190000011381906

// 18.react生命周期

// 19.单元测试

// 20.重绘，回流（重排）
//    https://www.cnblogs.com/yadongliang/p/10677589.html
//    https://www.cnblogs.com/soyxiaobi/p/9963019.html

// 21.treeshaking
//    原理：依赖于ES6的模块特性
//    作用：删除无用的js代码
//    详见webpack-demo
//    webpack实践：https://www.webpackjs.com/guides/tree-shaking/

// 22.webpack多页面项目开发按需编译。待实践
//    https://juejin.im/post/6877123009555988493

// 23.原型链，class
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// prototype

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.message = function () {
    console.log(`${this.name}，${this.age}`);
  }
}

Person.prototype.say = function () {
  console.log(this.name);
}


const person1 = new Person('halo', 28);
const person2 = new Person('halos', 29);
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.constructor === Person); // true
console.log(Person.prototype); // 输出原型下的属性
console.log(person1.constructor === Person); // true
console.log(person1.__proto__ === Person.prototype); // true
console.log(person1.say === person2.say); // true
person1.message();
person2.message();
console.log(person1 instanceof Person);
console.log(person2 instanceof Person);
console.log(person1.message === person2.message); // false

function Female1() {
  Person.apply(this, arguments); // 将父元素所有的方法和属性都继承了
}
const dot1 = new Female1('Dot1', 1);
dot1.message();


function Female2() {
  Person.call(this, ...arguments);
}
const dot2 = new Female2('Dot2', 2);
dot2.message();


function Female3() {
  Person.call(this, ...arguments);
}
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
Female3.prototype = Object.create(Person.prototype);
// Female3.prototype.constructor = Female3;

const dot3 = new Female3('Dot3', 3);
dot3.message();
dot3.say();

// call,apply,bind的区别
// 相同点：都是改变函数运行时this的指向
// 不同点：传参不一样
//      call，是以逗号隔开的字符串
//      apply，数组
//      bind，todo...

var obj = {
  message: 'My name is: '
}

function getName(firstName, lastName) {
  console.log(this.message + firstName + ' ' + lastName)
}

getName.call(obj, 'Dot', 'Dolby')

// 判断是否为数组
function isArray(obj) {
  return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
}
console.log(isArray([])); // true
console.log(isArray('dot')); // false

var arr = [1, 2, 3, 89, 46]
var max = Math.max.apply(null, arr) //89
console.log(max);

// 模拟new
function objectFactory() {
  const obj = new Object()
  const Constructor = [].shift.call(arguments)
  console.log(Constructor);
  obj._proto_ = Constructor.prototype
  const ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}

const o = objectFactory(Person, 'cxk', '18');
console.log(o);

// 模拟 instanceof
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L)
      // person1.__proto__ === Person.prototype
      // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}

console.log(instance_of(person1, Person));

var arr1 = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
console.log(arr1.flat(Infinity));
var arr2 = [...new Set(arr1.flat(Infinity))]
var arr21 = Array.from(new Set(arr1.flat(Infinity)))
console.log(arr2);
console.log(arr21);
var arr3 = arr2.sort((a, b) => a - b)
console.log(arr3);

console.log(Math.min(...arr2));
console.log(Math.max(...arr2));

console.log(Math.max.apply(null, arr2));
console.log(Math.min.call(null, ...arr2));

const opts = {
  a: 1,
  b: 2
}


console.log(Object.keys(opts).sort().map(item => `${item}${opts[item]}`).join(''));

var str = Object.keys(opts).sort().map(function (item) {
  return "".concat(item).concat(opts[item]);
}).join('');

console.log(str);

console.log({
  ...opts
});


console.log(['1', '2', '3'].includes('1'));

function changeObjProperty(o) {
  o.siteUrl = "https://www.baidu.com"
  o = new Object()
  o.siteUrl = "https://www.google.com"
}
let webSite = new Object();
webSite.name = '123';
console.log(webSite);
changeObjProperty(webSite);
console.log(webSite);
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


const set = new Set([1, 2, 3, 4])
console.log(set.size);
set.add(5);
console.log(set);
console.log(set.has(1));

console.log(Array.from(set));
console.log([...set]);

const arrs = [
  [1, 2],
  [3, 4]
]
const weakset = new WeakSet(arrs)
console.log(weakset)

var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

// 装饰器
function logClass(params) {
  console.log(params);
  //params 就是指代当前类--HttpClient
  params.prototype.apiUrl = "动态扩展属性";
  params.prototype.run = function () {
    console.log("动态扩展方法");
  };
  params.prototype.getDate = function () {
    console.log("动态扩展方法2");
  };
}

@logClass
class HttpClient {
  constructor() {}
  getDate() {
    console.log(1);
  }
}

let http = new HttpClient();
console.log(http.apiUrl);
http.run();
http.getDate();


// 可传参的装饰器

function logClassB(param) {
  return function (target) {
    console.log(target, "装饰器以下的类");
    console.log(param, "装饰器传进来的属性");
  };
}

@logClassB("小慧")
class HttpClients {
  constructor() {}
  getDate() {}
}

let https = new HttpClients();
console.log(https);

// es6 proxy
let a = [1];
let newA = new Proxy(a, {
  get(target, p, receiver) {
    console.log('get', p);
    return Reflect.get(target, p, receiver);
  },
  set(target, p, value, receiver) {
    console.log('set', p);
    return Reflect.set(target, p, value, receiver);
  }
});

newA.push(1);
console.log('===');
newA[2] = 2;
newA.length;
console.log('===');
newA.length = 100;
console.log('===');
newA.shift();
