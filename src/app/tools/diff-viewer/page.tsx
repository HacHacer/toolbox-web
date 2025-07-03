/**
 * 文本差异对比工具
 * Text Diff Tool
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'diff-viewer')!;

// 简单行级diff算法
function diffLines(a: string, b: string) {
  const aLines = a.split(/\r?\n/);
  const bLines = b.split(/\r?\n/);
  const maxLen = Math.max(aLines.length, bLines.length);
  const result: { type: 'same' | 'add' | 'remove', text: string }[] = [];
  for (let i = 0; i < maxLen; i++) {
    if (aLines[i] === bLines[i]) {
      if (aLines[i] !== undefined) result.push({ type: 'same', text: aLines[i] });
    } else {
      if (aLines[i] !== undefined) result.push({ type: 'remove', text: aLines[i] });
      if (bLines[i] !== undefined) result.push({ type: 'add', text: bLines[i] });
    }
  }
  return result;
}

export default function DiffViewerPage() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<{ type: 'same' | 'add' | 'remove', text: string }[]>([]);

  const handleDiff = () => {
    setDiff(diffLines(textA, textB));
  };

  const clearAll = () => {
    setTextA("");
    setTextB("");
    setDiff([]);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>文本对比 / Text Diff</CardTitle>
            <CardDescription>输入两段文本，查看差异</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                value={textA}
                onChange={e => setTextA(e.target.value)}
                placeholder="原始文本 / Original Text..."
                className="min-h-[120px] font-mono"
              />
              <Textarea
                value={textB}
                onChange={e => setTextB(e.target.value)}
                placeholder="对比文本 / Compared Text..."
                className="min-h-[120px] font-mono"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button onClick={handleDiff} disabled={!textA && !textB}>对比 / Compare</Button>
              <Button onClick={clearAll} variant="outline">清空 / Clear</Button>
            </div>
          </CardContent>
        </Card>
        {diff.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>差异结果 / Diff Result</CardTitle>
              <CardDescription>高亮显示不同之处</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                {diff.map((d, i) => (
                  <div key={i} className={
                    d.type === 'same' ? '' :
                    d.type === 'add' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' :
                    'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                  }>
                    {d.type === 'add' ? '+ ' : d.type === 'remove' ? '- ' : '  '}{d.text}
                  </div>
                ))}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
} 