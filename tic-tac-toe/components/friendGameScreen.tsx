'use client';

import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import TicTacToe from '../components/tictactoe';

const FriendGameScreen: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      setHasStarted(true);
    }
  };

  return (
    <div className="screen-container flex flex-col items-center justify-center bg-gray-100 p-4">
      {!hasStarted ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Tres en raya</h1>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div style={{ margin: '20px 0' }}>
              <label htmlFor="player1-name" className="text-lg font-medium mb-2 block">Player 1 Name:</label>
              <Input
                id="player1-name"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                fullWidth
                placeholder="Enter Player 1 name"
              />
            </div>
            <div style={{ margin: '20px 0' }}>
              <label htmlFor="player2-name" className="text-lg font-medium mb-2 block">Player 2 Name:</label>
              <Input
                id="player2-name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                fullWidth
                placeholder="Enter Player 2 name"
              />
            </div>
            <Button className="w-full bg-[#448504] hover:bg-[#336403]" onClick={handleStartGame} >
              Start Game
            </Button>
          </div>
        </div>
      ) : (
        <TicTacToe player1Name={player1Name} player2Name={player2Name} />
      )}
    </div>
  );
};

export default FriendGameScreen;
