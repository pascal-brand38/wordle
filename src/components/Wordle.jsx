import { useEffect } from 'react'
import wordleEngine from '../hooks/wordleEngine.js'
import WordleGrid from './WordleGrid.jsx'
import WordleKeyboard from './WordleKeyboard.jsx'

const attemptMax = 6;


export default function Wordle( { wordToGuess } ){

  const { wordCurrent, history, guessDisplay, keyboard, keyPressed } = wordleEngine(wordToGuess, attemptMax)

  useEffect(() => {
    window.addEventListener('keyup', keyPressed)

    return () => window.removeEventListener('keyup', keyPressed)
  }, [keyPressed])

  return (
    <>
        <div className="info-container">
        <div className="info-item">
                Mot à deviner: {wordToGuess}
            </div>
            <div className="info-item">
                Mot en cours: {wordCurrent}
            </div>
        </div>

        <WordleGrid guessDisplay={guessDisplay}/>
        <WordleKeyboard keyboard={keyboard} keyPressed={keyPressed}/>
    </>
    );
}
