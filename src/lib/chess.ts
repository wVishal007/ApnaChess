import {
  ChessPiece,
  Position,
  Move,
  GameState,
  PieceColor,
  PieceType,
} from "@/types/chess";

export function createInitialBoard(): (ChessPiece | null)[][] {
  const board: (ChessPiece | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: "pawn", color: "black", id: `black-pawn-${col}` };
    board[6][col] = { type: "pawn", color: "white", id: `white-pawn-${col}` };
  }

  // Place other pieces
  const backRowPieces: PieceType[] = [
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",
  ];

  for (let col = 0; col < 8; col++) {
    board[0][col] = {
      type: backRowPieces[col],
      color: "black",
      id: `black-${backRowPieces[col]}-${col}`,
    };
    board[7][col] = {
      type: backRowPieces[col],
      color: "white",
      id: `white-${backRowPieces[col]}-${col}`,
    };
  }

  return board;
}

export function createInitialGameState(): GameState {
  return {
    board: createInitialBoard(),
    currentPlayer: "white",
    gameStatus: "active",
    moveHistory: [],
    selectedSquare: null,
    possibleMoves: [],
    lastMove: null,
    inCheck: false,
    canCastleKingside: { white: true, black: true },
    canCastleQueenside: { white: true, black: true },
    enPassantTarget: null,
  };
}

export function isValidPosition(pos: Position): boolean {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
}

export function positionsEqual(pos1: Position, pos2: Position): boolean {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}

export function getPossibleMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
  gameState: GameState,
): Position[] {
  const moves: Position[] = [];

  switch (piece.type) {
    case "pawn":
      moves.push(...getPawnMoves(board, position, piece, gameState));
      break;
    case "rook":
      moves.push(...getRookMoves(board, position, piece));
      break;
    case "knight":
      moves.push(...getKnightMoves(board, position, piece));
      break;
    case "bishop":
      moves.push(...getBishopMoves(board, position, piece));
      break;
    case "queen":
      moves.push(...getQueenMoves(board, position, piece));
      break;
    case "king":
      moves.push(...getKingMoves(board, position, piece, gameState));
      break;
  }

  // Filter out moves that would put own king in check
  return moves.filter(
    (move) =>
      !wouldMoveResultInCheck(board, position, move, piece.color, gameState),
  );
}

function getPawnMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
  gameState: GameState,
): Position[] {
  const moves: Position[] = [];
  const direction = piece.color === "white" ? -1 : 1;
  const startRow = piece.color === "white" ? 6 : 1;

  // Forward move
  const oneForward = { row: position.row + direction, col: position.col };
  if (isValidPosition(oneForward) && !board[oneForward.row][oneForward.col]) {
    moves.push(oneForward);

    // Two squares forward from starting position
    if (position.row === startRow) {
      const twoForward = {
        row: position.row + direction * 2,
        col: position.col,
      };
      if (
        isValidPosition(twoForward) &&
        !board[twoForward.row][twoForward.col]
      ) {
        moves.push(twoForward);
      }
    }
  }

  // Diagonal captures
  const captureLeft = { row: position.row + direction, col: position.col - 1 };
  const captureRight = { row: position.row + direction, col: position.col + 1 };

  [captureLeft, captureRight].forEach((capturePos) => {
    if (isValidPosition(capturePos)) {
      const targetPiece = board[capturePos.row][capturePos.col];
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push(capturePos);
      }
      // En passant
      if (
        gameState.enPassantTarget &&
        positionsEqual(capturePos, gameState.enPassantTarget)
      ) {
        moves.push(capturePos);
      }
    }
  });

  return moves;
}

function getRookMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  const moves: Position[] = [];
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  directions.forEach(([rowDir, colDir]) => {
    for (let i = 1; i < 8; i++) {
      const newPos = {
        row: position.row + rowDir * i,
        col: position.col + colDir * i,
      };
      if (!isValidPosition(newPos)) break;

      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece) {
        moves.push(newPos);
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push(newPos);
        }
        break;
      }
    }
  });

  return moves;
}

function getKnightMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  const moves: Position[] = [];
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  knightMoves.forEach(([rowOffset, colOffset]) => {
    const newPos = {
      row: position.row + rowOffset,
      col: position.col + colOffset,
    };
    if (isValidPosition(newPos)) {
      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push(newPos);
      }
    }
  });

  return moves;
}

function getBishopMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  const moves: Position[] = [];
  const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  directions.forEach(([rowDir, colDir]) => {
    for (let i = 1; i < 8; i++) {
      const newPos = {
        row: position.row + rowDir * i,
        col: position.col + colDir * i,
      };
      if (!isValidPosition(newPos)) break;

      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece) {
        moves.push(newPos);
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push(newPos);
        }
        break;
      }
    }
  });

  return moves;
}

function getQueenMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  return [
    ...getRookMoves(board, position, piece),
    ...getBishopMoves(board, position, piece),
  ];
}

function getKingMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
  gameState: GameState,
): Position[] {
  const moves: Position[] = [];
  const kingMoves = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  kingMoves.forEach(([rowOffset, colOffset]) => {
    const newPos = {
      row: position.row + rowOffset,
      col: position.col + colOffset,
    };
    if (isValidPosition(newPos)) {
      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push(newPos);
      }
    }
  });

  // Castling
  if (!gameState.inCheck) {
    // Kingside castling
    if (gameState.canCastleKingside[piece.color]) {
      if (
        !board[position.row][position.col + 1] &&
        !board[position.row][position.col + 2] &&
        !isSquareUnderAttack(
          board,
          { row: position.row, col: position.col + 1 },
          piece.color,
        ) &&
        !isSquareUnderAttack(
          board,
          { row: position.row, col: position.col + 2 },
          piece.color,
        )
      ) {
        moves.push({ row: position.row, col: position.col + 2 });
      }
    }

    // Queenside castling
    if (gameState.canCastleQueenside[piece.color]) {
      if (
        !board[position.row][position.col - 1] &&
        !board[position.row][position.col - 2] &&
        !board[position.row][position.col - 3] &&
        !isSquareUnderAttack(
          board,
          { row: position.row, col: position.col - 1 },
          piece.color,
        ) &&
        !isSquareUnderAttack(
          board,
          { row: position.row, col: position.col - 2 },
          piece.color,
        )
      ) {
        moves.push({ row: position.row, col: position.col - 2 });
      }
    }
  }

  return moves;
}

function isSquareUnderAttack(
  board: (ChessPiece | null)[][],
  position: Position,
  defendingColor: PieceColor,
): boolean {
  const attackingColor = defendingColor === "white" ? "black" : "white";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === attackingColor) {
        const moves = getPossibleMovesWithoutCheckValidation(
          board,
          { row, col },
          piece,
        );
        if (moves.some((move) => positionsEqual(move, position))) {
          return true;
        }
      }
    }
  }
  return false;
}

function getPossibleMovesWithoutCheckValidation(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  switch (piece.type) {
    case "pawn":
      return getPawnMovesWithoutEnPassant(board, position, piece);
    case "rook":
      return getRookMoves(board, position, piece);
    case "knight":
      return getKnightMoves(board, position, piece);
    case "bishop":
      return getBishopMoves(board, position, piece);
    case "queen":
      return getQueenMoves(board, position, piece);
    case "king":
      return getKingMovesWithoutCastling(board, position, piece);
    default:
      return [];
  }
}

function getPawnMovesWithoutEnPassant(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  const moves: Position[] = [];
  const direction = piece.color === "white" ? -1 : 1;

  // Diagonal captures only
  const captureLeft = { row: position.row + direction, col: position.col - 1 };
  const captureRight = { row: position.row + direction, col: position.col + 1 };

  [captureLeft, captureRight].forEach((capturePos) => {
    if (isValidPosition(capturePos)) {
      const targetPiece = board[capturePos.row][capturePos.col];
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push(capturePos);
      }
    }
  });

  return moves;
}

function getKingMovesWithoutCastling(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] {
  const moves: Position[] = [];
  const kingMoves = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  kingMoves.forEach(([rowOffset, colOffset]) => {
    const newPos = {
      row: position.row + rowOffset,
      col: position.col + colOffset,
    };
    if (isValidPosition(newPos)) {
      const targetPiece = board[newPos.row][newPos.col];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push(newPos);
      }
    }
  });

  return moves;
}

function wouldMoveResultInCheck(
  board: (ChessPiece | null)[][],
  from: Position,
  to: Position,
  playerColor: PieceColor,
  gameState: GameState,
): boolean {
  // Create a copy of the board with the move applied
  const testBoard = board.map((row) => [...row]);
  const piece = testBoard[from.row][from.col];
  testBoard[to.row][to.col] = piece;
  testBoard[from.row][from.col] = null;

  // Find the king's position
  let kingPos: Position | null = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const boardPiece = testBoard[row][col];
      if (
        boardPiece &&
        boardPiece.type === "king" &&
        boardPiece.color === playerColor
      ) {
        kingPos = { row, col };
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return false;

  return isSquareUnderAttack(testBoard, kingPos, playerColor);
}

export function isInCheck(
  board: (ChessPiece | null)[][],
  playerColor: PieceColor,
): boolean {
  // Find the king
  let kingPos: Position | null = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === "king" && piece.color === playerColor) {
        kingPos = { row, col };
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return false;

  return isSquareUnderAttack(board, kingPos, playerColor);
}

export function isCheckmate(gameState: GameState): boolean {
  if (!gameState.inCheck) return false;

  // Check if any piece can make a legal move
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = gameState.board[row][col];
      if (piece && piece.color === gameState.currentPlayer) {
        const moves = getPossibleMoves(
          gameState.board,
          { row, col },
          piece,
          gameState,
        );
        if (moves.length > 0) {
          return false;
        }
      }
    }
  }

  return true;
}

