console.log(v1);
var v1 = 100;

function foo() {
  console.log(v1);
  var v1 = 200;
  console.log(v1);
}
foo();
console.log(v1);



console.log(bar);

function bar() {
  console.log(1);
}


setTimeout(function() {
  console.log('定时器开始啦')
});

new Promise(function(resolve) {
  console.log('马上执行for循环啦');
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve();
  }
}).then(function() {
  console.log('执行then函数啦')
});

console.log('代码执行结束');