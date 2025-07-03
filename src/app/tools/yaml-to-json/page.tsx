/**
 * YAML↔JSON 格式互转工具
 * YAML↔JSON Converter Tool
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

// 仅用到yaml库的parse和stringify
import yaml from 'js-yaml';

const tool = tools.find(t => t.id === 'yaml-to-json')!;

export default function YamlToJsonPage() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const [error, setError] = useState("");

  // YAML → JSON
  const handleYamlToJson = () => {
    try {
      const obj = yaml.load(yamlInput);
      const json = JSON.stringify(obj, null, 2);
      setJsonOutput(json);
      setError("");
    } catch (e) {
      setError("YAML 解析失败 / YAML parse error");
      setJsonOutput("");
    }
  };

  // JSON → YAML
  const handleJsonToYaml = () => {
    try {
      const obj = JSON.parse(jsonInput);
      const yml = yaml.dump(obj);
      setYamlOutput(yml);
      setError("");
    } catch (e) {
      setError("JSON 解析失败 / JSON parse error");
      setYamlOutput("");
    }
  };

  const clearAll = () => {
    setYamlInput("");
    setJsonInput("");
    setJsonOutput("");
    setYamlOutput("");
    setError("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>YAML → JSON</CardTitle>
            <CardDescription>将 YAML 文本转换为 JSON 格式</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={yamlInput}
              onChange={e => setYamlInput(e.target.value)}
              placeholder="输入 YAML..."
              className="min-h-[120px] font-mono"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={handleYamlToJson} disabled={!yamlInput.trim()}>转换 / Convert</Button>
              <Button onClick={clearAll} variant="outline">清空 / Clear</Button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {jsonOutput && (
              <Textarea
                value={jsonOutput}
                readOnly
                className="min-h-[120px] mt-2 font-mono bg-muted"
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>JSON → YAML</CardTitle>
            <CardDescription>将 JSON 文本转换为 YAML 格式</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="输入 JSON..."
              className="min-h-[120px] font-mono"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={handleJsonToYaml} disabled={!jsonInput.trim()}>转换 / Convert</Button>
              <Button onClick={clearAll} variant="outline">清空 / Clear</Button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {yamlOutput && (
              <Textarea
                value={yamlOutput}
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