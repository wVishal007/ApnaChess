import { ChessPiece } from "@/types/chess";
import { PieceTheme } from "@/types/theme";
import { ChessPieceSvg } from "./ChessPieceThemes";
import { cn } from "@/lib/utils";

interface ChessPieceProps {
  piece: ChessPiece;
  theme: PieceTheme;
  animationsEnabled?: boolean;
  className?: string;
}

export function ChessPieceComponent({
  piece,
  theme,
  animationsEnabled = true,
  className,
}: ChessPieceProps) {
  return (
    <div
      className={cn(
        "select-none flex items-center justify-center w-full h-full cursor-pointer",
        animationsEnabled && "transition-all duration-200 hover:scale-110",
        "drop-shadow-lg",
        theme === "glass" && "filter brightness-110",
        theme === "crystal" && "filter saturate-150 brightness-105",
        theme === "neon" && "filter drop-shadow-[0_0_8px_currentColor]",
        className,
      )}
      aria-label={`${piece.color} ${piece.type}`}
    >
      <ChessPieceSvg piece={piece} theme={theme} size={45} />
    </div>
  );
}
