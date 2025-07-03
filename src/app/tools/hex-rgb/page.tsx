/**
 * HEX to RGB converter tool
 * 颜色转换器工具
 */

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'hex-rgb')!;

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  cmyk: { c: number; m: number; y: number; k: number };
}

export default function HexRgbPage() {
  const [inputType, setInputType] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const [inputValue, setInputValue] = useState("");
  const [colorValues, setColorValues] = useState<ColorValues>({
    hex: "#3b82f6",
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
    cmyk: { c: 76, m: 47, y: 0, k: 4 }
  });

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

  // Convert RGB to hex
  // 将RGB转换为十六进制
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // Convert RGB to HSL
  // 将RGB转换为HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  // 将HSL转换为RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Convert RGB to CMYK
  // 将RGB转换为CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  // Update color values based on input
  // 根据输入更新颜色值
  const updateColorValues = () => {
    try {
      let rgb = { r: 0, g: 0, b: 0 };

      switch (inputType) {
        case 'hex':
          const hexRgb = hexToRgb(inputValue);
          if (hexRgb) {
            rgb = hexRgb;
          }
          break;
        case 'rgb':
          const rgbMatch = inputValue.match(/(\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            rgb = {
              r: parseInt(rgbMatch[1]),
              g: parseInt(rgbMatch[2]),
              b: parseInt(rgbMatch[3])
            };
          }
          break;
        case 'hsl':
          const hslMatch = inputValue.match(/(\d+),\s*(\d+)%,\s*(\d+)%/);
          if (hslMatch) {
            const hsl = {
              h: parseInt(hslMatch[1]),
              s: parseInt(hslMatch[2]),
              l: parseInt(hslMatch[3])
            };
            rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
          }
          break;
      }

      if (rgb.r >= 0 && rgb.r <= 255 && rgb.g >= 0 && rgb.g <= 255 && rgb.b >= 0 && rgb.b <= 255) {
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

        setColorValues({ hex, rgb, hsl, cmyk });
      }
    } catch (error) {
      console.error('颜色转换错误 / Color conversion error:', error);
    }
  };

  useEffect(() => {
    if (inputValue) {
      updateColorValues();
    }
  }, [inputValue, inputType]);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const loadExample = () => {
    setInputType('hex');
    setInputValue('#3b82f6');
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>颜色输入 / Color Input</CardTitle>
            <CardDescription>
              输入颜色值进行转换
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button onClick={loadExample} variant="outline" size="sm">
                  加载示例 / Load Example
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>HEX 颜色 / HEX Color</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="color"
                      value={colorValues.hex}
                      onChange={(e) => {
                        setInputType('hex');
                        setInputValue(e.target.value);
                      }}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={inputType === 'hex' ? inputValue : colorValues.hex}
                      onChange={(e) => {
                        setInputType('hex');
                        setInputValue(e.target.value);
                      }}
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>RGB 颜色 / RGB Color</Label>
                  <Input
                    value={inputType === 'rgb' ? inputValue : `${colorValues.rgb.r}, ${colorValues.rgb.g}, ${colorValues.rgb.b}`}
                    onChange={(e) => {
                      setInputType('rgb');
                      setInputValue(e.target.value);
                    }}
                    placeholder="255, 255, 255"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>HSL 颜色 / HSL Color</Label>
                  <Input
                    value={inputType === 'hsl' ? inputValue : `${colorValues.hsl.h}, ${colorValues.hsl.s}%, ${colorValues.hsl.l}%`}
                    onChange={(e) => {
                      setInputType('hsl');
                      setInputValue(e.target.value);
                    }}
                    placeholder="0, 0%, 100%"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>颜色预览 / Color Preview</CardTitle>
            <CardDescription>
              当前颜色的可视化预览
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="w-full h-32 rounded-lg border"
              style={{ backgroundColor: colorValues.hex }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>转换结果 / Conversion Results</CardTitle>
            <CardDescription>
              各种颜色格式的转换结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>HEX 格式 / HEX Format</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={colorValues.hex} readOnly />
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(colorValues.hex)}>
                      复制 / Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>RGB 格式 / RGB Format</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={`rgb(${colorValues.rgb.r}, ${colorValues.rgb.g}, ${colorValues.rgb.b})`} readOnly />
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(`rgb(${colorValues.rgb.r}, ${colorValues.rgb.g}, ${colorValues.rgb.b})`)}>
                      复制 / Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>HSL 格式 / HSL Format</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={`hsl(${colorValues.hsl.h}, ${colorValues.hsl.s}%, ${colorValues.hsl.l}%)`} readOnly />
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(`hsl(${colorValues.hsl.h}, ${colorValues.hsl.s}%, ${colorValues.hsl.l}%)`)}>
                      复制 / Copy
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>CMYK 格式 / CMYK Format</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={`cmyk(${colorValues.cmyk.c}%, ${colorValues.cmyk.m}%, ${colorValues.cmyk.y}%, ${colorValues.cmyk.k}%)`} readOnly />
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(`cmyk(${colorValues.cmyk.c}%, ${colorValues.cmyk.m}%, ${colorValues.cmyk.y}%, ${colorValues.cmyk.k}%)`)}>
                      复制 / Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>数值详情 / Value Details</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div className="space-y-1">
                      <div>R: {colorValues.rgb.r}</div>
                      <div>G: {colorValues.rgb.g}</div>
                      <div>B: {colorValues.rgb.b}</div>
                    </div>
                    <div className="space-y-1">
                      <div>H: {colorValues.hsl.h}°</div>
                      <div>S: {colorValues.hsl.s}%</div>
                      <div>L: {colorValues.hsl.l}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>颜色格式说明 / Color Format Guide</CardTitle>
            <CardDescription>
              各种颜色格式的使用说明
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">HEX 格式 / HEX Format</div>
                  <div className="text-muted-foreground">
                    <div>• 6位十六进制数</div>
                    <div>• 范围: #000000 - #FFFFFF</div>
                    <div>• 示例: #3b82f6</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">RGB 格式 / RGB Format</div>
                  <div className="text-muted-foreground">
                    <div>• 红、绿、蓝三色值</div>
                    <div>• 范围: 0-255</div>
                    <div>• 示例: 59, 130, 246</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">HSL 格式 / HSL Format</div>
                  <div className="text-muted-foreground">
                    <div>• 色相、饱和度、亮度</div>
                    <div>• H: 0-360°, S/L: 0-100%</div>
                    <div>• 示例: 217, 91%, 60%</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">CMYK 格式 / CMYK Format</div>
                  <div className="text-muted-foreground">
                    <div>• 青、品红、黄、黑</div>
                    <div>• 范围: 0-100%</div>
                    <div>• 用于印刷</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 