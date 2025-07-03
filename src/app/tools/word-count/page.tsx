/**
 * Word count tool
 * 字数统计工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'word-count')!;

export default function WordCountPage() {
  const [text, setText] = useState("");

  // Calculate statistics
  // 计算统计信息
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>输入文本 / Input Text</CardTitle>
            <CardDescription>
              在下方输入框中粘贴或输入要统计的文本
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="在此输入或粘贴文本..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>统计结果 / Statistics</CardTitle>
            <CardDescription>
              实时统计文本的各项指标
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.characters}</div>
                <div className="text-sm text-muted-foreground">字符数 / Characters</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
                <div className="text-sm text-muted-foreground">字符数(不含空格) / Characters (no spaces)</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.words}</div>
                <div className="text-sm text-muted-foreground">单词数 / Words</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.lines}</div>
                <div className="text-sm text-muted-foreground">行数 / Lines</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
                <div className="text-sm text-muted-foreground">段落数 / Paragraphs</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
                <div className="text-sm text-muted-foreground">句子数 / Sentences</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 