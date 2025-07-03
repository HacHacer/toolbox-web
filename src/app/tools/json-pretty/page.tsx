/**
 * JSON formatter tool
 * JSON格式化工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'json-pretty')!;

export default function JsonPrettyPage() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    size: 0,
    formattedSize: 0,
    compressionRatio: 0
  });

  // Format JSON
  // 格式化JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError("");
      
      const originalSize = inputJson.length;
      const formattedSize = formatted.length;
      const compressionRatio = ((originalSize - formattedSize) / originalSize) * 100;
      
      setStats({
        size: originalSize,
        formattedSize,
        compressionRatio
      });
    } catch {
      setError("无效的JSON格式 / Invalid JSON format");
      setOutputJson("");
    }
  };

  // Minify JSON
  // 压缩JSON
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError("");
      
      const originalSize = inputJson.length;
      const minifiedSize = minified.length;
      const compressionRatio = ((originalSize - minifiedSize) / originalSize) * 100;
      
      setStats({
        size: originalSize,
        formattedSize: minifiedSize,
        compressionRatio
      });
    } catch {
      setError("无效的JSON格式 / Invalid JSON format");
      setOutputJson("");
    }
  };

  // Validate JSON
  // 验证JSON
  const validateJson = () => {
    try {
      JSON.parse(inputJson);
      setError("");
      return true;
    } catch {
      setError("JSON格式错误 / JSON syntax error");
      return false;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputJson);
  };

  const clearAll = () => {
    setInputJson("");
    setOutputJson("");
    setError("");
    setStats({ size: 0, formattedSize: 0, compressionRatio: 0 });
  };

  const loadExample = () => {
    setInputJson(`{
  "name": "小迪的工具箱",
  "version": "1.0.0",
  "description": "40款实用小工具集合",
  "author": {
    "name": "小迪",
    "email": "example@email.com"
  },
  "tools": [
    {
      "id": "word-count",
      "name": "字数统计",
      "category": "text"
    },
    {
      "id": "color-picker", 
      "name": "颜色选择器",
      "category": "design"
    }
  ],
  "features": {
    "responsive": true,
    "darkMode": true,
    "clientSide": true
  }
}`);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON 输入 / JSON Input</CardTitle>
            <CardDescription>
              输入要格式化的JSON数据
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button onClick={loadExample} variant="outline" size="sm">
                  加载示例 / Load Example
                </Button>
                <Button onClick={validateJson} variant="outline" size="sm">
                  验证JSON / Validate JSON
                </Button>
                <Button onClick={clearAll} variant="outline" size="sm">
                  清空所有 / Clear All
                </Button>
              </div>
              
              <Textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="在此输入JSON数据..."
                className="min-h-[300px] resize-none font-mono text-sm"
              />
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>操作选项 / Operations</CardTitle>
            <CardDescription>
              选择JSON处理方式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button onClick={formatJson} disabled={!inputJson.trim()}>
                格式化 / Format JSON
              </Button>
              <Button onClick={minifyJson} disabled={!inputJson.trim()} variant="outline">
                压缩 / Minify JSON
              </Button>
            </div>
          </CardContent>
        </Card>

        {outputJson && (
          <Card>
            <CardHeader>
              <CardTitle>处理结果 / Result</CardTitle>
              <CardDescription>
                处理后的JSON数据
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    原始大小 / Original: {stats.size} 字符
                  </Badge>
                  <Badge variant="secondary">
                    处理后 / Processed: {stats.formattedSize} 字符
                  </Badge>
                  {stats.compressionRatio > 0 && (
                    <Badge variant="outline" className="text-green-600">
                      压缩率 / Compression: {stats.compressionRatio.toFixed(1)}%
                    </Badge>
                  )}
                </div>
                
                <Textarea
                  value={outputJson}
                  readOnly
                  className="min-h-[300px] resize-none font-mono text-sm"
                />
                
                <Button onClick={copyToClipboard}>
                  复制结果 / Copy Result
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>JSON 语法参考 / JSON Syntax Reference</CardTitle>
            <CardDescription>
              JSON格式规范和使用说明
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">数据类型 / Data Types</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>"字符串" / "string"</div>
                    <div>123 / number</div>
                    <div>true / boolean</div>
                    <div>null / null</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">对象 / Objects</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>{'{'} </div>
                    <div>  key: &quot;value&quot;</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">数组 / Arrays</div>
                  <div className="space-y-1 text-muted-foreground font-mono">
                    <div>[</div>
                    <div>  "item1",</div>
                    <div>  "item2"</div>
                    <div>]</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">注意事项 / Notes</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• 键名必须用双引号包围</div>
                    <div>• 字符串值必须用双引号</div>
                    <div>• 不支持注释</div>
                    <div>• 最后一个元素后不能有逗号</div>
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