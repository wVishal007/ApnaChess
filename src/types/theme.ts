export type ChessTheme = {
  id: string;
  name: string;
  description: string;
  boardStyle: {
    lightSquare: string;
    darkSquare: string;
    borderColor: string;
    shadowColor: string;
  };
  pieceStyle: "svg" | "unicode" | "3d";
  premium?: boolean;
};

export type PieceTheme =
  | "classical"
  | "modern"
  | "glass"
  | "wooden"
  | "crystal"
  | "neon";

export const CHESS_THEMES: ChessTheme[] = [
  {
    id: "classical",
    name: "Classical",
    description: "Traditional Staunton pieces with elegant design",
    boardStyle: {
      lightSquare: "linear-gradient(135deg, #f0d9b5 0%, #e8d1a6 100%)",
      darkSquare: "linear-gradient(135deg, #b58863 0%, #a67c52 100%)",
      borderColor: "#8b4513",
      shadowColor: "rgba(139, 69, 19, 0.3)",
    },
    pieceStyle: "svg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean, minimalist design with sharp edges",
    boardStyle: {
      lightSquare: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
      darkSquare: "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)",
      borderColor: "#1a202c",
      shadowColor: "rgba(26, 32, 44, 0.3)",
    },
    pieceStyle: "svg",
  },
  {
    id: "glass",
    name: "3D Glass",
    description: "Translucent glass pieces with premium reflections",
    boardStyle: {
      lightSquare:
        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.8) 100%)",
      darkSquare:
        "linear-gradient(135deg, rgba(59,130,246,0.7) 0%, rgba(37,99,235,0.8) 100%)",
      borderColor: "#1e40af",
      shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    pieceStyle: "3d",
    premium: true,
  },
  {
    id: "wooden",
    name: "Wooden",
    description: "Rich mahogany and maple wood textures",
    boardStyle: {
      lightSquare:
        "linear-gradient(135deg, #deb887 0%, #d2b48c 50%, #cd853f 100%)",
      darkSquare:
        "linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #654321 100%)",
      borderColor: "#2f1b14",
      shadowColor: "rgba(47, 27, 20, 0.4)",
    },
    pieceStyle: "svg",
    premium: true,
  },
  {
    id: "crystal",
    name: "Crystal",
    description: "Sparkling diamond-like crystalline pieces",
    boardStyle: {
      lightSquare:
        "linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 50%, #81d4fa 100%)",
      darkSquare:
        "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
      borderColor: "#0d47a1",
      shadowColor: "rgba(13, 71, 161, 0.5)",
    },
    pieceStyle: "3d",
    premium: true,
  },
  {
    id: "neon",
    name: "Neon",
    description: "Cyberpunk glowing pieces with electric effects",
    boardStyle: {
      lightSquare: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      darkSquare: "linear-gradient(135deg, #0f0f23 0%, #0a0a1f 100%)",
      borderColor: "#00ff88",
      shadowColor: "rgba(0, 255, 136, 0.6)",
    },
    pieceStyle: "svg",
    premium: true,
  },
];
