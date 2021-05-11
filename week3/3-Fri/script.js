const $queryList = $('#doing');

const stuff = ['Make the Bed','Go for a Walk','Play Video Games'];

// Add daily items for the default list
for(let i=0; i<stuff.length; i++) {
    const $queryListElem = $('<li>');

    $queryListElem.text(stuff[i]);
    $queryList.append($queryListElem);
}

const $formBtn = $('#item-button');

$formBtn.on('click',function(evt) {
    evt.preventDefault(); // prevents page refresh because we are doing stuff with JS instead
    const $userInput = $('#doer-input');
    const $err = $('#error-text');
    const item = $userInput.val();

    console.log(item);
    if(item.length > 0) { // prevent NULL value
        $userInput.val('');  // clear input from fielsd
        $queryList.append(item);
        $err.text(''); // clear error message upon valid input
    } else {
        $err.text("Gotta enter something!");
    }
    
});

const $queryListItems = $('#doing');

$queryListItems.on('mouseenter mouseleave click dblclick','li',function(evt) {
    if(evt.type === 'mouseenter') {
        $(this).siblings().addClass('inactive');
    } else if (evt.type === 'mouseleave') {
        $(this).siblings().removeClass('inactive');
    } else if (evt.type === 'click') {
        $(this).addClass('active');
    } else if (evt.type === 'dblclick') {
        $(this).addClass('strike');
    }
})