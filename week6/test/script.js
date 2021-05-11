console.log('hello world');

const headerClicker = document.querySelector('h1');
headerClicker.addEventListener('click',function () {
    console.log('CLICK!');
    const myP = document.querySelector('p');
    myP.setAttribute('id','');
    // OR in one line:
    // document.querySelector('#hidden').removeAttribute('id');
})

