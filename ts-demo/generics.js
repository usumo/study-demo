"use strict";
// 泛型
function identity(arg) {
    return arg;
}
var output = identity("myString");
console.log(output);
var output2 = identity("myString");
console.log(output2);
