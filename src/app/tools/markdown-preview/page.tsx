/**
 * Markdown preview tool
 * Markdown预览工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'markdown-preview')!;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(`# Markdown 预览工具

## 功能特性

- **实时预览** - 输入即时显示效果
- **语法高亮** - 支持代码块语法高亮
- **表格支持** - 完整的表格渲染
- **数学公式** - 支持 LaTeX 数学公式

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 表格示例

| 功能 | 支持 | 说明 |
|------|------|------|
| 标题 | ✅ | 支持 1-6 级标题 |
| 列表 | ✅ | 有序和无序列表 |
| 链接 | ✅ | 内联和引用链接 |
| 图片 | ✅ | 图片和图片链接 |

## 数学公式

行内公式：$E = mc^2$

块级公式：
$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$

> 这是一个引用块示例

---

*斜体文本* 和 **粗体文本**
`);

  // Simple markdown to HTML converter
  // 简单的Markdown转HTML转换器
  const convertMarkdownToHtml = (md: string) => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Code blocks - using a simpler approach
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
      return '<pre><code class="language-' + (lang || '') + '">' + code + '</code></pre>';
    });
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto" />');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');

    // 包裹列表
    // 由于 /s 标志在低版本 TypeScript/JS 不支持，改用非贪婪匹配和多行模式
    // 先处理连续的 <li> 标签为 <ul>
    html = html.replace(/((?:<li>.*?<\/li>\s*)+)/gm, '<ul>$1</ul>');

    // 段落处理
    html = html.replace(/\n{2,}/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><br><\/p>/g, '');

    return html;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
  };

  const clearMarkdown = () => {
    setMarkdown("");
  };

  const loadExample = () => {
    setMarkdown(`# 欢迎使用 Markdown 预览工具

## 基本语法

### 1. 标题
使用 # 符号创建标题：
- # 一级标题
- ## 二级标题  
- ### 三级标题

### 2. 文本格式
- **粗体文本** 使用 \`**文本**\`
- *斜体文本* 使用 \`*文本*\`
- \`行内代码\` 使用反引号

### 3. 列表
无序列表：
- 项目 1
- 项目 2
- 项目 3

有序列表：
1. 第一项
2. 第二项
3. 第三项

### 4. 链接和图片
[链接文本](https://example.com)
![图片描述](https://via.placeholder.com/300x200)

### 5. 代码块
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### 6. 引用
> 这是一个引用块
> 可以包含多行内容

### 7. 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

---
*享受使用 Markdown！*`);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Markdown 编辑器 / Markdown Editor</CardTitle>
            <CardDescription>
              在左侧输入 Markdown 内容，右侧实时预览效果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-4">
              <Button onClick={loadExample} variant="outline" size="sm">
                加载示例 / Load Example
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                复制内容 / Copy Content
              </Button>
              <Button onClick={clearMarkdown} variant="outline" size="sm">
                清空内容 / Clear Content
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">Markdown 输入 / Markdown Input</div>
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="在此输入 Markdown 内容..."
                  className="min-h-[500px] resize-none font-mono text-sm"
                />
              </div>
              <div>
                <div className="text-sm font-medium mb-2">HTML 预览 / HTML Preview</div>
                <div 
                  className="min-h-[500px] p-4 border rounded-md bg-background overflow-auto prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Markdown 语法参考 / Markdown Syntax Reference</CardTitle>
            <CardDescription>
              常用 Markdown 语法速查
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">标题 / Headers</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div># 一级标题</div>
                    <div>## 二级标题</div>
                    <div>### 三级标题</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">文本格式 / Text Formatting</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>**粗体文本**</div>
                    <div>*斜体文本*</div>
                    <div>`行内代码`</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">列表 / Lists</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>- 无序列表项</div>
                    <div>1. 有序列表项</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">链接和图片 / Links & Images</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>[链接文本](URL)</div>
                    <div>![图片描述](图片URL)</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">代码块 / Code Blocks</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>```javascript</div>
                    <div>代码内容</div>
                    <div>```</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">其他 / Others</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>&gt; 引用块</div>
                    <div>--- 分割线</div>
                    <div>| 表格 | 内容 |</div>
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