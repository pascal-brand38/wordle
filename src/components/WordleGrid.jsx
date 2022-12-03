function WordleCell({ gridDisplayCell, flip, col }) {
    if (flip) {
        return (
            <div className="wordle-cell__flip wordle-cell__size">
                <div className={`wordle-cell__inner flip-delay-${col}`}>
                    <div className="wordle-cell__content wordle-cell__front state-unknown">
                        { gridDisplayCell.key }
                    </div>
                    <div className={`wordle-cell__content wordle-cell__back  ${gridDisplayCell.color}`}>
                        { gridDisplayCell.key }
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`wordle-cell__size wordle-cell__content ${gridDisplayCell.color}`}>
                { gridDisplayCell.key }
            </div>
        );
    }
}

function WordleRow({ gridDisplayRow, error, flip }) {
    var addClass = '';
    if (error != 'error-none') {
        addClass = error;
    }
    return (
        <div className={`wordle-row ${addClass}`}>
            {gridDisplayRow.map((l, i) => <WordleCell key={i} gridDisplayCell={l} flip={flip} col={i}/>)}
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

export default function WordleGrid({ gridDisplay, guessTurn, error, flipRow }) {
    return (
        <div className='wordle-grid'>
            <WordleShowError error={error} />
            { gridDisplay.map((l, i) => {
                var currentError;
                if (i === guessTurn) {
                    currentError = error;
                } else {
                    currentError = 'error-none';
                }
                return (<WordleRow key={i} gridDisplayRow={gridDisplay[i]} error={currentError} flip={(flipRow === i)} />);
            })}
        </div>
    );
}

