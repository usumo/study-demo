"use strict";
// enum 枚举，默认情况下，从0开始为元素编号，也可以手动赋值
var Color;
(function (Color) {
    Color[Color["Red"] = 3] = "Red";
    Color[Color["Green"] = 4] = "Green";
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(c);
// Type assertions 类型断言
var someValue = 'This is a string';
var strLength = someValue.length;
console.log(strLength);
