const $inputBtn = $('#beer-button');
const $lyricList = $('#lyrics');
let btlCount = 0; // Bottle Count for lyrics

$inputBtn.on('click',function(evt) {
    evt.preventDefault();
    $lyricList.empty(); // clear the lyrics when getting another input

    const $beerCount = $('#beer-input');
    const $err = $('#error-text');
    const count = parseFloat($beerCount.val().replace(/,/g,'')); // number to check for input validity
    let lyric = ''; // var for building the lyrics to insert into the page
    //console.log($beerCount.val(), count,"Lengths: ",$beerCount.val().length, count.toString().length);

    // check for valid input
    if(isNaN(count) || ($beerCount.val().length != count.toString().length)) {
        $err.text('Please just enter digits, no extra stuff.');
    } else if((count % 1) > 0) {
        $err.text('Ew, better get rid of that partial bottle first...');
    } else if(count < 0) {
        $err.text('Not sure what Negative Beer means, but it sounds bad!');
    } else if(count === 0) {
        $err.text('No Beer?!? Better go get some more!');
    } else if(count > 100) {
        $err.text("Whoa there, let's settle down. How about starting at 100 and see where it goes?")
    } else {
        btlCount = count;
        $err.text(''); // clear error message on valid input
        $beerCount.val(''); // clear input field on valid input
    } // end input check
    
    // put the lyrics on the web-page!
    for(btlCount; btlCount>0; btlCount--){
        const $lyricElem = $('<li>');

        // build first line
        lyric = btlCount + getPhrase(btlCount) + 'of beer on the wall, ';
        lyric += btlCount + getPhrase(btlCount) + 'of beer.';
        //console.log(lyrics);
        $lyricElem.text(lyric);
        $lyricList.append($lyricElem);

        // build second line
        lyric = '    Take one down, pass it around, ' + (btlCount - 1);
        lyric += getPhrase((btlCount-1)) + 'of beer on the wall.';
        //$lyricElem.text(lyric);
        $lyricList.append(lyric);
        $lyricList.append('<br><br>');
    }
});

// Helper
function getPhrase (num) {
    if(num === 1) {
        return ' bottle '
    } else {
        return ' bottles '
    }
}