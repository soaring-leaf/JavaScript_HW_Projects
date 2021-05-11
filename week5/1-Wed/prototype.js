// console.log("hello, world"); // verify script is connecting
function Vehicle(color, make, gas) { // Constructor Functions are capitalized by standard
    this.color = color;
    this.make = make;
    this.style = 'Station Wagon';
    this.year = 2021;
    this.tank = gas; // % of a full tank (100%)
}

function Hybrid(color, batteryLife) {
    Vehicle.call(this, color, batteryLife);
}

Hybrid.prototype.charge = function () {
    this.tank++;
}

const myFord = new Vehicle('red','ford',55); // -> new object { color: 'red' }
const mySubaru = new Vehicle('Maroon','Subaru',75);
const myPrius = new Hybrid('purple',95);

Vehicle.prototype.wheels = 4; // Vehicle properties: all vehilces inherit this value
Vehicle.prototype.topSpeed = 250;

Vehicle.prototype.drive = function() {
    this.tank--;
    console.log("Vroom, Vroom!",this.make,this.tank);
}

myFord.topSpeed = 150; // can define value on item to overwrite the parent property

console.log(myFord);
console.log(myFord.topSpeed);
console.log(mySubaru.topSpeed);

mySubaru.drive();
myFord.drive();

// (almost) everything in JS is an Object
// objects contain a 'prototype' property
// JS starts by looking at the Object for a specific property
// if !found, looks to Prototype
// if still not found -> null

function Camera (type,storage) {
    this.type = type;
    this.storage = storage; // Pictures remaining
    this.batteries = 100; // Battery Percentage!
}

Camera.prototype.takePic = function () {
    console.log("Say Cheese!");
    this.batteries -= 5;
    this.storage--;
}

const myCamera = new Camera('digital',50000);
const myOldCamera = new Camera('film',32);

myCamera.takePic();
myOldCamera.takePic();


