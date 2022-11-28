function WordleCell({guessDisplayCell}) {
    return (
        <div className={`wordle-cell ${guessDisplayCell.color}`}>
            {guessDisplayCell.key}
        </div>
    )
}

function WordleRow({guessDisplayRow}) {
    return (
        <div className='wordle-row'>
            { guessDisplayRow.map((l, i) => <WordleCell key={i} guessDisplayCell={guessDisplayRow[i]} />) }
        </div>
    )
}

export default function WordleGrid({guessDisplay}) {
    return(
        <div className='wordle-grid'>
            { guessDisplay.map((l, i) => <WordleRow key={i} guessDisplayRow={guessDisplay[i]} />) }
        </div>
    );
}

