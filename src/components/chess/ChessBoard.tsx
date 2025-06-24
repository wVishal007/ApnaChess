import { Position, ChessPiece } from "@/types/chess";
import { ChessPieceComponent } from "./ChessPiece";
import { ChessTheme } from "@/types/theme";
import { cn } from "@/lib/utils";

interface ChessBoardProps {
  board: (ChessPiece | null)[][];
  onSquareClick: (position: Position) => void;
  selectedSquare: Position | null;
  possibleMoves: Position[];
  lastMoveSquares: Position[];
  theme: ChessTheme;
  animationsEnabled?: boolean;
  flipped?: boolean;
}

export function ChessBoard({
  board,
  onSquareClick,
  selectedSquare,
  possibleMoves,
  lastMoveSquares,
  theme,
  animationsEnabled = true,
  flipped = false,
}: ChessBoardProps) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  const displayBoard = flipped
    ? [...board].reverse().map((row) => [...row].reverse())
    : board;
  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  const isSquareSelected = (row: number, col: number): boolean => {
    if (!selectedSquare) return false;
    const actualRow = flipped ? 7 - row : row;
    const actualCol = flipped ? 7 - col : col;
    return selectedSquare.row === actualRow && selectedSquare.col === actualCol;
  };

  const isSquarePossibleMove = (row: number, col: number): boolean => {
    const actualRow = flipped ? 7 - row : row;
    const actualCol = flipped ? 7 - col : col;
    return possibleMoves.some(
      (move) => move.row === actualRow && move.col === actualCol,
    );
  };

  const isSquareLastMove = (row: number, col: number): boolean => {
    const actualRow = flipped ? 7 - row : row;
    const actualCol = flipped ? 7 - col : col;
    return lastMoveSquares.some(
      (square) => square.row === actualRow && square.col === actualCol,
    );
  };

  const handleSquareClick = (row: number, col: number) => {
    const actualRow = flipped ? 7 - row : row;
    const actualCol = flipped ? 7 - col : col;
    onSquareClick({ row: actualRow, col: actualCol });
  };

  return (
    <div className="relative">
      {/* Board */}
      <div
        className={cn(
          "grid grid-cols-8 shadow-2xl rounded-xl overflow-hidden relative",
          "border-4",
          animationsEnabled && "transition-all duration-300",
        )}
        style={{
          borderColor: theme.boardStyle.borderColor,
          boxShadow: `0 25px 50px -12px ${theme.boardStyle.shadowColor}, 0 0 0 1px ${theme.boardStyle.borderColor}`,
        }}
      >
        {/* Board glow effect for premium themes */}
        {theme.premium && (
          <div
            className="absolute inset-0 rounded-xl opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle at center, ${theme.boardStyle.borderColor}, transparent 70%)`,
            }}
          />
        )}

        {displayBoard.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const isSelected = isSquareSelected(rowIndex, colIndex);
            const isPossibleMove = isSquarePossibleMove(rowIndex, colIndex);
            const isLastMove = isSquareLastMove(rowIndex, colIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "aspect-square flex items-center justify-center relative cursor-pointer",
                  animationsEnabled && "transition-all duration-200",
                  "hover:brightness-110 hover:scale-[1.02]",
                  isSelected && "ring-4 ring-yellow-400 ring-inset z-10",
                  isLastMove && "ring-2 ring-orange-400 ring-inset",
                )}
                style={{
                  background: isLight
                    ? theme.boardStyle.lightSquare
                    : theme.boardStyle.darkSquare,
                }}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {/* Square inner glow for premium themes */}
                {theme.premium && (isSelected || isLastMove) && (
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: isSelected
                        ? "radial-gradient(circle at center, rgba(255,215,0,0.4), transparent 60%)"
                        : "radial-gradient(circle at center, rgba(255,165,0,0.3), transparent 60%)",
                    }}
                  />
                )}

                {piece && (
                  <ChessPieceComponent
                    piece={piece}
                    theme={theme.id as any}
                    animationsEnabled={animationsEnabled}
                  />
                )}

                {isPossibleMove && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {piece ? (
                      <div
                        className={cn(
                          "absolute inset-2 rounded-full border-4 border-red-500",
                          animationsEnabled && "animate-pulse",
                        )}
                        style={{
                          borderColor: theme.premium
                            ? "#ef4444"
                            : "rgba(239, 68, 68, 0.8)",
                          boxShadow: theme.premium
                            ? "0 0 20px rgba(239, 68, 68, 0.5)"
                            : "none",
                        }}
                      />
                    ) : (
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full bg-green-500 opacity-80",
                          animationsEnabled && "animate-pulse",
                        )}
                        style={{
                          backgroundColor: theme.premium
                            ? "#10b981"
                            : "rgba(16, 185, 129, 0.8)",
                          boxShadow: theme.premium
                            ? "0 0 15px rgba(16, 185, 129, 0.6)"
                            : "none",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          }),
        )}
      </div>

      {/* File labels (a-h) */}
      <div
        className="flex justify-around mt-3 text-sm font-semibold"
        style={{ color: theme.boardStyle.borderColor }}
      >
        {displayFiles.map((file) => (
          <div key={file} className="flex-1 text-center">
            {file}
          </div>
        ))}
      </div>

      {/* Rank labels (1-8) */}
      <div
        className="absolute left-0 top-0 bottom-0 flex flex-col justify-around -ml-7 text-sm font-semibold"
        style={{ color: theme.boardStyle.borderColor }}
      >
        {displayRanks.map((rank) => (
          <div key={rank} className="flex items-center justify-center h-full">
            {rank}
          </div>
        ))}
      </div>
    </div>
  );
}
