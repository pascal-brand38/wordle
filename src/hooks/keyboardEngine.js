///
/// Keyboard
///

import { useRef } from 'react'

const keyboardEngine = () => {
    const initialValue = () => {
        var letterOrder = [];
        letterOrder.push(['A',   'Z',   'E', 'R', 'T', 'Y', 'U', 'I', 'O',     'P']);
        letterOrder.push(['Q',   'S',   'D', 'F', 'G', 'H', 'J', 'K', 'L',     'M' ]);
        letterOrder.push(['Backspace', 'W', 'X', 'C', 'V', 'B', 'N', 'Enter']);
        var res = [];
        letterOrder.map((l, i) => {
                var row = [];
                l.map((letter, j) => row.push({ key:letter, state:"state-unknown"}));
                res.push(row);
            });
        return res;
    }
    const keyboardDisplay = useRef(initialValue());

    const init = () => { keyboardDisplay.current = initialValue(); }

    const updateKeyState = (key, state) => {
        var found = false;
        keyboardDisplay.current.map((l, i) => {
            if (!found) {
                var j = l.findIndex((l) => l.key === key);
                if (j != -1) {
                    found = true;
                    if (state === 'state-rightplace') {
                        keyboardDisplay.current[i][j].state = state;
                    } else if (state === 'state-wrongplace') {
                        if (keyboardDisplay.current[i][j].state != 'state-rightplace') {
                            keyboardDisplay.current[i][j].state = state;
                        }
                    } else {
                        // state is state-notfound
                        if (keyboardDisplay.current[i][j].state === 'state-unknown') {
                            keyboardDisplay.current[i][j].state = state;
                        }
                    }
                }
            }
        })
    }

    const update = (currentGuess, wordToGuess) => {
        const arrayWordToGuess = [...wordToGuess];        // from the string wordToGuess, get an array of letters
        const arrayCurrentGuess = [...currentGuess];

        // all guessed the letters get the not-found state (only if unknown)
        arrayCurrentGuess.map(   
                (letter) => { 
                    updateKeyState(letter, 'state-notfound');
                }
            );

        // check for the state-rightplace ones
        arrayCurrentGuess.map((letter, i) => {
            if (letter === arrayWordToGuess[i]) {   // same letter at the same place
                updateKeyState(letter, 'state-rightplace');
                arrayWordToGuess[i] = '';
            }
        });
        
        // check for the state-wrongplace ones
        arrayCurrentGuess.map((letter, i) => {
            const index = arrayWordToGuess.findIndex((l) => { return (letter===l);} );
            if (index != -1) {         // same letter at the same place
                updateKeyState(letter, 'state-wrongplace');
                arrayWordToGuess[index] = '';
            }
        });
    }

    return {
        keyboardDisplay: keyboardDisplay.current,
        init,
        update }
}

export default keyboardEngine;
