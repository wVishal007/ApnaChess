import { GameState } from "@/types/chess";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameStatusProps {
  gameState: GameState;
}

export function GameStatus({ gameState }: GameStatusProps) {
  const getStatusIcon = () => {
    switch (gameState.gameStatus) {
      case "check":
        return <AlertTriangle className="w-4 h-4" />;
      case "checkmate":
        return <Crown className="w-4 h-4" />;
      case "stalemate":
        return <Shield className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (gameState.gameStatus) {
      case "active":
        return `${gameState.currentPlayer === "white" ? "White" : "Black"} to move`;
      case "check":
        return `${gameState.currentPlayer === "white" ? "White" : "Black"} in check`;
      case "checkmate":
        return `Checkmate! ${gameState.currentPlayer === "white" ? "Black" : "White"} wins`;
      case "stalemate":
        return "Stalemate - Draw";
      case "draw":
        return "Draw";
      default:
        return "";
    }
  };

  const getStatusVariant = () => {
    switch (gameState.gameStatus) {
      case "check":
        return "destructive";
      case "checkmate":
        return "default";
      case "stalemate":
      case "draw":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Badge
        variant={getStatusVariant() as any}
        className={cn("text-sm px-4 py-2 flex items-center gap-2", {
          "bg-chess-accent text-chess-accent-foreground":
            gameState.gameStatus === "active",
        })}
      >
        {getStatusIcon()}
        {getStatusText()}
      </Badge>

      {gameState.moveHistory.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Move {Math.ceil(gameState.moveHistory.length / 2)}
        </div>
      )}
    </div>
  );
}
