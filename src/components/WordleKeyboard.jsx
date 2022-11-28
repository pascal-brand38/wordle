function WordleKeyboardKey({keyboardKey, keyPressed}) {
///    <button className={`wordle-cell ${keyboardKey.color}`} onClick={keyPressed({key: keyboardKey.key})}>
    var addClass ='';
    var key = keyboardKey.key;
    if (keyboardKey.key === 'Enter') {
        addClass = 'double-width';
        key = 'Enter';
    } else if (keyboardKey.key === 'Backspace') {
        addClass = 'double-width';
        // key = '\u2421';    // https://texteditor.com/emoji/  Symbol for Delete 
        key = 'Del';
    }

    return (
        <button className={`keyboard-cell ${addClass} ${keyboardKey.color}`} onClick={() => keyPressed({key: keyboardKey.key})}>
            {key}
        </button>
    )
}

function WordleKeyboardRow({keyboardRow, keyPressed}) {
    return (
        <div className='keyboard-row'>
            { keyboardRow.map((l, i) => <WordleKeyboardKey key={i} keyboardKey={l} keyPressed={keyPressed} />) }
        </div>
    )
}

export default function WordleKeyboard({keyboard, keyPressed}) {
    return(
        <div className='keyboard-grid'>
            { keyboard.map((l, i) => <WordleKeyboardRow key={i} keyboardRow={l} keyPressed={keyPressed} />) }
        </div>
    );
}
