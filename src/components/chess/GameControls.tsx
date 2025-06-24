import { Button } from "@/components/ui/button";
import { RotateCcw, Flag, Handshake } from "lucide-react";

interface GameControlsProps {
  onReset: () => void;
  onResign?: () => void;
  onOfferDraw?: () => void;
  gameStatus: string;
}

export function GameControls({
  onReset,
  onResign,
  onOfferDraw,
  gameStatus,
}: GameControlsProps) {
  const isGameActive = gameStatus === "active" || gameStatus === "check";

  return (
    <div className="flex flex-col space-y-3">
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full bg-chess-surface border-chess-border hover:bg-chess-surface/80"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Game
      </Button>

      {isGameActive && (
        <>
          {onResign && (
            <Button
              onClick={onResign}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              <Flag className="w-4 h-4 mr-2" />
              Resign
            </Button>
          )}

          {onOfferDraw && (
            <Button
              onClick={onOfferDraw}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <Handshake className="w-4 h-4 mr-2" />
              Offer Draw
            </Button>
          )}
        </>
      )}
    </div>
  );
}
