// components/SoloGameScreen.tsx
import React, { useState } from "react";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";

interface SoloGameScreenProps {
  onStartGame: (playerName: string, playerAvatar: string, playerSymbol: "X" | "O") => void;
}

const SoloGameScreen: React.FC<SoloGameScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerSymbol(event.target.value as "X" | "O");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tres en raya</h1>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="player-name">Player Name:</label>
        <Input
          id="player-name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          fullWidth
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="player-avatar">Player Avatar URL:</label>
        <Input
          id="player-avatar"
          value={playerAvatar}
          onChange={(e) => setPlayerAvatar(e.target.value)}
          fullWidth
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <p>Select your symbol:</p>
        <RadioGroup value={playerSymbol} onChange={handleSymbolChange}>
          <Radio value="X">X</Radio>
          <Radio value="O">O</Radio>
        </RadioGroup>
      </div>
      <Button
        color="primary"
        onClick={() => onStartGame(playerName, playerAvatar, playerSymbol)}
      >
        Start Game
      </Button>
    </div>
  );
};

export default SoloGameScreen;
