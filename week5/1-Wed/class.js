class Vehicle {
    constructor(color) {
        this.color = color;
        this.tank = 100;
    }

    changeColor(newC) {
        this.color = newC;
    }

    drive() {
        this.tank--;
    }
}

class Hybrid extends Vehicle {
    constructor(color) {
        super(color);
    }

    chargeTank() {
        this.tank++;
    }
}

console.log(Vehicle);

const mySubaru = new Vehicle('yellow');
const myPrius = new Hybrid('tan');
myPrius.changeColor('grey');

console.log(mySubaru,myPrius);

mySubaru.changeColor('red');
console.log(mySubaru);