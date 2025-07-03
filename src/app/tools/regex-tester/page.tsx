/**
 * 正则表达式测试工具
 * RegEx Tester Tool
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'regex-tester')!;

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  // 测试正则表达式
  const handleTest = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result = testText.match(regex) || [];
      setMatches(result);
      setError("");
    } catch (e) {
      setError("正则表达式无效 / Invalid RegExp");
      setMatches([]);
    }
  };

  const clearAll = () => {
    setPattern("");
    setFlags("g");
    setTestText("");
    setMatches([]);
    setError("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>正则表达式 / Pattern</CardTitle>
            <CardDescription>输入正则表达式和标志</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-2">
              <Input
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder="如：\\d+"
                className="font-mono"
              />
              <Input
                value={flags}
                onChange={e => setFlags(e.target.value)}
                placeholder="g"
                className="w-16 font-mono"
                maxLength={4}
              />
              <Button onClick={handleTest} disabled={!pattern}>测试 / Test</Button>
              <Button onClick={clearAll} variant="outline">清空 / Clear</Button>
            </div>
            <Textarea
              value={testText}
              onChange={e => setTestText(e.target.value)}
              placeholder="输入要测试的文本..."
              className="min-h-[120px] font-mono"
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {matches.length > 0 && (
              <div className="mt-2 text-sm">
                <div>匹配结果 / Matches:</div>
                <ul className="list-disc pl-5">
                  {matches.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 