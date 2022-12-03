import { useState, useEffect } from "react";
import getOneWord from './frenchDict.js'

const stateEngine = (attemptMax) => {
    const STATE = {
        ERROR_NONE: 'error-none',                 // no error
        ERROR_NBLETTERS: 'error-nbletters',       // too few letters are submitted
        ERROR_NTURNS: 'error-nturns',             // no more guesses are possible
        ERROR_SUBMITTED: 'error-submitted'        // already submitted word
    }
    const setAnError = ((code) => {
        setState((prev) => {
            return {
                ...prev,
                error: code
            }
        })
    });
    const resetError = () => setAnError(STATE.ERROR_NONE)

    const initialValue = () => {
        return {
            error: STATE.ERROR_NONE,
            guessTurn: 0,
            letterIndex: 0,
            history: [],
            flipRow: -1,
            wordCurrent: '',
            wordToGuess: getOneWord(),
            endOfGame: {
                win: false,
                loose: false
            }
        };
    }

    const newTurn = () => {
        setState((prev)=> {
            return {
                ...prev,
                guessTurn: prev.guessTurn + 1,
                flipRow: prev.guessTurn,
                wordCurrent: '',
                endOfGame: {
                    win: (prev.wordCurrent === prev.wordToGuess),
                    loose: (prev.guessTurn+1 === attemptMax)
                },
                letterIndex: 0,
                history: prev.history.concat(prev.wordCurrent),
            }
        })
    }

    const removeLetter = () => {
        setState((prev)=> {
            return {
                ...prev,
                wordCurrent: prev.wordCurrent.slice(0, -1),
                letterIndex: prev.letterIndex - 1,
            };
        })
    }

    const addLetter = (letter) => {
        setState((prev)=> {
            return {
                ...prev,
                wordCurrent: prev.wordCurrent + letter.toUpperCase(),
                letterIndex: prev.letterIndex + 1
            }
        })
    }

    const update = ( key, grid, keyboard ) => {       // e is the event returned by the event addEventListener('keyup'
        if (state.endOfGame.win || state.endOfGame.loose) {
            return;
        }

        if (key === 'Enter') {  // submit a word
            if (state.letterIndex < state.wordToGuess.length) {
                setAnError(STATE.ERROR_NBLETTERS);
            } else if (state.history.includes(state.wordCurrent)) {
                setAnError(STATE.ERROR_SUBMITTED);
            } else {
                grid.validate(state.guessTurn, state.wordToGuess);
                keyboard.update(state.wordCurrent, state.wordToGuess);
                newTurn();
            }
        } else if (key === 'Backspace') {
            if (state.letterIndex > 0) {
                grid.removeLetter(state.guessTurn, state.letterIndex-1);
                removeLetter();
            }
        } else if (/^[A-Za-z]$/.test(key)) {       // exclude numbers,...
            if (state.letterIndex < state.wordToGuess.length) {       // check we do not add more chars than the length to guess
                grid.addLetter(key, state.guessTurn, state.letterIndex);
                addLetter(key.toUpperCase())
            }
        }
    }

    const [state, setState ] = useState(() => initialValue());
    useEffect(() => {
        if (state.error != STATE.ERROR_NONE) {
            window.setTimeout(resetError, 2000);
        }
    }, [state]);

    const init = () => {
        setState(() => initialValue());
    };

    return { state, init, update }
}

export default stateEngine;
