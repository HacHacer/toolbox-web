/**
 * Case converter tool
 * 大小写转换工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'char-case')!;

export default function CharCasePage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Case conversion functions
  // 大小写转换函数
  const convertCase = (type: string) => {
    switch (type) {
      case 'uppercase':
        setOutputText(inputText.toUpperCase());
        break;
      case 'lowercase':
        setOutputText(inputText.toLowerCase());
        break;
      case 'capitalize':
        setOutputText(inputText.replace(/\b\w/g, l => l.toUpperCase()));
        break;
      case 'titlecase':
        setOutputText(inputText.replace(/\b\w+/g, word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ));
        break;
      case 'alternating':
        setOutputText(inputText.split('').map((char, i) => 
          i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join(''));
        break;
      case 'inverse':
        setOutputText(inputText.split('').map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join(''));
        break;
      case 'snake_case':
        setOutputText(inputText.toLowerCase().replace(/\s+/g, '_'));
        break;
      case 'kebab-case':
        setOutputText(inputText.toLowerCase().replace(/\s+/g, '-'));
        break;
      case 'camelCase':
        setOutputText(inputText.toLowerCase().replace(/\s+(.)/g, (_, group) => group.toUpperCase()));
        break;
      case 'PascalCase':
        setOutputText(inputText.replace(/\b\w/g, l => l.toUpperCase()).replace(/\s+/g, ''));
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>输入文本 / Input Text</CardTitle>
            <CardDescription>
              在下方输入框中输入要转换的文本
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="在此输入要转换的文本..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>转换选项 / Conversion Options</CardTitle>
            <CardDescription>
              选择转换方式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <Button onClick={() => convertCase('uppercase')} variant="outline" size="sm">
                全大写 / UPPERCASE
              </Button>
              <Button onClick={() => convertCase('lowercase')} variant="outline" size="sm">
                全小写 / lowercase
              </Button>
              <Button onClick={() => convertCase('capitalize')} variant="outline" size="sm">
                首字母大写 / Capitalize
              </Button>
              <Button onClick={() => convertCase('titlecase')} variant="outline" size="sm">
                标题格式 / Title Case
              </Button>
              <Button onClick={() => convertCase('alternating')} variant="outline" size="sm">
                交替大小写 / aLtErNaTiNg
              </Button>
              <Button onClick={() => convertCase('inverse')} variant="outline" size="sm">
                反转大小写 / InVeRsE
              </Button>
              <Button onClick={() => convertCase('snake_case')} variant="outline" size="sm">
                蛇形命名 / snake_case
              </Button>
              <Button onClick={() => convertCase('kebab-case')} variant="outline" size="sm">
                短横线命名 / kebab-case
              </Button>
              <Button onClick={() => convertCase('camelCase')} variant="outline" size="sm">
                驼峰命名 / camelCase
              </Button>
              <Button onClick={() => convertCase('PascalCase')} variant="outline" size="sm">
                帕斯卡命名 / PascalCase
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>转换结果 / Converted Text</CardTitle>
            <CardDescription>
              转换后的文本结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="转换结果将显示在这里..."
                value={outputText}
                readOnly
                className="min-h-[150px] resize-none"
              />
              <div className="flex gap-3">
                <Button onClick={copyToClipboard} disabled={!outputText}>
                  复制结果 / Copy Result
                </Button>
                <Button onClick={clearAll} variant="outline">
                  清空所有 / Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 