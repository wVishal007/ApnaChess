export type GameMode = "pvp" | "pvc" | "cvc";

export interface GameModeConfig {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
}

export const GAME_MODES: GameModeConfig[] = [
  {
    id: "pvp",
    name: "Player vs Player",
    description: "Two human players take turns",
    icon: "👥",
  },
  {
    id: "pvc",
    name: "Player vs Computer",
    description: "Play against AI opponent",
    icon: "🤖",
  },
  {
    id: "cvc",
    name: "Computer vs Computer",
    description: "Watch AI play against itself",
    icon: "⚔️",
  },
];
