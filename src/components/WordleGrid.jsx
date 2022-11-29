import { useState } from 'react'

function WordleCell({ guessDisplayCell }) {
    return (
        <div className={`wordle-cell ${guessDisplayCell.color}`}>
            {guessDisplayCell.key}
        </div>
    )
}

function WordleRow({ guessDisplayRow, error }) {
    var addClass = '';
    if (error != 'error-none') {
        addClass = error;
    }
    return (
        <div className={`wordle-row ${addClass}`}>
            {guessDisplayRow.map((l, i) => <WordleCell key={i} guessDisplayCell={l} />)}
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

export default function WordleGrid({ guessDisplay, guessTurn, error }) {
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
                return (<WordleRow key={i} guessDisplayRow={guessDisplay[i]} error={currentError}/>);
            })}
        </div>
    );
}

