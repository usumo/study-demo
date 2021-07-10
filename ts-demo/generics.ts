// 泛型
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
console.log(output);

let output2 = identity("myString");
console.log(output2);