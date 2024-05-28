'use client';

import React, { useState } from 'react';
import { Button, Avatar } from '@nextui-org/react';
import SoloGameScreen from '../components/soloGameScreen';
import FriendGameScreen from '../components/friendGameScreen';
import { useGameContext } from '../context/GameContext';

const MainScreen: React.FC = () => {
  const { topScores } = useGameContext();
  const [showSoloGame, setShowSoloGame] = useState(false);
  const [showFriendGame, setShowFriendGame] = useState(false);

  const handleStartSoloGame = () => {
    setShowSoloGame(true);
    setShowFriendGame(false);
  };

  const handleStartFriendGame = () => {
    setShowFriendGame(true);
    setShowSoloGame(false);
  };

  const getTopPlayer = () => {
    return topScores.reduce((topPlayer, player) => (player.score > topPlayer.score ? player : topPlayer), topScores[0]);
  };

  const topPlayer = getTopPlayer();

  return (
    <div className="screen-container flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Tres en raya</h1>
        {!showSoloGame && !showFriendGame && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Top Scores</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">NAME</th>
                  <th className="py-2">SCORE</th>
                </tr>
              </thead>
              <tbody>
                {topScores.map((player, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 flex items-center">
                      {player.name === topPlayer.name && (
                        <img
                          src="https://img.icons8.com/emoji/48/000000/crown-emoji.png"
                          alt="crown"
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      <Avatar src={player.avatar} className="mr-4" />
                      <span className="font-medium">{player.name}</span>
                    </td>
                    <td className="py-2">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="w-full mb-4 bg-[#448504] hover:bg-[#336403]" onClick={handleStartSoloGame} >
              Play Solo
            </Button>
            <Button className="w-full bg-[#448504] hover:bg-[#336403]" onClick={handleStartFriendGame} >
              Play a Friend
            </Button>
          </div>
        )}
        {showSoloGame && <SoloGameScreen />}
        {showFriendGame && <FriendGameScreen />}
      </div>
    </div>
  );
};

export default MainScreen;
