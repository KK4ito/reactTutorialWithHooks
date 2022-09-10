import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}
function Board(props) {
    return (
        <div>
            <div className="board-row">
            {renderSquare(props, 0)}
            {renderSquare(props, 1)}
            {renderSquare(props, 2)}
            </div>
            <div className="board-row">
            {renderSquare(props, 3)}
            {renderSquare(props, 4)}
            {renderSquare(props, 5)}
            </div>
            <div className="board-row">
            {renderSquare(props, 6)}
            {renderSquare(props, 7)}
            {renderSquare(props, 8)}
            </div>
        </div>
    );

    function renderSquare(props, i) {
        return <Square value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />;
    }
}

function Game(props) {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const current = history[stepNumber];

    const moves = history.map( (step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}><button onClick={() => jumpTo(move)}>{desc}</button></li>
        );
    });
    return (
    <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            />
        </div>
        <div className="game-info">
        <div>{setCurrentBoardStatus(current)}</div>
        <ol>{moves}</ol>
        </div>
    </div>
    );

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }
    
    function handleClick(i) {
        const historyCopy = history.slice(0, stepNumber + 1);
        const current = historyCopy[historyCopy.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {return;}
        squares[i] = getCurrentPlayerMarker();
        setHistory(historyCopy.concat([{
            squares: squares,
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(historyCopy.length);
    }
    
      
    
    function getCurrentPlayerMarker() {
        if (xIsNext) {
            return 'X';
        }
        return 'O';
    }
    
    function setCurrentBoardStatus(current) {
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + getCurrentPlayerMarker();
        }
        return status;
    }
    
  }


  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }