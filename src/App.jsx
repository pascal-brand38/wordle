import { useState } from 'react'
import Wordle from './components/Wordle.jsx'

// JS libraries used to compute wordle, but does not display it
import getOneWord from './hooks/frenchDict.js'

function App() {
    const [wordToGuess, setWordToGuess] = useState(getOneWord())

  return (
    <section className="container">
            <Wordle 
                wordToGuess={wordToGuess} 
            /> 
    </section>

  )
}

export default App
