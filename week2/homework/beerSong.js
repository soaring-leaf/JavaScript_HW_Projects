for(let count = 99; count>0; count--) {
    let lyrics = '';

    // build first line
    lyrics += count + getPhrase(count) + 'of beer on the wall, ';
    lyrics += count + getPhrase(count) + 'of beer.';
    
    console.log(lyrics); // print first line
    
    // build secord line
    lyrics = 'Take one down, pass it around, ' + (count - 1);
    lyrics += getPhrase((count-1)) + 'of beer on the wall.';


    console.log(lyrics); // print second line
    console.log(); // get ready for next verse
}

// Helper
function getPhrase (num) {
    if(num === 1) {
        return ' bottle '
    } else {
        return ' bottles '
    }
}