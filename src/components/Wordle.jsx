import { useEffect } from 'react'
import wordleEngine from '../hooks/wordleEngine.js'
import WordleGrid from './WordleGrid.jsx'
import WordleKeyboard from './WordleKeyboard.jsx'
import WordleDone from './WordleDone.jsx'

export default function Wordle() {

    const { gridDisplay, keyboardDisplay, state, newGame, keyPressed } = wordleEngine()

    return (
        <>
            <div className="wordle-info">
                <div className="wordle-info-item">
                    Wordle
                </div>
            </div>

            <WordleGrid gridDisplay={gridDisplay} guessTurn={state.guessTurn} error={state.error} flipRow={state.flipRow} />
            <WordleKeyboard keyboardDisplay={keyboardDisplay} keyPressed={keyPressed} />

            <WordleDone 
                endOfGame={state.endOfGame}
                wordToGuess={state.wordToGuess}
                newGame = {newGame}
            />
        </>
    );
}
