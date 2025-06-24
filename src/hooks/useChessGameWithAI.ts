import { useState, useCallback, useEffect, useRef } from "react";
import { GameState, Position } from "@/types/chess";
import { GameMode } from "@/types/gameMode";
import { AILevel, getAIMove } from "@/lib/chessAI";
import {
  createInitialGameState,
  getPossibleMoves,
  makeMove,
  positionsEqual,
} from "@/lib/chess";

export function useChessGameWithAI() {
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState(),
  );
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const [aiLevel, setAILevel] = useState<AILevel>("medium");
  const [isAIThinking, setIsAIThinking] = useState(false);
  const aiMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPlayerTurn = useCallback(() => {
    if (gameMode === "pvp") return true;
    if (gameMode === "pvc") return gameState.currentPlayer === "white";
    return false; // cvc mode - no player turns
  }, [gameMode, gameState.currentPlayer]);

  // Handle AI moves automatically
  useEffect(() => {
    // Check if AI should move
    const isActiveGame =
      gameState.gameStatus === "active" || gameState.gameStatus === "check";
    const isAITurn =
      (gameMode === "pvc" && gameState.currentPlayer === "black") ||
      gameMode === "cvc";

    console.log("AI Check:", {
      isActiveGame,
      isAITurn,
      isAIThinking,
      gameMode,
      currentPlayer: gameState.currentPlayer,
    });

    if (isActiveGame && isAITurn && !isAIThinking) {
      console.log("AI should move, setting thinking to true");
      setIsAIThinking(true);

      const thinkingTime = gameMode === "cvc" ? 800 : 1200;

      aiMoveTimeoutRef.current = setTimeout(() => {
        console.log("AI timeout triggered, making move");
        const aiColor = gameMode === "pvc" ? "black" : gameState.currentPlayer;

        setGameState((currentState) => {
          const bestMove = getAIMove(currentState, aiColor, aiLevel);
          console.log("AI move result:", bestMove);

          if (bestMove) {
            return makeMove(currentState, bestMove.from, bestMove.to);
          }
          return currentState;
        });

        setIsAIThinking(false);
      }, thinkingTime);
    }

    return () => {
      if (aiMoveTimeoutRef.current) {
        clearTimeout(aiMoveTimeoutRef.current);
        aiMoveTimeoutRef.current = null;
      }
    };
  }, [gameState.currentPlayer, gameState.gameStatus, gameMode, aiLevel]); // Removed isAIThinking from dependencies

  const selectSquare = useCallback(
    (position: Position) => {
      // Don't allow moves if it's not player's turn
      if (!isPlayerTurn() || isAIThinking) return;

      setGameState((currentState) => {
        const piece = currentState.board[position.row][position.col];

        // If there's already a selected square
        if (currentState.selectedSquare) {
          // If clicking the same square, deselect
          if (positionsEqual(currentState.selectedSquare, position)) {
            return {
              ...currentState,
              selectedSquare: null,
              possibleMoves: [],
            };
          }

          // If clicking on a possible move, make the move
          const isPossibleMove = currentState.possibleMoves.some((move) =>
            positionsEqual(move, position),
          );

          if (isPossibleMove) {
            const newGameState = makeMove(
              currentState,
              currentState.selectedSquare,
              position,
            );
            return newGameState;
          }

          // If clicking on another piece of the same color, select it
          if (piece && piece.color === currentState.currentPlayer) {
            const possibleMoves = getPossibleMoves(
              currentState.board,
              position,
              piece,
              currentState,
            );

            return {
              ...currentState,
              selectedSquare: position,
              possibleMoves,
            };
          }

          // Otherwise, deselect
          return {
            ...currentState,
            selectedSquare: null,
            possibleMoves: [],
          };
        }

        // No square selected, select if it's the current player's piece
        if (piece && piece.color === currentState.currentPlayer) {
          const possibleMoves = getPossibleMoves(
            currentState.board,
            position,
            piece,
            currentState,
          );

          return {
            ...currentState,
            selectedSquare: position,
            possibleMoves,
          };
        }

        return currentState;
      });
    },
    [isPlayerTurn, isAIThinking],
  );

  const resetGame = useCallback(() => {
    // Clear any pending AI moves
    if (aiMoveTimeoutRef.current) {
      clearTimeout(aiMoveTimeoutRef.current);
    }
    setIsAIThinking(false);
    setGameState(createInitialGameState());
  }, []);

  const changeGameMode = useCallback(
    (mode: GameMode) => {
      setGameMode(mode);
      resetGame();
    },
    [resetGame],
  );

  const changeAILevel = useCallback((level: AILevel) => {
    setAILevel(level);
  }, []);

  const isSquareSelected = useCallback(
    (position: Position): boolean => {
      return (
        gameState.selectedSquare !== null &&
        positionsEqual(gameState.selectedSquare, position)
      );
    },
    [gameState.selectedSquare],
  );

  const isSquarePossibleMove = useCallback(
    (position: Position): boolean => {
      return gameState.possibleMoves.some((move) =>
        positionsEqual(move, position),
      );
    },
    [gameState.possibleMoves],
  );

  const isSquareLastMove = useCallback(
    (position: Position): boolean => {
      if (!gameState.lastMove) return false;
      return (
        positionsEqual(gameState.lastMove.from, position) ||
        positionsEqual(gameState.lastMove.to, position)
      );
    },
    [gameState.lastMove],
  );

  return {
    gameState,
    gameMode,
    aiLevel,
    isAIThinking,
    isPlayerTurn: isPlayerTurn(),
    selectSquare,
    resetGame,
    changeGameMode,
    changeAILevel,
    isSquareSelected,
    isSquarePossibleMove,
    isSquareLastMove,
  };
}
