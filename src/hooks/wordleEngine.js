///
/// Engine of wordle
/// Compute wordle state, but does not display it
/// Displaying is the Wordle component role
///

import { useState, useEffect } from 'react'
// JS libraries used to compute wordle, but does not display it
import keyboardEngine from './keyboardEngine.js'
import gridEngine from './gridEngine.js'
import stateEngine from './stateEngine.js'

const wordleEngine = () => {
    const charNbWordToGuess = 5;           // number of char in the word to guess
    const attemptMax = 6;

    const keyboard = keyboardEngine();
    const grid = gridEngine(charNbWordToGuess, attemptMax);
    const state = stateEngine(attemptMax);

    const newGame = () => {
        keyboard.init();
        grid.init();
        state.init(attemptMax);
    }

    // Processed when a key is pressed
    const keyPressed = ( e ) => {       // e is the event returned by the event addEventListener('keyup'
        state.update(e.key, grid, keyboard);
    }

    useEffect(() => {
        window.addEventListener('keyup', keyPressed)

        return () => window.removeEventListener('keyup', keyPressed)
    }, [keyPressed]);

    return { 
        keyboardDisplay: keyboard.keyboardDisplay,
        gridDisplay: grid.gridDisplay, 
        state: state.state,
        newGame,
        keyPressed,
    };
}
export default wordleEngine;
