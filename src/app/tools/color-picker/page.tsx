/**
 * Color picker tool
 * 颜色选择器工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'color-picker')!;

export default function ColorPickerPage() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  // Convert hex to RGB
  // 将十六进制转换为RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert hex to HSL
  // 将十六进制转换为HSL
  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgb(selectedColor);
  const hsl = hexToHsl(selectedColor);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const addToHistory = (color: string) => {
    if (!colorHistory.includes(color)) {
      setColorHistory(prev => [color, ...prev.slice(0, 9)]);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    addToHistory(color);
  };

  const presetColors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
    "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000"
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>颜色选择器 / Color Picker</CardTitle>
            <CardDescription>
              选择颜色并获取不同格式的颜色值
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="color-picker">选择颜色 / Pick Color</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="color-picker"
                      type="color"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-20 h-12 p-1"
                    />
                    <Input
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>颜色预览 / Color Preview</Label>
                  <div 
                    className="w-full h-32 rounded-lg border mt-2"
                    style={{ backgroundColor: selectedColor }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>颜色值 / Color Values</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border" style={{ backgroundColor: selectedColor }} />
                      <span className="font-mono text-sm">HEX: {selectedColor}</span>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(selectedColor)}>
                        复制 / Copy
                      </Button>
                    </div>
                    {rgb && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border" style={{ backgroundColor: selectedColor }} />
                        <span className="font-mono text-sm">RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
                          复制 / Copy
                        </Button>
                      </div>
                    )}
                    {hsl && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border" style={{ backgroundColor: selectedColor }} />
                        <span className="font-mono text-sm">HSL: hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
                          复制 / Copy
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>预设颜色 / Preset Colors</CardTitle>
            <CardDescription>
              常用颜色快速选择
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="w-12 h-12 rounded-lg border-2 hover:border-primary transition-colors"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {colorHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>颜色历史 / Color History</CardTitle>
              <CardDescription>
                最近选择的颜色
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {colorHistory.map((color) => (
                  <button
                    key={color}
                    className="w-12 h-12 rounded-lg border-2 hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    title={color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>颜色信息 / Color Information</CardTitle>
            <CardDescription>
              当前颜色的详细信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium">十六进制 / Hexadecimal</div>
                <div className="font-mono bg-muted p-2 rounded">{selectedColor}</div>
              </div>
              {rgb && (
                <div className="space-y-2">
                  <div className="font-medium">RGB值 / RGB Values</div>
                  <div className="font-mono bg-muted p-2 rounded">
                    R: {rgb.r}<br />
                    G: {rgb.g}<br />
                    B: {rgb.b}
                  </div>
                </div>
              )}
              {hsl && (
                <div className="space-y-2">
                  <div className="font-medium">HSL值 / HSL Values</div>
                  <div className="font-mono bg-muted p-2 rounded">
                    H: {hsl.h}°<br />
                    S: {hsl.s}%<br />
                    L: {hsl.l}%
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 