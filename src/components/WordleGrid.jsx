function WordleCell({ guessDisplayCell, flip, col }) {
    if (flip) {
        return (
            <div className="wordle-cell__flip wordle-cell__size">
                <div className={`wordle-cell__inner flip-delay-${col}`}>
                    <div className="wordle-cell__content wordle-cell__front state-unknown">
                        { guessDisplayCell.key }
                    </div>
                    <div className={`wordle-cell__content wordle-cell__back  ${guessDisplayCell.color}`}>
                        { guessDisplayCell.key }
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`wordle-cell__size wordle-cell__content ${guessDisplayCell.color}`}>
                { guessDisplayCell.key }
            </div>
        );
    }
}

function WordleRow({ guessDisplayRow, error, flip }) {
    var addClass = '';
    if (error != 'error-none') {
        addClass = error;
    }
    return (
        <div className={`wordle-row ${addClass}`}>
            {guessDisplayRow.map((l, i) => <WordleCell key={i} guessDisplayCell={l} flip={flip} col={i}/>)}
        </div>
    )
}

function WordleShowError({ error }) {
    if (error === 'error-none') {
        return;
    } else {
        var mes = 'Erreur inconnue';
        if (error == 'error-nbletters') {
            mes = 'Trop peu de lettres';
        } else if (error == 'error-submitted') {
            mes = 'Mot soumis';
        } else if (error == 'error-nturns') {
            mes = 'Plus d\'essais disponible';
        }
        return (
            <div className='error-container'>
                    { mes }
            </div>
        );
    }
}

export default function WordleGrid({ guessDisplay, guessTurn, error, flipRow }) {
    return (
        <div className='wordle-grid'>
            <WordleShowError error={error} />
            { guessDisplay.map((l, i) => {
                var currentError;
                if (i === guessTurn) {
                    currentError = error;
                } else {
                    currentError = 'error-none';
                }
                return (<WordleRow key={i} guessDisplayRow={guessDisplay[i]} error={currentError} flip={(flipRow === i)} />);
            })}
        </div>
    );
}

