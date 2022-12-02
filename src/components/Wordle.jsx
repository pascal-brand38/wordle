import { useEffect } from 'react'
import wordleEngine from '../hooks/wordleEngine.js'
import WordleGrid from './WordleGrid.jsx'
import WordleKeyboard from './WordleKeyboard.jsx'
import WordleDone from './WordleDone.jsx'

export default function Wordle() {

    /// TODO: iteration is used because guessDisplay not correctly rendered when wordCurrent not updated
    /// TODO: remove iteration which is a hack
    const { iteration, wordToGuess, wordCurrent, keyboard, guessDisplay, error, resetError, history, guessTurn, flipRow, endOfGame, newGame, keyPressed } = wordleEngine()

    useEffect(() => {
        window.addEventListener('keyup', keyPressed)

        return () => window.removeEventListener('keyup', keyPressed)
    }, [keyPressed]);

    useEffect(() => {
        if (error != 'error-none') {
            window.setTimeout(resetError, 2000);
        }
    }, [error]);

    return (
        <>
            <div className="wordle-info">
                <div className="wordle-info-item">
                    Wordle
                </div>
            </div>

            <WordleGrid guessDisplay={guessDisplay} guessTurn={guessTurn} error={error} flipRow={flipRow} />
            <WordleKeyboard keyboard={keyboard} keyPressed={keyPressed} />

            <WordleDone 
                endOfGame={endOfGame}
                wordToGuess={wordToGuess}
                newGame = {newGame}
            />
        </>
    );
}