export function isStalemate(gameState: GameState): boolean {
  if (gameState.inCheck) return false;

  // Check if any piece can make a legal move
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = gameState.board[row][col];
      if (piece && piece.color === gameState.currentPlayer) {
        const moves = getPossibleMoves(
          gameState.board,
          { row, col },
          piece,
          gameState,
        );
        if (moves.length > 0) {
          return false;
        }
      }
    }
  }

  return true;
}

export function makeMove(
  gameState: GameState,
  from: Position,
  to: Position,
): GameState {
  const newBoard = gameState.board.map((row) => [...row]);
  const piece = newBoard[from.row][from.col];

  if (!piece) return gameState;

  const capturedPiece = newBoard[to.row][to.col];

  // Handle castling
  const isCastle = piece.type === "king" && Math.abs(to.col - from.col) === 2;
  if (isCastle) {
    // Move the rook
    if (to.col > from.col) {
      // Kingside castling
      const rook = newBoard[from.row][7];
      newBoard[from.row][5] = rook;
      newBoard[from.row][7] = null;
    } else {
      // Queenside castling
      const rook = newBoard[from.row][0];
      newBoard[from.row][3] = rook;
      newBoard[from.row][0] = null;
    }
  }

  // Handle en passant
  const isEnPassant =
    piece.type === "pawn" &&
    gameState.enPassantTarget &&
    positionsEqual(to, gameState.enPassantTarget);
  if (isEnPassant) {
    // Remove the captured pawn
    const capturedPawnRow = piece.color === "white" ? to.row + 1 : to.row - 1;
    newBoard[capturedPawnRow][to.col] = null;
  }

  // Make the move
  newBoard[to.row][to.col] = piece;
  newBoard[from.row][from.col] = null;

  // Handle pawn promotion
  if (piece.type === "pawn" && (to.row === 0 || to.row === 7)) {
    newBoard[to.row][to.col] = { ...piece, type: "queen" }; // Auto-promote to queen for now
  }

  const nextPlayer = gameState.currentPlayer === "white" ? "black" : "white";
  const newInCheck = isInCheck(newBoard, nextPlayer);

  // Update castling rights
  const newCanCastleKingside = { ...gameState.canCastleKingside };
  const newCanCastleQueenside = { ...gameState.canCastleQueenside };

  if (piece.type === "king") {
    newCanCastleKingside[piece.color] = false;
    newCanCastleQueenside[piece.color] = false;
  } else if (piece.type === "rook") {
    if (from.col === 0) {
      newCanCastleQueenside[piece.color] = false;
    } else if (from.col === 7) {
      newCanCastleKingside[piece.color] = false;
    }
  }

  // Set en passant target
  let newEnPassantTarget: Position | null = null;
  if (piece.type === "pawn" && Math.abs(to.row - from.row) === 2) {
    newEnPassantTarget = { row: (from.row + to.row) / 2, col: from.col };
  }

  const move: Move = {
    from,
    to,
    piece,
    capturedPiece,
    isCheck: newInCheck,
    isCastle,
    isEnPassant,
  };

  const newGameState: GameState = {
    board: newBoard,
    currentPlayer: nextPlayer,
    gameStatus: "active",
    moveHistory: [...gameState.moveHistory, move],
    selectedSquare: null,
    possibleMoves: [],
    lastMove: move,
    inCheck: newInCheck,
    canCastleKingside: newCanCastleKingside,
    canCastleQueenside: newCanCastleQueenside,
    enPassantTarget: newEnPassantTarget,
  };

  // Check for checkmate or stalemate
  if (isCheckmate(newGameState)) {
    newGameState.gameStatus = "checkmate";
    move.isCheckmate = true;
  } else if (isStalemate(newGameState)) {
    newGameState.gameStatus = "stalemate";
  } else if (newInCheck) {
    newGameState.gameStatus = "check";
  }

  return newGameState;
}
