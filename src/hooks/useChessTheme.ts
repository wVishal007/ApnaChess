import { useState, useCallback } from "react";
import { ChessTheme, CHESS_THEMES, PieceTheme } from "@/types/theme";

export function useChessTheme() {
  const [currentTheme, setCurrentTheme] = useState<ChessTheme>(CHESS_THEMES[0]);
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const changeTheme = useCallback((themeId: string) => {
    const theme = CHESS_THEMES.find((t) => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  }, []);

  const toggleBoardFlip = useCallback(() => {
    setBoardFlipped((prev) => !prev);
  }, []);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled((prev) => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    currentTheme,
    boardFlipped,
    animationsEnabled,
    soundEnabled,
    changeTheme,
    toggleBoardFlip,
    toggleAnimations,
    toggleSound,
    availableThemes: CHESS_THEMES,
  };
}
