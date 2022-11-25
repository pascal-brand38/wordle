function WordleCell({guessDisplay, rowNb, colNb}) {
    return (
        <div className={`wordle-cell ${guessDisplay[rowNb][colNb].color}`}>
            {guessDisplay[rowNb][colNb].key}
        </div>
    )
}

function WordleRow({guessDisplay, rowNb}) {
    return (
        <div className='wordle-row'>
            { guessDisplay[rowNb].map((l, i) => <WordleCell key={i} guessDisplay={guessDisplay} rowNb={rowNb} colNb={i}/>) }
        </div>
    )
}

export default function WordleGrid({guessDisplay}) {
    return(
        <div className='wordle-grid'>
            { guessDisplay.map((l, i) => <WordleRow key={i} guessDisplay={guessDisplay} rowNb={i} />) }
        </div>
    );
}

