import { ChessBoard } from "@/components/chess/ChessBoard";
import { GameStatus } from "@/components/chess/GameStatus";
import { GameControls } from "@/components/chess/GameControls";
import { MoveHistory } from "@/components/chess/MoveHistory";
import { ThemeSelector } from "@/components/chess/ThemeSelector";
import { GameModeSelector } from "@/components/chess/GameModeSelector";
import { useChessGameWithAI } from "@/hooks/useChessGameWithAI";
import { useChessTheme } from "@/hooks/useChessTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Settings, Bot, Brain } from "lucide-react";

const Index = () => {
  const {
    gameState,
    gameMode,
    aiLevel,
    isAIThinking,
    isPlayerTurn,
    selectSquare,
    resetGame,
    changeGameMode,
    changeAILevel,
    isSquareSelected,
    isSquarePossibleMove,
    isSquareLastMove,
  } = useChessGameWithAI();

  const {
    currentTheme,
    boardFlipped,
    animationsEnabled,
    soundEnabled,
    changeTheme,
    toggleBoardFlip,
    toggleAnimations,
    toggleSound,
  } = useChessTheme();

  const getLastMoveSquares = () => {
    if (!gameState.lastMove) return [];
    return [gameState.lastMove.from, gameState.lastMove.to];
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: `linear-gradient(135deg, ${currentTheme.boardStyle.lightSquare}, ${currentTheme.boardStyle.darkSquare})`,
      }}
    >
      {/* Header */}
      <header
        className="border-b backdrop-blur-md sticky top-0 z-20"
        style={{
          borderColor: currentTheme.boardStyle.borderColor,
          background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))`,
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Crown className="w-10 h-10 text-primary" />
                {currentTheme.premium && (
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  ChessMaster Pro
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Premium Chess Experience • {currentTheme.name} Theme
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chess Board - Main Area */}
            <div className="lg:col-span-2 flex flex-col items-center space-y-8">
              <div className="flex flex-col items-center space-y-3">
                <GameStatus gameState={gameState} />

                {/* AI Status Indicators */}
                {gameMode !== "pvp" && (
                  <div className="flex items-center gap-3">
                    {gameMode === "pvc" && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Bot className="w-3 h-3" />
                        vs AI ({aiLevel})
                      </Badge>
                    )}
                    {gameMode === "cvc" && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Brain className="w-3 h-3" />
                        AI vs AI ({aiLevel})
                      </Badge>
                    )}
                    {isAIThinking && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2 animate-pulse"
                      >
                        <Brain className="w-3 h-3 animate-spin" />
                        AI Thinking...
                      </Badge>
                    )}
                  </div>
                )}

                {/* Turn Indicator */}
                {gameMode !== "cvc" && !isPlayerTurn && !isAIThinking && (
                  <Badge variant="outline" className="text-xs">
                    Waiting for AI move...
                  </Badge>
                )}
              </div>

              <div
                className="relative p-8 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at center, rgba(0,0,0,0.1), transparent 70%)`,
                }}
              >
                {/* Ambient board lighting */}
                {currentTheme.premium && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20 animate-pulse"
                    style={{
                      background: `radial-gradient(circle at center, ${currentTheme.boardStyle.borderColor}, transparent 80%)`,
                    }}
                  />
                )}

                <ChessBoard
                  board={gameState.board}
                  onSquareClick={selectSquare}
                  selectedSquare={gameState.selectedSquare}
                  possibleMoves={gameState.possibleMoves}
                  lastMoveSquares={getLastMoveSquares()}
                  theme={currentTheme}
                  animationsEnabled={animationsEnabled}
                  flipped={boardFlipped}
                />
              </div>

              {/* Mobile Controls */}
              <div className="w-full max-w-sm lg:hidden space-y-4">
                <GameModeSelector
                  currentMode={gameMode}
                  aiLevel={aiLevel}
                  isGameActive={
                    gameState.gameStatus === "active" ||
                    gameState.gameStatus === "check"
                  }
                  onModeChange={changeGameMode}
                  onAILevelChange={changeAILevel}
                  onStartGame={resetGame}
                />

                <Card className="bg-card/30 border-border backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GameControls
                      onReset={resetGame}
                      gameStatus={gameState.gameStatus}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar - Game Info */}
            <div className="space-y-6">
              {/* Game Mode Selection */}
              <GameModeSelector
                currentMode={gameMode}
                aiLevel={aiLevel}
                isGameActive={
                  gameState.gameStatus === "active" ||
                  gameState.gameStatus === "check"
                }
                onModeChange={changeGameMode}
                onAILevelChange={changeAILevel}
                onStartGame={resetGame}
              />

              {/* Theme Customization */}
              <ThemeSelector
                currentTheme={currentTheme}
                onThemeChange={changeTheme}
                boardFlipped={boardFlipped}
                onBoardFlip={toggleBoardFlip}
                animationsEnabled={animationsEnabled}
                onAnimationsToggle={toggleAnimations}
                soundEnabled={soundEnabled}
                onSoundToggle={toggleSound}
              />

              {/* Game Controls */}
              <Card className="bg-card/30 border-border backdrop-blur-sm hidden lg:block">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GameControls
                    onReset={resetGame}
                    gameStatus={gameState.gameStatus}
                  />
                </CardContent>
              </Card>

              <Separator className="lg:hidden" />

              {/* Move History */}
              <Card className="bg-card/30 border-border backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Game Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <MoveHistory moveHistory={gameState.moveHistory} />
                </CardContent>
              </Card>

              {/* Game Statistics */}
              <Card className="bg-card/30 border-border backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Game Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Game Mode:</span>
                    <span className="font-mono font-semibold flex items-center gap-1">
                      {gameMode === "pvp" && "Player vs Player"}
                      {gameMode === "pvc" && (
                        <>
                          <Bot className="w-3 h-3" />
                          Player vs AI
                        </>
                      )}
                      {gameMode === "cvc" && (
                        <>
                          <Brain className="w-3 h-3" />
                          AI vs AI
                        </>
                      )}
                    </span>
                  </div>
                  {gameMode !== "pvp" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">AI Level:</span>
                      <span className="font-mono font-semibold capitalize">
                        {aiLevel}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Moves:</span>
                    <span className="font-mono font-semibold">
                      {gameState.moveHistory.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Game Status:</span>
                    <span className="font-mono font-semibold capitalize">
                      {isAIThinking ? "AI Thinking" : gameState.gameStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Turn:</span>
                    <span className="font-mono font-semibold capitalize">
                      {gameState.currentPlayer}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="font-mono font-semibold flex items-center gap-1">
                      {currentTheme.name}
                      {currentTheme.premium && (
                        <Crown className="w-3 h-3 text-yellow-400" />
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* How to Play */}
              <Card className="bg-card/30 border-border backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Premium Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• 6 Premium chess piece themes</p>
                  <p>• Advanced visual effects & animations</p>
                  <p>• Glass, Crystal, and Neon styles</p>
                  <p>• Dynamic board backgrounds</p>
                  <p>• Ambient lighting effects</p>
                  <p>• Customizable game settings</p>
                  <p>• Professional tournament experience</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t backdrop-blur-md mt-16"
        style={{
          borderColor: currentTheme.boardStyle.borderColor,
          background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))`,
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">
                ChessMaster Pro
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Premium Chess Experience • Advanced Graphics • Professional
              Gameplay
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with React, TypeScript, and cutting-edge web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
