import { Move } from "@/types/chess";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface MoveHistoryProps {
  moveHistory: Move[];
}

function getMoveNotation(move: Move): string {
  const { piece, from, to, capturedPiece, isCheck, isCheckmate, isCastle } =
    move;

  if (isCastle) {
    return to.col > from.col ? "O-O" : "O-O-O";
  }

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const pieceSymbols = {
    king: "K",
    queen: "Q",
    rook: "R",
    bishop: "B",
    knight: "N",
    pawn: "",
  };

  let notation = pieceSymbols[piece.type];

  if (capturedPiece) {
    if (piece.type === "pawn") {
      notation += files[from.col];
    }
    notation += "x";
  }

  notation += files[to.col] + (8 - to.row);

  if (isCheckmate) {
    notation += "#";
  } else if (isCheck) {
    notation += "+";
  }

  return notation;
}

export function MoveHistory({ moveHistory }: MoveHistoryProps) {
  const movePairs: { white?: Move; black?: Move; moveNumber: number }[] = [];

  for (let i = 0; i < moveHistory.length; i += 2) {
    movePairs.push({
      white: moveHistory[i],
      black: moveHistory[i + 1],
      moveNumber: Math.floor(i / 2) + 1,
    });
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-chess-foreground mb-3">
        Move History
      </h3>
      <ScrollArea className="h-64 w-full rounded-md border border-chess-border bg-chess-surface/30">
        <div className="p-3">
          {movePairs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No moves yet
            </p>
          ) : (
            <div className="space-y-1">
              {movePairs.map((pair, index) => (
                <div
                  key={index}
                  className={cn(
                    "grid grid-cols-[auto_1fr_1fr] gap-3 text-sm py-1 px-2 rounded",
                    "hover:bg-chess-surface/50",
                  )}
                >
                  <span className="text-muted-foreground font-mono">
                    {pair.moveNumber}.
                  </span>
                  <span className="font-mono">
                    {pair.white ? getMoveNotation(pair.white) : ""}
                  </span>
                  <span className="font-mono">
                    {pair.black ? getMoveNotation(pair.black) : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
