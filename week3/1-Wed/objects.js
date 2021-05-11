// Array are good but limited
const acct = ["AC",1000];

let name = acct[0]; // -> AC
let bal = acct[1]; // -> 1000

// OBJECTS (dictionary)
const myAcct = {
    userName: "AC",
    balance: 5000,
    transactions: [150, -75, -300, 1350],
    deposit: function(amount) { // function within an object to update balance
        this.balance += amount;
    }
}

myAcct.userName; // -> AC
myAcct.balance; // -> 5000

myAcct.acctNumber = 123456; // adds new key/value pair
myAcct.userName = "CA" // updates value

console.log(myAcct);

// form -> update username, balance, acctNumber
const userIn = "userName";

myAcct[userIn] = "Andrew Cortellucci";
console.log(myAcct.userName);

myAcct.deposit(500);
console.log(myAcct.balance);

for(let i in myAcct) { // Itterate over all items in the object 
    console.log(i + ": " + myAcct[i]);
}

// CLASSES
class BankAccount {
    constructor(username, balance = 0) { // default parameter
        this.userName = username;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
    }
    
    withdraw(amount) {
        if(this.balance - amount < 0) {
            console.log("Time-Out! You don't have the funds for that!");
        } else {
            this.balance -= amount;
        }
    }
}

class Checking extends BankAccount {
    constructor(username, balance, atmFee) {
        super(username,balance);
        this.atmFee = atmFee;
    }

    deposit(amount) { // overriding the base class method before calling it with 'super'
        super.deposit(amount - this.atmFee);
    }
}

const andrew = new BankAccount("Andrew C",5000);
const petetr = new BankAccount("Peter F", 1000);

const andrewCheck = new Checking("Andrew", 300, 1.5);
andrewCheck.deposit(125); // uses BankAcct class to run this method

// Pausing at 1:16:00 creating new Animal.js file