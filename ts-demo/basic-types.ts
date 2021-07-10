// enum 枚举，默认情况下，从0开始为元素编号，也可以手动赋值
enum Color {
  Red = 3,
  Green = 4,
  Blue = 5
}
let c: Color = Color.Blue;
console.log(c);

// Type assertions 类型断言
const someValue: any = 'This is a string';
const strLength: number = (<string>someValue).length;
console.log(strLength);