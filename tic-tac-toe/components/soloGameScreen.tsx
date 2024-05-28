'use client';

import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import TicTacToe from '../components/tictactoe';

const SoloGameScreen: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const handleStartGame = () => {
    if (playerName.trim()) {
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
              <label htmlFor="player-name" className="text-lg font-medium mb-2 block">Player Name:</label>
              <Input
                id="player-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                fullWidth
                placeholder="Enter your name"
              />
            </div>
            <Button className="w-full bg-[#448504] hover:bg-[#336403]" onClick={handleStartGame}>
              Start Game
            </Button>
          </div>
        </div>
      ) : (
        <TicTacToe player1Name={playerName} />
      )}
    </div>
  );
};

export default SoloGameScreen;
