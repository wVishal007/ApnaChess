import { ChessPiece } from "@/types/chess";
import { PieceTheme } from "@/types/theme";

interface ChessPieceSvgProps {
  piece: ChessPiece;
  theme: PieceTheme;
  size?: number;
  className?: string;
}

// Classical Staunton-style pieces
const ClassicalPieces = {
  king: (color: "white" | "black", size: number) => (
    <svg width={size} height={size} viewBox="0 0 45 45" className="chess-piece">
      <g
        fill={color === "white" ? "#ffffff" : "#000000"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.5 11.63V6" strokeLinejoin="miter" />
        <path d="M20 8h5" strokeLinejoin="miter" />
        <path
          d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"
          fill={color === "white" ? "#ffffff" : "#000000"}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z" />
        <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" />
      </g>
      <filter id="shadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </svg>
  ),
  queen: (color: "white" | "black", size: number) => (
    <svg width={size} height={size} viewBox="0 0 45 45" className="chess-piece">
      <g
        fill={color === "white" ? "#ffffff" : "#000000"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm15.5 4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm-16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm8 2.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
        <path
          d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15L13.5 11V25L6.5 14 9 26z"
          strokeLinecap="butt"
        />
        <path
          d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 0.5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5 0.5 2.5 0.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 0.5-1.5-1-2.5-0.5-2.5-0.5-2 0.5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
          strokeLinecap="butt"
        />
        <path d="M11.5 30c3.5-1 18.5-1 22 0m-22 3.5c3.5-1 18.5-1 22 0m-22 3.5c3.5-1 18.5-1 22 0" />
      </g>
    </svg>
  ),
  rook: (color: "white" | "black", size: number) => (
    <svg width={size} height={size} viewBox="0 0 45 45" className="chess-piece">
      <g
        fill={color === "white" ? "#ffffff" : "#000000"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm0-7V11H9v3h3v2h3v9H12v2h21v-2h-3V16h3v-2h3V11h-3v18H12zm9-11c0-1.5.5-2.5 1.5-3 1-0.5 2.5-0.5 3.5 0 1 0.5 1.5 1.5 1.5 3v4c0 1.5-0.5 2.5-1.5 3-1 0.5-2.5 0.5-3.5 0-1-0.5-1.5-1.5-1.5-3v-4z" />
        <path d="M34 14l-3 0 0-2-3 0 0-2-8 0 0 2-3 0 0 2-3 0" />
      </g>
    </svg>
  ),
  bishop: (color: "white" | "black", size: number) => (
    <svg width={size} height={size} viewBox="0 0 45 45" className="chess-piece">
      <g
        fill={color === "white" ? "#ffffff" : "#000000"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M20 8c0-1 1-1 1-1h3c0 0 1 0 1 1l-2.5 17.5L20 8zm2.5 17.5L25 8"
          fill="none"
          strokeLinecap="butt"
        />
        <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z" />
        <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14 5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
        <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
      </g>
    </svg>
  ),
  knight: (color: "white" | "black", size: number) => (
    <svg width={size} height={size} viewBox="0 0 45 45" className="chess-piece">
      <g
        fill={color === "white" ? "#ffffff" : "#000000"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
          fill={color === "white" ? "#ffffff" : "#000000"}
        />
        <path
          d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
          fill={color === "white" ? "#ffffff" : "#000000"}
        />
        <path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z" fill="#000000" />
        <path
          d="M14.933 15.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z"
          fill="#000000"
        />
      </g>
    </svg>
  ),
  pawn: (color: "white" | "black", size: number) => (
    <svg width={size} height={size} viewBox="0 0 45 45" className="chess-piece">
      <g
        fill={color === "white" ? "#ffffff" : "#000000"}
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
      </g>
    </svg>
  ),
};

// Modern minimalist pieces
const ModernPieces = {
  king: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece modern"
    >
      <defs>
        <linearGradient
          id={`modernKing${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#ffffff" : "#1a202c"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#e2e8f0" : "#2d3748"}
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#modernKing${color})`}
        stroke={color === "white" ? "#4a5568" : "#ffffff"}
        strokeWidth="1"
      >
        <polygon points="22.5,5 20,8 25,8" />
        <rect x="18" y="12" width="9" height="4" rx="1" />
        <polygon points="22.5,16 12,35 33,35" />
        <rect x="12" y="35" width="21" height="4" rx="2" />
      </g>
    </svg>
  ),
  queen: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece modern"
    >
      <defs>
        <linearGradient
          id={`modernQueen${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#ffffff" : "#1a202c"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#e2e8f0" : "#2d3748"}
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#modernQueen${color})`}
        stroke={color === "white" ? "#4a5568" : "#ffffff"}
        strokeWidth="1"
      >
        <polygon points="9,8 13,5 17,8 22.5,5 28,8 32,5 36,8 27,35 18,35" />
        <rect x="18" y="35" width="9" height="4" rx="2" />
      </g>
    </svg>
  ),
  rook: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece modern"
    >
      <defs>
        <linearGradient
          id={`modernRook${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#ffffff" : "#1a202c"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#e2e8f0" : "#2d3748"}
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#modernRook${color})`}
        stroke={color === "white" ? "#4a5568" : "#ffffff"}
        strokeWidth="1"
      >
        <rect x="14" y="8" width="17" height="27" rx="1" />
        <rect x="12" y="35" width="21" height="4" rx="2" />
        <rect x="14" y="5" width="3" height="5" />
        <rect x="19" y="5" width="3" height="5" />
        <rect x="23" y="5" width="3" height="5" />
        <rect x="28" y="5" width="3" height="5" />
      </g>
    </svg>
  ),
  bishop: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece modern"
    >
      <defs>
        <linearGradient
          id={`modernBishop${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#ffffff" : "#1a202c"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#e2e8f0" : "#2d3748"}
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#modernBishop${color})`}
        stroke={color === "white" ? "#4a5568" : "#ffffff"}
        strokeWidth="1"
      >
        <ellipse cx="22.5" cy="22" rx="8" ry="17" />
        <circle cx="22.5" cy="8" r="3" />
        <rect x="16" y="35" width="13" height="4" rx="2" />
      </g>
    </svg>
  ),
  knight: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece modern"
    >
      <defs>
        <linearGradient
          id={`modernKnight${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#ffffff" : "#1a202c"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#e2e8f0" : "#2d3748"}
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#modernKnight${color})`}
        stroke={color === "white" ? "#4a5568" : "#ffffff"}
        strokeWidth="1"
      >
        <path d="M15 35 Q22.5 8 30 15 Q35 20 30 35 Z" />
        <rect x="15" y="35" width="15" height="4" rx="2" />
        <circle cx="26" cy="18" r="1.5" />
      </g>
    </svg>
  ),
  pawn: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece modern"
    >
      <defs>
        <linearGradient
          id={`modernPawn${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#ffffff" : "#1a202c"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#e2e8f0" : "#2d3748"}
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#modernPawn${color})`}
        stroke={color === "white" ? "#4a5568" : "#ffffff"}
        strokeWidth="1"
      >
        <circle cx="22.5" cy="12" r="5" />
        <polygon points="22.5,17 17,35 28,35" />
        <rect x="17" y="35" width="11" height="4" rx="2" />
      </g>
    </svg>
  ),
};

