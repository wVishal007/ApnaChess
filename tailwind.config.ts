import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        chess: {
          light: "hsl(var(--chess-light))",
          dark: "hsl(var(--chess-dark))",
          border: "hsl(var(--chess-border))",
          selected: "hsl(var(--chess-selected))",
          "possible-move": "hsl(var(--chess-possible-move))",
          "possible-capture": "hsl(var(--chess-possible-capture))",
          lastmove: "hsl(var(--chess-lastmove))",
          label: "hsl(var(--chess-label))",
          surface: "hsl(var(--chess-surface))",
          accent: "hsl(var(--chess-accent))",
          "accent-foreground": "hsl(var(--chess-accent-foreground))",
          foreground: "hsl(var(--chess-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        glow: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        "piece-hover": {
          "0%": {
            transform: "translateY(0px) scale(1)",
          },
          "50%": {
            transform: "translateY(-2px) scale(1.05)",
          },
          "100%": {
            transform: "translateY(0px) scale(1)",
          },
        },
        "board-shine": {
          "0%": {
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            transform: "translateX(-100%)",
          },
          "100%": {
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "piece-hover": "piece-hover 0.3s ease-in-out",
        "board-shine": "board-shine 3s ease-in-out infinite",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255, 255, 255, 0.35)",
          "0 0px 65px rgba(255, 255, 255, 0.2)",
        ],
        neon: [
          "0 0px 5px rgba(0, 255, 136, 0.8)",
          "0 0px 20px rgba(0, 255, 136, 0.4)",
          "0 0px 35px rgba(0, 255, 136, 0.2)",
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
