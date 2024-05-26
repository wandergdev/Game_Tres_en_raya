// components/FriendGameScreen.tsx
import React, { useState } from "react";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";

interface FriendGameScreenProps {
  onStartGame: (
    player1Name: string,
    player1Avatar: string,
    player1Symbol: "X" | "O",
    player2Name: string,
    player2Avatar: string,
    player2Symbol: "X" | "O"
  ) => void;
}

const FriendGameScreen: React.FC<FriendGameScreenProps> = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player1Avatar, setPlayer1Avatar] = useState("");
  const [player1Symbol, setPlayer1Symbol] = useState<"X" | "O">("X");

  const [player2Name, setPlayer2Name] = useState("");
  const [player2Avatar, setPlayer2Avatar] = useState("");
  const [player2Symbol, setPlayer2Symbol] = useState<"X" | "O">("O");

  const handlePlayer1SymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const symbol = event.target.value as "X" | "O";
    setPlayer1Symbol(symbol);
    setPlayer2Symbol(symbol === "X" ? "O" : "X"); // Automatically set player2Symbol to the opposite
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tres en raya</h1>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="player1-name">Player 1 Name:</label>
        <Input
          id="player1-name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          fullWidth
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="player1-avatar">Player 1 Avatar URL:</label>
        <Input
          id="player1-avatar"
          value={player1Avatar}
          onChange={(e) => setPlayer1Avatar(e.target.value)}
          fullWidth
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <p>Select Player 1 symbol:</p>
        <RadioGroup value={player1Symbol} onChange={handlePlayer1SymbolChange}>
          <Radio value="X">X</Radio>
          <Radio value="O">O</Radio>
        </RadioGroup>
      </div>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="player2-name">Player 2 Name:</label>
        <Input
          id="player2-name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          fullWidth
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor="player2-avatar">Player 2 Avatar URL:</label>
        <Input
          id="player2-avatar"
          value={player2Avatar}
          onChange={(e) => setPlayer2Avatar(e.target.value)}
          fullWidth
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <p>Player 2 symbol: {player2Symbol}</p>
      </div>
      <Button
        color="primary"
        onClick={() => onStartGame(
          player1Name, player1Avatar, player1Symbol, 
          player2Name, player2Avatar, player2Symbol
        )}
      >
        Start Game
      </Button>
    </div>
  );
};

export default FriendGameScreen;
