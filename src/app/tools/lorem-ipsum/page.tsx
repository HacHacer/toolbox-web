/**
 * Lorem ipsum generator tool
 * 假文生成工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'lorem-ipsum')!;

export default function LoremIpsumPage() {
  const [generatedText, setGeneratedText] = useState("");
  const [options, setOptions] = useState({
    paragraphs: 3,
    sentences: 5,
    words: 20,
    startWithLorem: true,
    includeHTML: false
  });

  // Lorem ipsum text snippets
  // Lorem ipsum文本片段
  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
    "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est",
    "laborum", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim"
  ];

  // Generate random words
  // 生成随机单词
  const getRandomWords = (count: number) => {
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words;
  };

  // Generate a sentence
  // 生成一个句子
  const generateSentence = (wordCount: number) => {
    const words = getRandomWords(wordCount);
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  // Generate a paragraph
  // 生成一个段落
  const generateParagraph = (sentenceCount: number, wordsPerSentence: number) => {
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence(wordsPerSentence));
    }
    return sentences.join(' ');
  };

  // Generate lorem ipsum text
  // 生成lorem ipsum文本
  const generateLoremIpsum = () => {
    let result = "";
    
    if (options.startWithLorem) {
      result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
    }

    const paragraphs = [];
    for (let i = 0; i < options.paragraphs; i++) {
      const paragraph = generateParagraph(options.sentences, options.words);
      paragraphs.push(paragraph);
    }

    result += paragraphs.join('\n\n');

    if (options.includeHTML) {
      result = result.split('\n\n').map(p => `<p>${p}</p>`).join('\n');
    }

    setGeneratedText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  const clearText = () => {
    setGeneratedText("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>生成选项 / Generation Options</CardTitle>
            <CardDescription>
              自定义假文生成参数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paragraphs">段落数 / Paragraphs</Label>
                  <Input
                    id="paragraphs"
                    type="number"
                    value={options.paragraphs}
                    onChange={(e) => setOptions({...options, paragraphs: parseInt(e.target.value) || 1})}
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <Label htmlFor="sentences">每段句子数 / Sentences per paragraph</Label>
                  <Input
                    id="sentences"
                    type="number"
                    value={options.sentences}
                    onChange={(e) => setOptions({...options, sentences: parseInt(e.target.value) || 1})}
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <Label htmlFor="words">每句单词数 / Words per sentence</Label>
                  <Input
                    id="words"
                    type="number"
                    value={options.words}
                    onChange={(e) => setOptions({...options, words: parseInt(e.target.value) || 1})}
                    min="1"
                    max="50"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="startWithLorem"
                    checked={options.startWithLorem}
                    onChange={(e) => setOptions({...options, startWithLorem: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="startWithLorem">以"Lorem ipsum"开头 / Start with "Lorem ipsum"</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeHTML"
                    checked={options.includeHTML}
                    onChange={(e) => setOptions({...options, includeHTML: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="includeHTML">包含HTML标签 / Include HTML tags</Label>
                </div>
                <div className="pt-4">
                  <Button onClick={generateLoremIpsum} className="w-full">
                    生成假文 / Generate Lorem Ipsum
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>生成结果 / Generated Text</CardTitle>
            <CardDescription>
              生成的假文内容
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="点击上方按钮生成假文..."
                value={generatedText}
                readOnly
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-3">
                <Button onClick={copyToClipboard} disabled={!generatedText}>
                  复制文本 / Copy Text
                </Button>
                <Button onClick={clearText} variant="outline">
                  清空文本 / Clear Text
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>快速生成 / Quick Generate</CardTitle>
            <CardDescription>
              常用预设选项
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setOptions({...options, paragraphs: 1, sentences: 3, words: 8});
                  generateLoremIpsum();
                }}
              >
                短段落 / Short
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setOptions({...options, paragraphs: 3, sentences: 5, words: 15});
                  generateLoremIpsum();
                }}
              >
                中等 / Medium
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setOptions({...options, paragraphs: 5, sentences: 8, words: 20});
                  generateLoremIpsum();
                }}
              >
                长文本 / Long
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setOptions({...options, paragraphs: 1, sentences: 1, words: 50, includeHTML: true});
                  generateLoremIpsum();
                }}
              >
                HTML格式 / HTML
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 