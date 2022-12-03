///
/// Grid
///

import { useRef } from 'react'

const gridEngine = (charNbWordToGuess, attemptMax) => {
    const nrows = attemptMax;
    const ncols = charNbWordToGuess;

    const initialValue = () => {
        var res = [];
        for (var i=0; i<nrows; i++) {
            var row = [];
            for (var j=0; j<ncols; j++) {
                row.push({ key: '', color:'state-unknown'});
            }
            res.push(row);
        }
        return res;
    }

    const gridDisplay = useRef(initialValue());   // array of { key:'a', color:'state-rightplace|state-wrongplace|state-notfound' }
    const init = () => { gridDisplay.current = initialValue() };

    const addLetter = (letter, guessTurn, letterIndex) => {
        gridDisplay.current[guessTurn][letterIndex].key = letter.toUpperCase();
    }
    const removeLetter = (guessTurn, letterIndex) => {
        gridDisplay.current[guessTurn][letterIndex].key = '';
    }
    const validate = (guessTurn, wordToGuess) => {
        const arrayWordToGuess = [...wordToGuess];

        // all letters becomes not-found
        gridDisplay.current[guessTurn].map((l) => { l.color = 'state-notfound' } );

        // check for the state-rightplace ones
        gridDisplay.current[guessTurn].forEach((l, i) => {     // foreach letters of display
            if (l.key === arrayWordToGuess[i]) {   // same letter at the same place
                l.color = 'state-rightplace';     // set state-rightplace color
                arrayWordToGuess[i] = null;     // remove this color as found
            }
        });
        
        // check for the state-wrongplace ones
        gridDisplay.current[guessTurn].forEach((l, i) => {     // foreach letters of display
            if (l.color==='state-notfound' && arrayWordToGuess.includes(l.key)) {         // same letter at the same place
                l.color = 'state-wrongplace';                                // set state-wrongplace color
                arrayWordToGuess[ arrayWordToGuess.indexOf(l.key)] = null;      // remove this color as found
            }
        });
    }


    return {
        gridDisplay: gridDisplay.current,
        init,
        addLetter,
        removeLetter,
        validate
    };
}

export default gridEngine;
