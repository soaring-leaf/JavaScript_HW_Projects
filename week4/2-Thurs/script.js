// create a function that logs 'Blasting Off!'
// Two ways to declare function
// 1) Function Declaration => function myName() {}
// 2) Function Expression => const myName = function () {}
// to Run both ways: myName();

const blastOff = function(str) {
    console.log('Blasting Off!');
}

blastOff();

// Function w/ 2 arguments
// 1) Name of Rocket
// 2) function to run
function launchRocket(rName,blastOffCallback) {
    return function () {
        console.log(`Launching ${rName}`);
        console.log(`4...3...2...1...`);
        blastOffCallback();
    }
}

const launchViking = launchRocket('Viking',blastOff);
const launchMariner = launchRocket('Mariner',blastOff);

launchViking();
launchMariner();

// Write a function, makeCountingFunction(), that returns another function. 
// The function returned by makeCountingFunction() should take an array as an 
// argument, and return the number of odd integers in the array.
// Part 2: makeCountingFunction() itself should take as its only argument a function 
// designed to run a test on each item in an array (in this case, test whether 
// a number is odd).
// Test your code by running it in the command line using node!

function isOdd(num) {
    return (num % 2 === 1); // returns boolean
}

function isEven(num) {
    return (num % 2 === 0);
}

function makeCountingFunction(numCheck) {
    return function (arr) {
        let count = 0;
        for(let i=0; i<arr.length; i++) {
            if(numCheck(arr[i])) {
                count++;
            }
        }
        return count;
    }
}

const oddCount = makeCountingFunction(isOdd);
const evenCount = makeCountingFunction(isEven)
console.log('Odd number count = ',oddCount([1,2,3,4,5,6,7]));
console.log('Even number count = ',evenCount([1,2,3,4,5,6,7]));

//setTimeout(helloWorld,1000);

// function helloWorld() {
//     console.log("Hello!");
// }

// setTimeout(function timer(){
//     console.log("TIME IS UP!!!");
// },2000);

// Imediately invoked function expressions (IIFE)

const countDown = function () {
    for(let k=3; k>0; k--) {
        console.log('...',k);
    }
}();

// normal call no longer works on an IIFE:
// countDown();

const countUp = function(num) {
    for(let m=0; m<num;m++) {
        console.log(m);
    }
}(10);

// Write an IIFE function that takes a timer argument.
// The function will automatically execute and count up every second 
// until the specified argument.
//     Use the setTimeout function to count up.
//     Hint: a second is the timer passed * 1000 (milliseconds).
const timeCount = function(num) {
    for(let i=0;i<=num; i++) {
        const countIt = function(k) {
            setTimeout(function() {
                console.log(k);
            },k*1000)
        }(i);
    }
}(10);