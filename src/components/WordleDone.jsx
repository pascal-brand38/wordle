export default function WordleDone({ endOfGame, wordToGuess, newGame }) {
    if (endOfGame && wordToGuess && newGame) {
        if (endOfGame && (endOfGame.win || endOfGame.loose)) {
            var defLink = 'https://1mot.net/' + wordToGuess.toLowerCase();
            var doneResult, message, message2=null;
            if (endOfGame.win) {
                doneResult = 'result-win'; 
                message = "Gagné !"
            } else { 
                doneResult = 'result-loose'; 
                message = "Perdu !"
                message2 = "Le mot à trouver était " + wordToGuess;
            }
            return (
                <div className={`done-container ${doneResult}`}>
                    <div className="done-item">
                    { message }
                    </div>
                    { message2 &&  <div className="done-item"> {message2} </div>}
                    <button className="done-item">
                        <a  href={`${defLink}`} target="_blank" rel="noopener noreferrer">
                            Definition de { wordToGuess }
                        </a>
                    </button>
                    <button className="done-item" onClick={newGame}>
                        Rejouer
                    </button>
                </div>
            );
        }
    }
}
