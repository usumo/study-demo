let count = 0;
let time = 1000;
let timer = null;

function queryFn() {
  count++;
  if (count > 3) return true;
  return false;
}

function callback() {
  console.log('退出！！！');
}

function simplePoller(queryFn, callback) {
  if (queryFn()) {
    return callback();
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(`等待了${time/1000}秒`);
      simplePoller(queryFn, callback);
      time = time * 1.5;
    }, time);
  }
}

simplePoller(queryFn, callback);