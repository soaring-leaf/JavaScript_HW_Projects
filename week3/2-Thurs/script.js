// // animal object
// const cheetah = {
//     name: "Andrew",
//     age: 39,
//     foodsEaten: [],
//     eat: function(food) {
//         this.foodsEaten.push(food);
//     }
// }

// cheetah.name; // -> Andrew
// cheetah.eat('cheeseburger');
// cheetah.foodsEaten; // -> ['cheesburger']

// // DOM = Document Object Model
// // get html elements
// // <div id="my-id"></div>
// const elem = document.getElementById('my-id');

// // <p class="my-class">(Item1)</p> <p class="my-class">(Item2)</p>
// const elemArray = document.getElementsByClassName('my-class');

// // <ul><li>Item1</li><li>Item2</li><li>Item3</li></ul>
// const tagArray = document.getElementsByTagName('li');

// // <h1>Peter is the Best!</h1>
// const headingElem = document.querySelector('h1');
// const listElem = document.querySelectorAll('li');

// headingElem.textContent = "Andrew is the Best!";
// // <h1>Andrew is the Best!</h1>

// window.onload = function() { // will only run once the page fully loads

// }

console.log('Hi!');

const heading = document.querySelector('h1');
heading.textContent = "Hello, World!";
heading.style.color = "red";

//targets:
// class --> .NAME
// id --> #NAME
// <ul id="campuses"></ul>
// const list = document.querySelector('#campuses');

// JQuery: Common practice to put the '$' in front of JQuery Vars
// Just use JQuery when dealing with the DOM
const $queryList = $('#campuses');

const gaLoc = ['DC','NY','SF','DN','LA','CL'];

// loop over gaLoc array for every element
// create li elements and insert location text inside.
// Then append li element to list element from above
for(let i=0; i<gaLoc.length; i++) {
    // creating list element = <li></li>
    // const listElem = document.createElement('li');
    // JQuery:
    const $queryListElem = $('<li>');

    // listElem.textContent = gaLoc[i];
    $queryListElem.text(gaLoc[i]);
    // list.append(listElem);
    $queryList.append($queryListElem);
}

 const formBtn = document.querySelector('#location-button');
// // sanity check
 console.log(formBtn);

formBtn.addEventListener('click',function(evt) {
    evt.preventDefault(); // prevents page refresh because we are doing stuff with JS instead
    const userInput = document.querySelector('#location-input');

    if(userInput.value.length > 0) { // prevent NULL value
        const listElem = document.createElement('li');
        listElem.textContent = userInput.value;
        userInput.value = "";  // clear input from field
        $queryList.append(listElem);
        document.querySelector('#error-text').textContent = ""; // clear error message upon valid input
    } else {
        document.querySelector('#error-text').textContent = "Gotta enter something!";
    }
    
});

// const $queryFormBtn = $('#location-button');
// $queryFormBtn.on('click',function(evt) {
//     same code as above for JQuery
// });
const $queryListItems = $('#campuses');

$queryListItems.find('li').each(function() {
    $(this).prepend(' - ');
})

// optional middle param allows us to attach the new li elements to the listener
// $queryListItems.on('mouseenter','li',function(evt) {
//     $(this).siblings().addClass('inactive');
// });

// $queryListItems.on('mouseleave','li',function(evt) {
//     $(this).siblings().removeClass('inactive');
// });

// or all at once:
$queryListItems.on('mouseenter mouseleave click dblclick','li',function(evt) {
    if(evt.type === 'mouseenter') {
        $(this).siblings().addClass('inactive');
        $(this).prepend(' - ');
    } else if (evt.type === 'mouseleave') {
        $(this).siblings().removeClass('inactive');
    } else if (evt.type === 'click') {
        $(this).addClass('strike');
    } else if (evt.type === 'dblclick') {
        $(this).remove();
    }
})

const $source = $('#hello-world-template').html();
// const source = document.querySelector('#hello-world-template').innerHTML;

const template = Handlebars.compile($source);

const myText = {helloTitle: "Handlebars is Great!",
                helloContent: "A bit strange to use, though."};

const compiledTemplate = template(myText);

$('body').append(compiledTemplate);
//document.body.append(compiledTemplate);