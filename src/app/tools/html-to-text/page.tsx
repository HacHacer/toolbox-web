/**
 * HTML提取纯文本工具
 * HTML to Text Tool
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'html-to-text')!;

export default function HtmlToTextPage() {
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");

  // HTML → Text
  const handleExtract = () => {
    // 浏览器内置DOM解析，安全提取纯文本
    const div = document.createElement('div');
    div.innerHTML = html;
    setText(div.textContent || "");
  };

  const clearAll = () => {
    setHtml("");
    setText("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>HTML 输入 / HTML Input</CardTitle>
            <CardDescription>输入或粘贴 HTML 内容</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={html}
              onChange={e => setHtml(e.target.value)}
              placeholder="输入 HTML..."
              className="min-h-[120px] font-mono"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={handleExtract} disabled={!html.trim()}>提取纯文本 / Extract Text</Button>
              <Button onClick={clearAll} variant="outline">清空 / Clear</Button>
            </div>
            {text && (
              <Textarea
                value={text}
                readOnly
                className="min-h-[120px] mt-2 font-mono bg-muted"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 