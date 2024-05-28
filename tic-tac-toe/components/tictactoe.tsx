'use client';

import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@nextui-org/react';

interface TicTacToeProps {
  player1Name: string;
  player2Name?: string;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ player1Name, player2Name }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!isXNext && !player2Name) {
      const cpuMove = getCpuMove(board);
      if (cpuMove !== null) {
        handleClick(cpuMove);
      }
    }
  }, [isXNext, board, player2Name]);

  const handleClick = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board: Array<string | null>) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const getCpuMove = (board: Array<string | null>): number | null => {
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

    // Check if CPU can win in the next move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] === 'O' && board[a] === board[b] && !board[c]) {
        return c;
      }
      if (board[a] === 'O' && board[a] === board[c] && !board[b]) {
        return b;
      }
      if (board[b] === 'O' && board[b] === board[c] && !board[a]) {
        return a;
      }
    }

    // Block player's winning move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] === 'X' && board[a] === board[b] && !board[c]) {
        return c;
      }
      if (board[a] === 'X' && board[a] === board[c] && !board[b]) {
        return b;
      }
      if (board[b] === 'X' && board[b] === board[c] && !board[a]) {
        return a;
      }
    }

    // Choose a random available move
    const availableMoves = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
    return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
  };

  let status;
  if (winner) {
    status = `Player ${winner === 'X' ? '1' : '2'} Wins!`;
  } else {
    status = `Player ${isXNext ? '1' : '2'}'s Turn`;
  }

  const renderSquare = (index: number) => {
    return (
      <button className={`square ${board[index]}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="screen-container flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Tres en raya</h1>
      <div className="flex justify-between w-full max-w-md mb-4">
        <div className="text-center">
          <Avatar
            src="https://img.icons8.com/color/48/000000/user-male-circle.png"
            size="lg"
          />
          <p>{player1Name}</p>
        </div>
        {player2Name ? (
          <div className="text-center">
            <Avatar
              src="https://img.icons8.com/color/48/000000/user-female-circle.png"
              size="lg"
            />
            <p>{player2Name}</p>
          </div>
        ) : (
          <div className="text-center">
            <Avatar
              src="https://img.icons8.com/fluency/48/000000/robot.png"
              size="lg"
            />
            <p>CPU</p>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <div className="status text-center text-xl font-medium mb-4">{status}</div>
        <div className="board grid grid-cols-3 gap-4">
          {Array(9).fill(null).map((_, i) => renderSquare(i))}
        </div>
        {winner ? (
          <Button className="w-full mt-4 bg-[#448504] hover:bg-[#336403]" onClick={() => window.location.reload()} >
            Back to Main
          </Button>
        ) : (
          <Button className="w-full mt-4 bg-[#448504] hover:bg-[#336403]" onClick={() => window.location.reload()} >
            Quit game
          </Button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
