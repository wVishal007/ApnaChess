import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Bot,
  Swords,
  Play,
  Settings,
  Brain,
  Zap,
  Target,
} from "lucide-react";
import { GameMode, GAME_MODES } from "@/types/gameMode";
import { AILevel } from "@/lib/chessAI";
import { cn } from "@/lib/utils";

interface GameModeSelectorProps {
  currentMode: GameMode;
  aiLevel: AILevel;
  isGameActive: boolean;
  onModeChange: (mode: GameMode) => void;
  onAILevelChange: (level: AILevel) => void;
  onStartGame: () => void;
}

const AI_LEVELS = [
  {
    id: "easy" as AILevel,
    name: "Easy",
    description: "Good for beginners",
    icon: "🟢",
  },
  {
    id: "medium" as AILevel,
    name: "Medium",
    description: "Balanced challenge",
    icon: "🟡",
  },
  {
    id: "hard" as AILevel,
    name: "Hard",
    description: "Expert level AI",
    icon: "🔴",
  },
];

export function GameModeSelector({
  currentMode,
  aiLevel,
  isGameActive,
  onModeChange,
  onAILevelChange,
  onStartGame,
}: GameModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(currentMode);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    onModeChange(mode);
  };

  const getModeIcon = (mode: GameMode) => {
    switch (mode) {
      case "pvp":
        return <Users className="w-5 h-5" />;
      case "pvc":
        return <Bot className="w-5 h-5" />;
      case "cvc":
        return <Swords className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getAILevelIcon = (level: AILevel) => {
    switch (level) {
      case "easy":
        return <Target className="w-4 h-4 text-green-500" />;
      case "medium":
        return <Brain className="w-4 h-4 text-yellow-500" />;
      case "hard":
        return <Zap className="w-4 h-4 text-red-500" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-card/30 border-border backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Game Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mode">Mode</TabsTrigger>
            <TabsTrigger value="ai" disabled={selectedMode === "pvp"}>
              AI Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mode" className="space-y-3 mt-4">
            {GAME_MODES.map((mode) => (
              <div
                key={mode.id}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                  "hover:border-primary/50 hover:shadow-md",
                  selectedMode === mode.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background/50",
                )}
                onClick={() => handleModeSelect(mode.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getModeIcon(mode.id)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{mode.name}</h4>
                      {mode.id === "cvc" && (
                        <Badge variant="secondary" className="text-xs">
                          Demo
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mode.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-lg">{mode.icon}</div>
                </div>

                {selectedMode === mode.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">AI Difficulty</h4>
              <Select value={aiLevel} onValueChange={onAILevelChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AI_LEVELS.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      <div className="flex items-center gap-2">
                        {getAILevelIcon(level.id)}
                        <span>{level.name}</span>
                        <span className="text-xs text-muted-foreground">
                          - {level.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMode === "cvc" && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Swords className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Computer vs Computer
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Watch two AI players battle each other. Both will use the
                  selected difficulty level.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Button
          onClick={onStartGame}
          className="w-full mt-4"
          disabled={isGameActive}
        >
          <Play className="w-4 h-4 mr-2" />
          {isGameActive ? "Game in Progress" : "Start New Game"}
        </Button>
      </CardContent>
    </Card>
  );
}
