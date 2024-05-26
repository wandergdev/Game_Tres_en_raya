// components/MainScreen.tsx
import React, { useState } from "react";
import {
  Button,
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import SoloGameScreen from "@/components/soloGameScreen";
import FriendGameScreen from "@/components/friendGameScreen";
import TicTacToe from "@/components/tictactoe";

interface Score {
  name: string;
  score: number;
  avatar: string;
}

const initialScores: Score[] = [
  { name: "Alice", score: 10, avatar: "https://i.pravatar.cc/150?u=alice" },
  { name: "Bob", score: 8, avatar: "https://i.pravatar.cc/150?u=bob" },
  { name: "Charlie", score: 6, avatar: "https://i.pravatar.cc/150?u=charlie" },
];

const MainScreen: React.FC = () => {
  const [view, setView] = useState<"main" | "solo" | "friend" | "game">("main");
  const [scores, setScores] = useState<Score[]>(initialScores);
  const [gameProps, setGameProps] = useState<any>(null);

  const handleStartSoloGame = (
    playerName: string,
    playerAvatar: string,
    playerSymbol: "X" | "O",
  ) => {
    if (!scores.some((score) => score.name === playerName)) {
      setScores([
        ...scores,
        { name: playerName, score: 0, avatar: playerAvatar },
      ]);
    }
    setGameProps({
      player1Name: playerName,
      player2Name: "CPU",
      player1Symbol: playerSymbol,
      player2Symbol: playerSymbol === "X" ? "O" : "X",
      player1Avatar: playerAvatar,
      player2Avatar: "https://i.pravatar.cc/150?u=cpu", // Avatar para CPU
      isSolo: true,
    });
    setView("game");
  };

  const handleStartFriendGame = (
    player1Name: string,
    player1Avatar: string,
    player1Symbol: "X" | "O",
    player2Name: string,
    player2Avatar: string,
    player2Symbol: "X" | "O",
  ) => {
    if (!scores.some((score) => score.name === player1Name)) {
      setScores([
        ...scores,
        { name: player1Name, score: 0, avatar: player1Avatar },
      ]);
    }
    if (!scores.some((score) => score.name === player2Name)) {
      setScores([
        ...scores,
        { name: player2Name, score: 0, avatar: player2Avatar },
      ]);
    }
    setGameProps({
      player1Name: player1Name,
      player2Name: player2Name,
      player1Symbol: player1Symbol,
      player2Symbol: player2Symbol,
      player1Avatar: player1Avatar,
      player2Avatar: player2Avatar,
      isSolo: false,
    });
    setView("game");
  };

  const handleGameEnd = (winner: string | null, moves: number) => {
    let score = 0;
    if (moves <= 4) {
      score = 20;
    } else {
      score = 13;
    }
    if (winner) {
      setScores((prevScores) =>
        prevScores.map((s) =>
          s.name === winner ? { ...s, score: s.score + score } : s,
        ),
      );
    }
  };

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="container">
      {view === "main" ? (
        <>
          <div className="header">
            <h1>Tres en raya</h1>
            <h3>Top Scores</h3>
          </div>
          <div className="table-container">
            <Table aria-label="Top Scores Table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Score</TableColumn>
              </TableHeader>
              <TableBody>
                {sortedScores.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={score.avatar} alt={score.name} size="sm" />
                        <span style={{ marginLeft: "10px" }}>{score.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{score.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="buttons-container">
            <Button color="primary" onClick={() => setView("solo")}>
              Play Solo
            </Button>
            <Button color="secondary" onClick={() => setView("friend")}>
              Play a Friend
            </Button>
          </div>
        </>
      ) : view === "solo" ? (
        <SoloGameScreen onStartGame={handleStartSoloGame} />
      ) : view === "friend" ? (
        <FriendGameScreen onStartGame={handleStartFriendGame} />
      ) : (
        <div>
          <TicTacToe
            player1Name={gameProps.player1Name}
            player2Name={gameProps.player2Name}
            player1Symbol={gameProps.player1Symbol}
            player2Symbol={gameProps.player2Symbol}
            player1Avatar={gameProps.player1Avatar}
            player2Avatar={gameProps.player2Avatar}
            isSolo={gameProps.isSolo}
            onGameEnd={handleGameEnd}
          />
          <Button
            color="secondary"
            onClick={() => setView("main")}
            style={{ marginTop: "20px" }}
          >
            Return to Main Screen
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
