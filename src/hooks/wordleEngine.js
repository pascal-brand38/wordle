///
/// Engine of wordle
/// Compute wordle state, but does not display it
/// Displaying is the Wordle component role
///

import { useState } from 'react'

const wordleEngine = ( wordToGuess , attemptMax) => {
    const charNbWordToGuess = wordToGuess.length;           // number of char in the word to guess

    const initGuessDisplay = () => {
        var res = [];
        for (var i=0; i<attemptMax; i++) {
            var row = [];
            for (var j=0; j<charNbWordToGuess; j++) {
                row.push({ key: '', color:'state-unknown'});
            }
            res.push(row);
        }
        return res;
    }

    const initKeyboard = () => {
        var letterOrder = [];
        letterOrder.push(['A',   'Z',   'E', 'R', 'T', 'Y', 'U', 'I', 'O',     'P']);
        letterOrder.push(['Q',   'S',   'D', 'F', 'G', 'H', 'J', 'K', 'L',     'M' ]);
        letterOrder.push(['Backspace', 'W', 'X', 'C', 'V', 'B', 'N', 'Enter']);
        var res = [];
        letterOrder.map((l, i) => {
                var row = [];
                l.map((letter, j) => row.push({ key:letter, color:"state-unknown"}));
                res.push(row);
            });
        return res;
    }

    const setKeyboardKey = (keyboard, key, color) => {
        var found = false;
        keyboard.map((l, i) => {
            if (!found) {
                var j = l.findIndex((l) => l.key === key);
                if (j != -1) {
                    found = true;
                    console.log(keyboard);
                    if (color === 'state-rightplace') {
                        keyboard[i][j].color = color;
                    } else if (color === 'state-wrongplace') {
                        if (keyboard[i][j].color != 'state-rightplace') {
                            keyboard[i][j].color = color;
                        }
                    } else {
                        // color is state-notfound
                        if (keyboard[i][j].color === 'state-unknown') {
                            keyboard[i][j].color = color;
                        }
                    }
                }
            }
        })
        return keyboard;
    }

    const [ wordCurrent, setWordCurrent ] = useState('');   // current word typed by the used, as a string
    const [ history, setHistory] = useState([]);            // history of guessed in this play
    const [ guessDisplay, setGuessDisplay ] = useState(initGuessDisplay());   // array of { key:'a', color:'state-rightplace|state-wrongplace|state-notfound' }
    const [ guessTurn, setGuessTurn ] = useState(0);        // nb of turn completed
    const [ letterIndex, setLetterIndex ] = useState(0);    // current letter index that we set
    const [ keyboard, setKeyboard ] = useState(initKeyboard());

    const computeLastGuessDisplay = (word) => {
        var arrayWordToGuess = [...wordToGuess];        // from the string wordToGuess, get an array of letters
        var display = [...word]  // get an array of the current word
            .map(   // for all the letters
                (l) => { 
                    setKeyboard((prev) => setKeyboardKey(prev, l, 'state-notfound'));
                    return { key: l, color: 'state-notfound'};
                }
            ); 

        // check for the state-rightplace ones
        display.forEach((l, i) => {     // foreach letters of display
            if (l.key === arrayWordToGuess[i]) {   // same letter at the same place
                display[i].color = 'state-rightplace';     // set state-rightplace color
                arrayWordToGuess[i] = null;     // remove this color as found
                setKeyboard((prev) => setKeyboardKey(prev, display[i].key, display[i].color));
            }
        });
        
        // check for the state-wrongplace ones
        display.forEach((l, i) => {     // foreach letters of display
            if (l.color==='state-notfound' && arrayWordToGuess.includes(l.key)) {         // same letter at the same place
                display[i].color = 'state-wrongplace';                                // set state-wrongplace color
                arrayWordToGuess[ arrayWordToGuess.indexOf(l)] = null;      // remove this color as found
                setKeyboard((prev) => setKeyboardKey(prev, display[i].key, display[i].color));
            }
        });

        return display;
    }

    // Processed when a key is pressed
    const keyPressed = ( e ) => {       // e is the event returned by the event addEventListener('keyup'
        if (guessTurn >= attemptMax) {
            return;
        }
        const key = e.key;
        if (key === 'Enter') {  // submit a word
            if (wordCurrent.length < charNbWordToGuess) {
                console.log('Must submit 5 letters')
            } else if (history.includes(wordCurrent)) {
                console.log('Already submitted')
            } else if (guessTurn >= attemptMax) {
                console.log('Already submitted')
            } else {
                setHistory((prev) => prev.concat(wordCurrent) );
                setGuessDisplay((prev) => { var res = prev; res[guessTurn] = computeLastGuessDisplay(wordCurrent); return res; })
                setWordCurrent('')
                setGuessTurn((prev) => prev+1)
                setLetterIndex(0)
            }
        } else if (key === 'Backspace') {
            if (letterIndex > 0) {
                setWordCurrent(prev => prev.slice(0, -1));
                setGuessDisplay((prev) => { prev[guessTurn][letterIndex-1].key = ''; return prev;})
                setLetterIndex((prev) => prev-1)
            }
        } else if (/^[A-Za-z]$/.test(key)) {       // exclude numbers,...
            if (letterIndex < charNbWordToGuess) {       // check we do not add more chars than the length to guess
                setWordCurrent(prev => prev + key.toUpperCase());
                setGuessDisplay((prev) => { prev[guessTurn][letterIndex].key = key.toUpperCase(); return prev;})
                setLetterIndex((prev) => prev+1)
            }
        }
    }

    return { wordCurrent, keyboard, guessDisplay, history, keyPressed };
}
export default wordleEngine;