// Glass/3D effect pieces
const GlassPieces = {
  king: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece glass"
    >
      <defs>
        <linearGradient
          id={`glassKing${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.9)"
                : "rgba(59,130,246,0.9)"
            }
          />
          <stop
            offset="50%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.6)"
                : "rgba(37,99,235,0.6)"
            }
          />
          <stop
            offset="100%"
            stopColor={
              color === "white"
                ? "rgba(240,240,240,0.8)"
                : "rgba(29,78,216,0.8)"
            }
          />
        </linearGradient>
        <filter id="glassEffect">
          <feGaussianBlur stdDeviation="0.5" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" />
        </filter>
      </defs>
      <g
        fill={`url(#glassKing${color})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.5"
        filter="url(#glassEffect)"
      >
        <path d="M22.5,5 L20,8 L25,8 Z" />
        <rect x="18" y="12" width="9" height="4" rx="1" />
        <path d="M22.5,16 L12,35 L33,35 Z" />
        <rect x="12" y="35" width="21" height="4" rx="2" />
        <ellipse cx="22.5" cy="20" rx="8" ry="2" fill="rgba(255,255,255,0.3)" />
      </g>
    </svg>
  ),
  queen: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece glass"
    >
      <defs>
        <linearGradient
          id={`glassQueen${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.9)"
                : "rgba(59,130,246,0.9)"
            }
          />
          <stop
            offset="50%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.6)"
                : "rgba(37,99,235,0.6)"
            }
          />
          <stop
            offset="100%"
            stopColor={
              color === "white"
                ? "rgba(240,240,240,0.8)"
                : "rgba(29,78,216,0.8)"
            }
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#glassQueen${color})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.5"
      >
        <path d="M9,8 L13,5 L17,8 L22.5,5 L28,8 L32,5 L36,8 L27,35 L18,35 Z" />
        <rect x="18" y="35" width="9" height="4" rx="2" />
        <ellipse cx="22.5" cy="25" rx="9" ry="2" fill="rgba(255,255,255,0.3)" />
      </g>
    </svg>
  ),
  rook: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece glass"
    >
      <defs>
        <linearGradient
          id={`glassRook${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.9)"
                : "rgba(59,130,246,0.9)"
            }
          />
          <stop
            offset="100%"
            stopColor={
              color === "white"
                ? "rgba(240,240,240,0.8)"
                : "rgba(29,78,216,0.8)"
            }
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#glassRook${color})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.5"
      >
        <rect x="14" y="8" width="17" height="27" rx="1" />
        <rect x="12" y="35" width="21" height="4" rx="2" />
        <rect x="14" y="5" width="3" height="5" />
        <rect x="19" y="5" width="3" height="5" />
        <rect x="23" y="5" width="3" height="5" />
        <rect x="28" y="5" width="3" height="5" />
        <ellipse
          cx="22.5"
          cy="20"
          rx="6"
          ry="1.5"
          fill="rgba(255,255,255,0.4)"
        />
      </g>
    </svg>
  ),
  bishop: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece glass"
    >
      <defs>
        <linearGradient
          id={`glassBishop${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.9)"
                : "rgba(59,130,246,0.9)"
            }
          />
          <stop
            offset="100%"
            stopColor={
              color === "white"
                ? "rgba(240,240,240,0.8)"
                : "rgba(29,78,216,0.8)"
            }
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#glassBishop${color})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.5"
      >
        <ellipse cx="22.5" cy="22" rx="8" ry="17" />
        <circle cx="22.5" cy="8" r="3" />
        <rect x="16" y="35" width="13" height="4" rx="2" />
        <ellipse
          cx="22.5"
          cy="18"
          rx="4"
          ry="1.5"
          fill="rgba(255,255,255,0.4)"
        />
      </g>
    </svg>
  ),
  knight: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece glass"
    >
      <defs>
        <linearGradient
          id={`glassKnight${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.9)"
                : "rgba(59,130,246,0.9)"
            }
          />
          <stop
            offset="100%"
            stopColor={
              color === "white"
                ? "rgba(240,240,240,0.8)"
                : "rgba(29,78,216,0.8)"
            }
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#glassKnight${color})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.5"
      >
        <path d="M15 35 Q22.5 8 30 15 Q35 20 30 35 Z" />
        <rect x="15" y="35" width="15" height="4" rx="2" />
        <circle cx="26" cy="18" r="1.5" fill="rgba(0,0,0,0.8)" />
        <ellipse
          cx="22.5"
          cy="25"
          rx="5"
          ry="1.5"
          fill="rgba(255,255,255,0.4)"
        />
      </g>
    </svg>
  ),
  pawn: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece glass"
    >
      <defs>
        <linearGradient
          id={`glassPawn${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={
              color === "white"
                ? "rgba(255,255,255,0.9)"
                : "rgba(59,130,246,0.9)"
            }
          />
          <stop
            offset="100%"
            stopColor={
              color === "white"
                ? "rgba(240,240,240,0.8)"
                : "rgba(29,78,216,0.8)"
            }
          />
        </linearGradient>
      </defs>
      <g
        fill={`url(#glassPawn${color})`}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.5"
      >
        <circle cx="22.5" cy="12" r="5" />
        <path d="M22.5,17 L17,35 L28,35 Z" />
        <rect x="17" y="35" width="11" height="4" rx="2" />
        <ellipse cx="22.5" cy="12" rx="3" ry="1" fill="rgba(255,255,255,0.5)" />
      </g>
    </svg>
  ),
};

