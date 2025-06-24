import {
  GameState,
  Position,
  ChessPiece,
  PieceColor,
  Move,
} from "@/types/chess";
import {
  getPossibleMoves,
  makeMove,
  isInCheck,
  positionsEqual,
} from "@/lib/chess";

export type AILevel = "easy" | "medium" | "hard";

interface EvaluatedMove {
  move: { from: Position; to: Position };
  score: number;
}

// Piece values for evaluation
const PIECE_VALUES = {
  pawn: 100,
  knight: 300,
  bishop: 300,
  rook: 500,
  queen: 900,
  king: 10000,
};

// Position values for different pieces
const PAWN_TABLE = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const KNIGHT_TABLE = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50],
];

const BISHOP_TABLE = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20],
];

function getPositionValue(piece: ChessPiece, position: Position): number {
  const row = piece.color === "white" ? 7 - position.row : position.row;
  const col = position.col;

  switch (piece.type) {
    case "pawn":
      return PAWN_TABLE[row][col];
    case "knight":
      return KNIGHT_TABLE[row][col];
    case "bishop":
      return BISHOP_TABLE[row][col];
    case "rook":
      return piece.color === "white" ? (row < 2 ? -5 : 0) : row > 5 ? -5 : 0;
    case "queen":
      return 0; // Queens are flexible
    case "king":
      return row < 2 ? 20 : -30; // Encourage castling early, king safety later
    default:
      return 0;
  }
}

function evaluateBoard(gameState: GameState, aiColor: PieceColor): number {
  let score = 0;

  // Evaluate all pieces on the board
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = gameState.board[row][col];
      if (piece) {
        const pieceValue =
          PIECE_VALUES[piece.type] + getPositionValue(piece, { row, col });
        if (piece.color === aiColor) {
          score += pieceValue;
        } else {
          score -= pieceValue;
        }
      }
    }
  }

  // Bonus for checkmate
  if (gameState.gameStatus === "checkmate") {
    if (gameState.currentPlayer !== aiColor) {
      score += 100000; // AI won
    } else {
      score -= 100000; // AI lost
    }
  }

  // Penalty for being in check
  if (gameState.inCheck) {
    if (gameState.currentPlayer === aiColor) {
      score -= 50;
    } else {
      score += 50;
    }
  }

  return score;
}

function getAllPossibleMoves(
  gameState: GameState,
  color: PieceColor,
): { from: Position; to: Position }[] {
  const moves: { from: Position; to: Position }[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = gameState.board[row][col];
      if (piece && piece.color === color) {
        const position = { row, col };
        const possibleMoves = getPossibleMoves(
          gameState.board,
          position,
          piece,
          gameState,
        );

        possibleMoves.forEach((to) => {
          moves.push({ from: position, to });
        });
      }
    }
  }

  return moves;
}

function minimax(
  gameState: GameState,
  depth: number,
  maximizing: boolean,
  aiColor: PieceColor,
  alpha: number = -Infinity,
  beta: number = Infinity,
): number {
  if (depth === 0 || gameState.gameStatus !== "active") {
    return evaluateBoard(gameState, aiColor);
  }

  const currentColor = gameState.currentPlayer;
  const moves = getAllPossibleMoves(gameState, currentColor);

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      const newGameState = makeMove(gameState, move.from, move.to);
      const evaluation = minimax(
        newGameState,
        depth - 1,
        false,
        aiColor,
        alpha,
        beta,
      );
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      const newGameState = makeMove(gameState, move.from, move.to);
      const evaluation = minimax(
        newGameState,
        depth - 1,
        true,
        aiColor,
        alpha,
        beta,
      );
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return minEval;
  }
}

function getRandomMove(
  gameState: GameState,
  color: PieceColor,
): { from: Position; to: Position } | null {
  const moves = getAllPossibleMoves(gameState, color);
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

function getBestMove(
  gameState: GameState,
  aiColor: PieceColor,
  depth: number,
): { from: Position; to: Position } | null {
  const moves = getAllPossibleMoves(gameState, aiColor);
  if (moves.length === 0) return null;

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const newGameState = makeMove(gameState, move.from, move.to);
    const score = minimax(
      newGameState,
      depth - 1,
      false,
      aiColor,
      -Infinity,
      Infinity,
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

export function getAIMove(
  gameState: GameState,
  aiColor: PieceColor,
  level: AILevel = "medium",
): { from: Position; to: Position } | null {
  console.log("getAIMove called:", {
    aiColor,
    currentPlayer: gameState.currentPlayer,
    level,
  });

  // Don't move if it's not AI's turn
  if (gameState.currentPlayer !== aiColor) {
    console.log("Not AI's turn, returning null");
    return null;
  }

  const allMoves = getAllPossibleMoves(gameState, aiColor);
  console.log("Available moves:", allMoves.length);

  if (allMoves.length === 0) {
    console.log("No moves available");
    return null;
  }

  let selectedMove: { from: Position; to: Position } | null = null;

  switch (level) {
    case "easy":
      // 70% random moves, 30% good moves
      if (Math.random() < 0.7) {
        selectedMove = getRandomMove(gameState, aiColor);
      } else {
        selectedMove = getBestMove(gameState, aiColor, 2);
      }
      break;

    case "medium":
      // Use depth 3 search with some randomness
      if (Math.random() < 0.1) {
        selectedMove = getRandomMove(gameState, aiColor);
      } else {
        selectedMove = getBestMove(gameState, aiColor, 3);
      }
      break;

    case "hard":
      // Use depth 4-5 search, very strong play
      const depth = Math.random() < 0.5 ? 4 : 5;
      selectedMove = getBestMove(gameState, aiColor, depth);
      break;

    default:
      selectedMove = getBestMove(gameState, aiColor, 3);
  }

  console.log("Selected move:", selectedMove);
  return selectedMove;
}

// Utility to check if a move is legal
export function isLegalMove(
  gameState: GameState,
  from: Position,
  to: Position,
): boolean {
  const piece = gameState.board[from.row][from.col];
  if (!piece || piece.color !== gameState.currentPlayer) return false;

  const possibleMoves = getPossibleMoves(
    gameState.board,
    from,
    piece,
    gameState,
  );
  return possibleMoves.some((move) => positionsEqual(move, to));
}
