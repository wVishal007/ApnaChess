import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Palette,
  RotateCcw,
  Volume2,
  VolumeX,
  Zap,
  ZapOff,
  Crown,
  Sparkles,
} from "lucide-react";
import { ChessTheme, CHESS_THEMES } from "@/types/theme";
import { ChessPieceSvg } from "./ChessPieceThemes";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  currentTheme: ChessTheme;
  onThemeChange: (themeId: string) => void;
  boardFlipped: boolean;
  onBoardFlip: () => void;
  animationsEnabled: boolean;
  onAnimationsToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export function ThemeSelector({
  currentTheme,
  onThemeChange,
  boardFlipped,
  onBoardFlip,
  animationsEnabled,
  onAnimationsToggle,
  soundEnabled,
  onSoundToggle,
}: ThemeSelectorProps) {
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);

  const handleThemePreview = (themeId: string) => {
    setPreviewTheme(themeId);
  };

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    setPreviewTheme(null);
  };

  return (
    <Card className="bg-card/50 border-border backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Customize Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="themes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="themes" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {CHESS_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={cn(
                    "relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer group",
                    "hover:border-primary/50 hover:shadow-lg",
                    currentTheme.id === theme.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background/50",
                  )}
                  onClick={() => handleThemeSelect(theme.id)}
                  onMouseEnter={() => handleThemePreview(theme.id)}
                  onMouseLeave={() => setPreviewTheme(null)}
                >
                  {/* Theme Preview */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {/* Mini chess board preview */}
                      <div className="grid grid-cols-4 gap-0.5 w-12 h-12 rounded border">
                        {[...Array(16)].map((_, i) => {
                          const row = Math.floor(i / 4);
                          const col = i % 4;
                          const isLight = (row + col) % 2 === 0;
                          return (
                            <div
                              key={i}
                              className="aspect-square rounded-[1px]"
                              style={{
                                background: isLight
                                  ? theme.boardStyle.lightSquare
                                  : theme.boardStyle.darkSquare,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{theme.name}</h4>
                        {theme.premium && (
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {theme.description}
                      </p>
                    </div>

                    {/* Sample pieces */}
                    <div className="flex-shrink-0 flex gap-1">
                      <ChessPieceSvg
                        piece={{
                          type: "king",
                          color: "white",
                          id: "preview-king",
                        }}
                        theme={theme.id as any}
                        size={20}
                      />
                      <ChessPieceSvg
                        piece={{
                          type: "queen",
                          color: "black",
                          id: "preview-queen",
                        }}
                        theme={theme.id as any}
                        size={20}
                      />
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {currentTheme.id === theme.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* Premium glow effect */}
                  {theme.premium && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              {/* Board Settings */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Board Settings
                </h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="flip-board" className="text-sm">
                    Flip Board
                  </Label>
                  <Switch
                    id="flip-board"
                    checked={boardFlipped}
                    onCheckedChange={onBoardFlip}
                  />
                </div>
              </div>

              {/* Visual Settings */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Visual Effects
                </h4>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="animations"
                    className="text-sm flex items-center gap-2"
                  >
                    {animationsEnabled ? (
                      <Zap className="w-3 h-3" />
                    ) : (
                      <ZapOff className="w-3 h-3" />
                    )}
                    Animations
                  </Label>
                  <Switch
                    id="animations"
                    checked={animationsEnabled}
                    onCheckedChange={onAnimationsToggle}
                  />
                </div>
              </div>

              {/* Audio Settings */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                  Audio
                </h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sound" className="text-sm">
                    Sound Effects
                  </Label>
                  <Switch
                    id="sound"
                    checked={soundEnabled}
                    onCheckedChange={onSoundToggle}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
