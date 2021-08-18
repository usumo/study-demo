console.log('app');
console.log('app-test');
console.log('app-test-2');
console.log('app-test-3');

// import '../css/app.scss';

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  say() {
    return `我是${this.name},我今年${this.age}岁了。`;
  }
}

const halo = new Person('halo', 20);
console.log(halo.say());

// export default Person;