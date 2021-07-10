// extends
class Animal {
  public name: string;
  constructor(animalName: string) {
    this.name = animalName;
  }
  run() {
    console.log(this.name + ' run is ok');
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat() {
    console.log(this.name + ' eat is ok');
  }
}

let cat = new Cat('cat');
cat.run();
cat.eat();