//let likeCount = 0; // global variable

function handleLikePost (step) {
    let likeCount = 0;
    return function addLike() { // preserves the scope of LikeCount
        likeCount += step;
        return likeCount;
    }
}

const like = handleLikePost(1);
const doubleLike = handleLikePost(2);

console.log(like());
console.log(like());
console.log(doubleLike());

// mock up private vars and methods --> simulate Bank Account
function bankAccount(initBal) {
    let balance = initBal;

    // Getters + Setters 
    // returning an Object of functions
    return {
        getBalance: function() { return balance; },
        deposit: function(amt) { 
            balance += amt; 
            return balance;
        },
        withdrawal: function(amt) { 
            balance -= amt; 
            return balance;
        }
    }
}

const myAcct = bankAccount(500);

const balHeading = document.querySelector('#balance');
balHeading.textContent = myAcct.getBalance();

const depButton = document.querySelector('#deposit-btn');
const withdrawButton = document.querySelector('#withdraw-btn');

depButton.addEventListener('click',function () {
    const input = document.querySelector('#amount');

    if(!isNaN(parseInt(input.value))) {
        balHeading.textContent = myAcct.deposit(parseInt(input.value));
        document.querySelector('#error').textContent = '';
        input.value = '';
    } else {
        document.querySelector('#error').textContent = 'You must enter a Number';
    }
    
})

withdrawButton.addEventListener('click',function () {
    const input = document.querySelector('#amount');
    const err = document.querySelector('#error');
    const amt = parseInt(input.value);
    console.log(amt);

    if(!isNaN(amt)) {
        if((myAcct.getBalance() >= amt) && amt > 0) {
            balHeading.textContent = myAcct.withdrawal(amt);
            err.textContent = '';
            input.value = '';
        } else if (amt < 0) {
            err.textContent = `Please enter a Positive Number ${amt}`;
        } else {
            err.textContent = `You don't have enough to withdraw ${amt}`;
        }
    } else {
        err.textContent = 'You must enter a Number';
    }
    
})

class BankAccount {
    constructor(initBalance) {
        this.amt = initBalance;
    }

    getBalance() {
        return this.amt;
    }
}

const myBankAcct = new BankAccount(500);
const acct2 = new BankAccount(10000);

console.log(myBankAcct.getBalance());
console.log(acct2.getBalance());