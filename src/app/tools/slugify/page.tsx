/**
 * Slug generator tool
 * URL生成器工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'slugify')!;

export default function SlugifyPage() {
  const [inputText, setInputText] = useState("");
  const [slug, setSlug] = useState("");
  const [options, setOptions] = useState({
    lowercase: true,
    removeSpecialChars: true,
    replaceSpaces: true,
    separator: '-',
    maxLength: 50
  });

  // Generate slug function
  // 生成slug函数
  const generateSlug = () => {
    let result = inputText;

    // Convert to lowercase if option is enabled
    // 如果启用选项则转换为小写
    if (options.lowercase) {
      result = result.toLowerCase();
    }

    // Remove special characters if option is enabled
    // 如果启用选项则移除特殊字符
    if (options.removeSpecialChars) {
      result = result.replace(/[^\w\s-]/g, '');
    }

    // Replace spaces with separator
    // 用分隔符替换空格
    if (options.replaceSpaces) {
      result = result.replace(/\s+/g, options.separator);
    }

    // Remove consecutive separators
    // 移除连续的分隔符
    result = result.replace(new RegExp(`${options.separator}+`, 'g'), options.separator);

    // Remove leading and trailing separators
    // 移除开头和结尾的分隔符
    result = result.replace(new RegExp(`^${options.separator}+|${options.separator}+$`, 'g'), '');

    // Limit length if specified
    // 如果指定则限制长度
    if (options.maxLength > 0 && result.length > options.maxLength) {
      result = result.substring(0, options.maxLength);
      // Remove trailing separator after truncation
      // 截断后移除结尾分隔符
      result = result.replace(new RegExp(`${options.separator}+$`, 'g'), '');
    }

    setSlug(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
  };

  const clearAll = () => {
    setInputText("");
    setSlug("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>输入文本 / Input Text</CardTitle>
            <CardDescription>
              输入要转换为URL友好的文本
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="例如：Hello World! This is a test..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="text-lg"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>生成选项 / Generation Options</CardTitle>
            <CardDescription>
              自定义slug生成规则
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="lowercase"
                    checked={options.lowercase}
                    onChange={(e) => setOptions({...options, lowercase: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="lowercase">转换为小写 / Convert to lowercase</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="removeSpecialChars"
                    checked={options.removeSpecialChars}
                    onChange={(e) => setOptions({...options, removeSpecialChars: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="removeSpecialChars">移除特殊字符 / Remove special characters</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="replaceSpaces"
                    checked={options.replaceSpaces}
                    onChange={(e) => setOptions({...options, replaceSpaces: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="replaceSpaces">替换空格 / Replace spaces</label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">分隔符 / Separator</label>
                  <Input
                    value={options.separator}
                    onChange={(e) => setOptions({...options, separator: e.target.value})}
                    className="w-20"
                    maxLength={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">最大长度 / Max Length</label>
                  <Input
                    type="number"
                    value={options.maxLength}
                    onChange={(e) => setOptions({...options, maxLength: parseInt(e.target.value) || 0})}
                    className="w-20"
                    min="0"
                    max="200"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={generateSlug} disabled={!inputText.trim()}>
                生成Slug / Generate Slug
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>生成结果 / Generated Slug</CardTitle>
            <CardDescription>
              URL友好的文本结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slug && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">生成的Slug / Generated Slug:</div>
                  <div className="text-lg font-mono break-all">{slug}</div>
                  <div className="mt-2">
                    <Badge variant="secondary">长度 / Length: {slug.length}</Badge>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <Button onClick={copyToClipboard} disabled={!slug}>
                  复制Slug / Copy Slug
                </Button>
                <Button onClick={clearAll} variant="outline">
                  清空所有 / Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>示例 / Examples</CardTitle>
            <CardDescription>
              常见用例示例
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">文章标题 / Article Title</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>"Hello World! This is a test" → "hello-world-this-is-a-test"</div>
                  <div>"My Awesome Blog Post" → "my-awesome-blog-post"</div>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">文件名 / File Name</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>"My Document.pdf" → "my-document"</div>
                  <div>"Project Report 2024" → "project-report-2024"</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 