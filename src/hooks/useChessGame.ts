import { useState, useCallback } from "react";
import { GameState, Position, ChessPiece } from "@/types/chess";
import {
  createInitialGameState,
  getPossibleMoves,
  makeMove,
  positionsEqual,
} from "@/lib/chess";

export function useChessGame() {
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState(),
  );

  const selectSquare = useCallback((position: Position) => {
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
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
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
    selectSquare,
    resetGame,
    isSquareSelected,
    isSquarePossibleMove,
    isSquareLastMove,
  };
}
