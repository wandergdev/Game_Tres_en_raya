// components/TicTacToe.tsx
import React, { useState, useEffect } from "react";
import { Button, Avatar } from "@nextui-org/react";

interface TicTacToeProps {
  player1Name: string;
  player2Name: string;
  player1Symbol: "X" | "O";
  player2Symbol: "X" | "O";
  player1Avatar: string;
  player2Avatar: string;
  isSolo: boolean;
  onGameEnd: (winner: string | null, moves: number) => void;
}

const initialBoard = Array(9).fill(null);

const TicTacToe: React.FC<TicTacToeProps> = ({
  player1Name,
  player2Name,
  player1Symbol,
  player2Symbol,
  player1Avatar,
  player2Avatar,
  isSolo,
  onGameEnd,
}) => {
  const [board, setBoard] = useState<(null | "X" | "O")[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(player1Symbol);
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (isSolo && currentPlayer === player2Symbol && !winner) {
      const bestMove = calculateBestMove(board, player2Symbol, player1Symbol);
      handleCellClick(bestMove);
    }
  }, [currentPlayer, isSolo, winner]);

  const handleCellClick = (index: number) => {
    if (board[index] !== null || winner) return;
    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoves(moves + 1);
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner === player1Symbol ? player1Name : player2Name);
      onGameEnd(gameWinner === player1Symbol ? player1Name : player2Name, moves + 1);
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner("Draw");
      onGameEnd(null, moves + 1);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (board: (null | "X" | "O")[]) => {
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
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const calculateBestMove = (board: (null | "X" | "O")[], cpuSymbol: "X" | "O", playerSymbol: "X" | "O") => {
    // Check if CPU can win
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = board.slice();
        newBoard[i] = cpuSymbol;
        if (calculateWinner(newBoard) === cpuSymbol) {
          return i;
        }
      }
    }

    // Check if need to block player from winning
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = board.slice();
        newBoard[i] = playerSymbol;
        if (calculateWinner(newBoard) === playerSymbol) {
          return i;
        }
      }
    }

    // Otherwise, make a random move
    const availableMoves = board
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null) as number[];
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const handleCleanBoard = () => {
    setBoard(initialBoard);
    setCurrentPlayer(player1Symbol);
    setMoves(0);
    setWinner(null);
  };

  return (
    <div className="container">
      <h2>{`Current Player: ${currentPlayer === player1Symbol ? player1Name : player2Name} (${currentPlayer})`}</h2>
      <div className="game-info">
        <div className="player-info">
          <Avatar src={player1Avatar} alt={player1Name} size="lg" className="player-avatar" />
          <span>{player1Name} ({player1Symbol})</span>
        </div>
        <div className="player-info">
          <Avatar src={player2Avatar} alt={player2Name} size="lg" className="player-avatar" />
          <span>{player2Name} ({player2Symbol})</span>
        </div>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <Button
            key={index}
            disabled={cell !== null || !!winner}
            onClick={() => handleCellClick(index)}
            style={{ width: "100px", height: "100px" }}
          >
            {cell}
          </Button>
        ))}
      </div>
      {winner && (
        <div>
          <h2>{winner === "Draw" ? "It's a Draw!" : `${winner} Won!`}</h2>
          <Button  color="primary" onClick={handleCleanBoard} className="clean-board-button">
            Clean Board
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
