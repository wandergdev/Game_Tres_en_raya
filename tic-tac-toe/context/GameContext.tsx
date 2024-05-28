'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Player {
  name: string;
  avatar: string;
  score: number;
}

interface GameContextProps {
  topScores: Player[];
  updateScore: (playerName: string, score: number) => void;
}

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [topScores, setTopScores] = useState<Player[]>([
    { name: "Edwin Cruz", avatar: "https://via.placeholder.com/50", score: 234244 },
    { name: "Jose Burgos", avatar: "https://via.placeholder.com/50", score: 100000 },
    { name: "Angles Angels", avatar: "https://via.placeholder.com/50", score: 99999 },
    { name: "Justin Fermin", avatar: "https://via.placeholder.com/50", score: 88888 },
    { name: "Player 1", avatar: "https://via.placeholder.com/50", score: 6666 }
  ]);

  const updateScore = (playerName: string, score: number) => {
    setTopScores(prevScores => {
      const playerIndex = prevScores.findIndex(player => player.name === playerName);
      if (playerIndex !== -1) {
        const updatedPlayer = { ...prevScores[playerIndex], score: prevScores[playerIndex].score + score };
        const updatedScores = [...prevScores];
        updatedScores[playerIndex] = updatedPlayer;
        return updatedScores;
      } else {
        return [...prevScores, { name: playerName, avatar: "https://via.placeholder.com/50", score }];
      }
    });
  };

  return (
    <GameContext.Provider value={{ topScores, updateScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
