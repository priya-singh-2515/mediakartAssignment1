import React, { useState } from "react";
import "./App.css";
import img from "./excited.gif";
import ting from "./ting.mp3";
import gameoverSound from "./gameover.mp3";

const Box = ({ value, onClick }) => {
  return (
    <div className="box" onClick={onClick}>
      <span className="boxtext">{value}</span>
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const audioTurn = new Audio(ting);
  const gameover = new Audio(gameoverSound);

  const handleBoxClick = (index) => {
    if (board[index] !== "" || isGameOver) return;
    const newBoard = board.slice();
    newBoard[index] = turn;
    setBoard(newBoard);
    audioTurn.play();
    checkWin(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  const checkWin = (newBoard) => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    wins.forEach((line) => {
      const [a, b, c] = line;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setIsGameOver(true);
        gameover.play();
        // toast.success(`${newBoard[a]} Won!`);
        // resetGame();
      }
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setIsGameOver(false);
    setWinner(null);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <nav>
        <ul>
          <li>Priya singh Tic Tac Toe</li>
        </ul>
      </nav>
      <div className="gameContainer">
        <div className="container">
          {board.map((value, index) => (
            <Box
              key={index}
              value={value}
              onClick={() => handleBoxClick(index)}
            />
          ))}
        </div>
        <div className="gameInfo">
          <h1>Welcome to Tic Tac MyTicTacToe</h1>
          <div>
            <span className="info">
              {isGameOver ? `${winner} Won` : `Turn for ${turn}`}
            </span>
            <button onClick={resetGame} id="reset">
              Reset
            </button>
          </div>
          <div className="imgbox">
            {isGameOver && (
              <img
                src={img}
                style={{ height: "300px", width: "300px" }}
                alt="Game Over"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
