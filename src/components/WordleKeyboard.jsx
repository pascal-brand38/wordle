function WordleKeyboardKey({keyboardKey, keyPressed}) {
///    <button className={`wordle-cell ${keyboardKey.color}`} onClick={keyPressed({key: keyboardKey.key})}>

    return (
        <button className={`wordle-cell ${keyboardKey.color}`} onClick={() => keyPressed({key: keyboardKey.key})}>
            {keyboardKey.key}
        </button>
    )
}

function WordleKeyboardRow({keyboardRow, keyPressed}) {
    return (
        <div className='wordle-row'>
            { keyboardRow.map((l, i) => <WordleKeyboardKey key={i} keyboardKey={l} keyPressed={keyPressed} />) }
        </div>
    )
}

export default function WordleKeyboard({keyboard, keyPressed}) {
    return(
        <div className='wordle-grid'>
            { keyboard.map((l, i) => <WordleKeyboardRow key={i} keyboardRow={l} keyPressed={keyPressed} />) }
        </div>
    );
}
