// let money = 50;
// const name = "Andrew";

// money += 455;

// if(money > 500) {
//     console.log("You're rich!");
// } else {
//     console.log("Better go to work today.");
// }

// Truthy Falsey
// False -> false, 0, '', Nan (Not a Number), null, undefined
// True -> everything else

const userInput = "Andrew";
const passInput = "AC123";

//if(userInput) { // if string is not empty
if(userInput === "Andrew" && passInput === `AC123`) { 
    console.log(`Hello ${userInput}!`);
    console.log("Hello " + userInput + "! (Same as above)"); 
} else {
    //console.log(`You gotta enter a name, bud!`);
    console.log(`Your username or password is incorrect`);
}

console.log();

const person = "Andrew";
let money = 150;

if(person === "Andrew" || money > 150) {
    console.log(`Welcome to the Casino, ${person}!`);
}

console.log();

let age = 'a';

if(age < 16) {
    console.log(`You can go to school.`);
} else if(age < 18) {
    console.log(`You can drive.`);
} else if(age < 21) {
    console.log(`You can vote!`);
} else if(age < 25) {
    console.log(`You can drink alchol.`);
} else if(age < 35) {
    console.log(`You can rent a car.`);
} else if(age < 62) {
    console.log(`You can run for President.`);
} else if(age > 62) {
    console.log(`You can collect Social Security.`);
} else {
    console.log(`Please enter a valid age.`);
}

console.log();

// Loops + Iteration
const transactions = [154,42,456, -850];

for(let i=0;i<transactions.length;i++) {
    console.log(transactions[i]);
}

let keepPlaying = true;

while(keepPlaying) {
    // do stuff
    // ask to keep playing
    keepPlaying = false;
}

let gamble = 0;

do {
    gamble = Math.floor(Math.random() *10);

    if(gamble > 4) {
        money +=50;
    } else {
        money -= 50;
    }
    console.log(`you have ${money} dollars left. Result:`, gamble);
} while (money > 0 && money < 500);

if(money >= 500) {
    console.log("You're rich!");
} else {
    console.log("Better go to work tomorrow.");
}

speak("before function");

//============================================================
// Functions!
function speak(name) {
    console.log(`Hello, ${name}!`);
}

speak();
speak("Andrew");