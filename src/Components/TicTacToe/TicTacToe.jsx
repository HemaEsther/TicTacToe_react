import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle from '../Assets/circle.png';
import cross from '../Assets/cross.png';

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [data, setData] = useState(["","","","","","","","",""]);
    const titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
            e.target.innerHTML = `<img src='${cross}' alt='cross' />`;
        } else {
            newData[num] = "o";
            e.target.innerHTML = `<img src='${circle}' alt='circle' />`;
        }
        setData(newData);
        setCount(count + 1);
        checkwin(newData);
    };

    const checkwin = (newData) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }

        // Check for a draw
        if (newData.every(cell => cell !== "")) {
            draw();
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations &nbsp <img src=${cross} alt='cross' style='width: 50px; height: 50px;' />`;
        } else {
            titleRef.current.innerHTML = `Congratulations  &nbsp<img src=${circle} alt='circle' style='width: 50px; height: 50px;' />`;
        }
    };

    const draw = () => {
        setLock(true);
        titleRef.current.innerHTML = "It's a draw!";
    };

    const resetGame = () => {
        setData(["","","","","","","","",""]);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'TIC TAC TOE GAME IN <span>REACT</span>';
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = "");
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>TIC TAC TOE GAME IN <span>REACT</span></h1>
            <div className="board">
                <div className="row">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
}

export default TicTacToe;
