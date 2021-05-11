const p1 = []; // player 1's deck
const p2 = []; // player 2's deck
const deck = []; // deck to shuffle and deal the cards
let gameOver = 0; // game over flag
let rounds = 0; // Number of Rounds played
let handWin = 0; // winner of the hand
let war = 0; // war flag for redistributing cards in a war condition
let lowCards = 0; // flag for a player in War with low cards

// build deck
for(let i = 0; i<52;i++) {
    deck.push(i); // build cards for game
    //console.log(getCard(i)); // testing deck build
} // end building deck

// shuffle deck
for(let k=(deck.length-1); k>0; k--) {
    const m = Math.floor(Math.random() * k);
    const temp = deck[k];
    deck[k] = deck[m];
    deck[m] = temp;
} // end shuffle 

// deal deck to players
for(let n=0; n<deck.length; n++) {
    if(n % 2 === 0) {
        p1.push(deck[n]);
    } else {
        p2.push(deck[n]);
    }
} // end deal

// deck verification
// console.log(`P1 has ${p1.length} cards: `, p1);
// console.log();
// console.log(`P2 has ${p2.length} cards: `, p2);

// START THE GAME!
while (!gameOver) {
    rounds++;

    // test war at end condition
    // if(p1.length <= 3 || p2.length <= 3){
    //     p1.unshift(20);
    //     p2.unshift(20);
    //     p1.push(21);
    //     p2.push(21);
    // }

    do {
        let iCard = war * 4;

        // what if there's a war at the end of the game?
        if(iCard >= p1.length) {
            iCard = p1.length-1;
            lowCards = 1;
        } else if (iCard >= p2.length) {
            iCard = p2.length-1;
            lowCards = 2;
        }

        handWin = checkCards(p1[iCard],p2[iCard]);

        if(handWin === 0) {
            if(lowCards === 1) {
                console.log(`Player 1 is out of cards...`);
                handWin = 2;
            } else if(lowCards === 2) {
                console.log(`Player 2 is out of cards...`);
                handWin = 1;
            } else {
                war++;
                console.log(`Going to WAR! P1: ${getCard(p1[iCard])}  P2: ${getCard(p2[iCard])}`);
            }  
        } else {
            console.log(`Winner of hand is Player ${handWin}!`);
        }
    } while (!handWin); // continue round in a War situation

    console.log(`Player1 | Player2:`); // prep for printing cards for hand

    // distribute played cards to winner and print cards
    for(let w=war*4; w>=0; w--){
        const c1 = p1.shift();
        const c2 = p2.shift();
        
        if(handWin === 1) {
            p1.push(c2);
            p1.push(c1);
        } else {
            p2.push(c1);
            p2.push(c2);
        }

        // Print Cards for Round
        console.log(`   ${getCard(c1)} | ${getCard(c2)}`);

        // did any player lose all their cards?
        if(p1.length === 0 || p2.length === 0) {
            gameOver++;
            console.log('Game over, man...')
            // if war at end condition, need to break loop
            w = -1;
       }
    } // end distribution to winner

    // Display remaining cards for each player
    if(p1.length !== 0 && p2.length !== 0) {
        console.log(`Current Player Strength - Player 1: ${p1.length}, Player 2: ${p2.length}`);
        console.log();
    }

    //prevent infinite loop in testing
    // if(rounds > 5) {
    //     console.log('Infinite Loop prevented');
    //     gameOver++; 
    // }

    // reset flags for next hand
    war = 0;
    lowCards = 0;
}

// Announce Winner
if(p1.length > p2.length) {
    console.log(`P1 wins in round ${rounds}!`);
} else {
    console.log(`P2 wins in round ${rounds}!`);
}

// console.log(`p1 deck: `, p1);
// console.log(`p2 deck: `, p2);

//==============================================================
// FUNCTION Section

// check cards for Round Winner
// Returns number: 
//      1 = Player 1 wins
//      2 = Player 2 Wins
//      0 = WAR!
function checkCards(c1,c2) {
    c1 = c1 % 13;
    c2 = c2 % 13;

    if(c1 === c2) {
        return 0;
    } else if(c1 > c2) {
        return 1;
    } else {
        return 2;
    }
} // end checkCards

// Get Card for Printout 
// takes the card number and returns the Playing Card to print
function getCard(myCard) {
    let card = (myCard % 13) + 2; // get number for card

    // update high value cards
    if(card === 11) {
        card = 'Jack';
    } else if (card === 12) {
        card = 'Queen';
    } else if (card === 13) {
        card = 'King';
    } else if (card === 14) {
        card = 'ACE!';
    }

    // set the suit of the card
    if((myCard/13) < 1) {
        card += '-S'; // Spades
    } else if((myCard/13) < 2) {
        card += '-D'; // Diamonds
    } else if((myCard/13) < 3) {
        card += '-C'; // Clubs
    } else {
        card += '-H'; // Hearts
    }

    return card;
}