// Neon cyberpunk pieces
const NeonPieces = {
  king: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece neon"
    >
      <defs>
        <linearGradient
          id={`neonKing${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#00ff88" : "#ff0080"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#00ccff" : "#8000ff"}
          />
        </linearGradient>
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        fill="none"
        stroke={`url(#neonKing${color})`}
        strokeWidth="2"
        filter="url(#neonGlow)"
      >
        <path d="M22.5,5 L20,8 L25,8 Z" />
        <rect x="18" y="12" width="9" height="4" rx="1" />
        <path d="M22.5,16 L12,35 L33,35 Z" />
        <rect x="12" y="35" width="21" height="4" rx="2" />
      </g>
    </svg>
  ),
  queen: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece neon"
    >
      <defs>
        <linearGradient
          id={`neonQueen${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#00ff88" : "#ff0080"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#00ccff" : "#8000ff"}
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#neonQueen${color})`}
        strokeWidth="2"
        filter="url(#neonGlow)"
      >
        <path d="M9,8 L13,5 L17,8 L22.5,5 L28,8 L32,5 L36,8 L27,35 L18,35 Z" />
        <rect x="18" y="35" width="9" height="4" rx="2" />
      </g>
    </svg>
  ),
  rook: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece neon"
    >
      <defs>
        <linearGradient
          id={`neonRook${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#00ff88" : "#ff0080"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#00ccff" : "#8000ff"}
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#neonRook${color})`}
        strokeWidth="2"
        filter="url(#neonGlow)"
      >
        <rect x="14" y="8" width="17" height="27" rx="1" />
        <rect x="12" y="35" width="21" height="4" rx="2" />
        <rect x="14" y="5" width="3" height="5" />
        <rect x="19" y="5" width="3" height="5" />
        <rect x="23" y="5" width="3" height="5" />
        <rect x="28" y="5" width="3" height="5" />
      </g>
    </svg>
  ),
  bishop: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece neon"
    >
      <defs>
        <linearGradient
          id={`neonBishop${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#00ff88" : "#ff0080"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#00ccff" : "#8000ff"}
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#neonBishop${color})`}
        strokeWidth="2"
        filter="url(#neonGlow)"
      >
        <ellipse cx="22.5" cy="22" rx="8" ry="17" />
        <circle cx="22.5" cy="8" r="3" />
        <rect x="16" y="35" width="13" height="4" rx="2" />
      </g>
    </svg>
  ),
  knight: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece neon"
    >
      <defs>
        <linearGradient
          id={`neonKnight${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#00ff88" : "#ff0080"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#00ccff" : "#8000ff"}
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#neonKnight${color})`}
        strokeWidth="2"
        filter="url(#neonGlow)"
      >
        <path d="M15 35 Q22.5 8 30 15 Q35 20 30 35 Z" />
        <rect x="15" y="35" width="15" height="4" rx="2" />
        <circle
          cx="26"
          cy="18"
          r="1.5"
          fill={color === "white" ? "#00ff88" : "#ff0080"}
        />
      </g>
    </svg>
  ),
  pawn: (color: "white" | "black", size: number) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      className="chess-piece neon"
    >
      <defs>
        <linearGradient
          id={`neonPawn${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={color === "white" ? "#00ff88" : "#ff0080"}
          />
          <stop
            offset="100%"
            stopColor={color === "white" ? "#00ccff" : "#8000ff"}
          />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#neonPawn${color})`}
        strokeWidth="2"
        filter="url(#neonGlow)"
      >
        <circle cx="22.5" cy="12" r="5" />
        <path d="M22.5,17 L17,35 L28,35 Z" />
        <rect x="17" y="35" width="11" height="4" rx="2" />
      </g>
    </svg>
  ),
};

const pieceThemes = {
  classical: ClassicalPieces,
  modern: ModernPieces,
  glass: GlassPieces,
  wooden: ClassicalPieces, // Using classical for wooden (could be enhanced with textures)
  crystal: GlassPieces, // Using glass for crystal
  neon: NeonPieces,
};

export function ChessPieceSvg({
  piece,
  theme,
  size = 45,
  className,
}: ChessPieceSvgProps) {
  const PieceSet = pieceThemes[theme] || pieceThemes.classical;
  const PieceComponent = PieceSet[piece.type];

  if (!PieceComponent) {
    return null;
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      {PieceComponent(piece.color, size)}
    </div>
  );
}
