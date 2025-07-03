/**
 * Unix timestamp converter tool
 * 时间戳转换工具
 */

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'unix-timestamp')!;

export default function UnixTimestampPage() {
  const [timestamp, setTimestamp] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  // 每秒更新当前时间
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert timestamp to date
  // 将时间戳转换为日期
  const convertTimestampToDate = () => {
    if (!timestamp.trim()) return;
    
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return;

    // Handle milliseconds vs seconds
    // 处理毫秒和秒
    const date = ts > 9999999999 ? new Date(ts) : new Date(ts * 1000);
    setDateTime(date.toISOString().slice(0, 19).replace('T', ' '));
  };

  // Convert date to timestamp
  // 将日期转换为时间戳
  const convertDateToTimestamp = () => {
    if (!dateTime.trim()) return;
    
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return;

    setTimestamp(Math.floor(date.getTime() / 1000).toString());
  };

  // Get current timestamp
  // 获取当前时间戳
  const getCurrentTimestamp = () => {
    setTimestamp(Math.floor(currentTime.getTime() / 1000).toString());
  };

  // Get current timestamp in milliseconds
  // 获取当前毫秒时间戳
  const getCurrentTimestampMs = () => {
    setTimestamp(currentTime.getTime().toString());
  };

  // Format current time
  // 格式化当前时间
  const formatCurrentTime = () => {
    setDateTime(currentTime.toISOString().slice(0, 19).replace('T', ' '));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const clearAll = () => {
    setTimestamp("");
    setDateTime("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>当前时间 / Current Time</CardTitle>
            <CardDescription>
              实时显示当前时间信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {currentTime.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">本地时间 / Local Time</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(currentTime.getTime() / 1000)}
                </div>
                <div className="text-sm text-muted-foreground">Unix时间戳(秒) / Unix Timestamp (s)</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {currentTime.getTime()}
                </div>
                <div className="text-sm text-muted-foreground">Unix时间戳(毫秒) / Unix Timestamp (ms)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>时间戳转换 / Timestamp Converter</CardTitle>
            <CardDescription>
              在Unix时间戳和日期时间之间转换
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="timestamp">Unix时间戳 / Unix Timestamp</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="timestamp"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                      placeholder="例如: 1640995200"
                    />
                    <Button onClick={convertTimestampToDate} disabled={!timestamp.trim()}>
                      转换 / Convert
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    支持秒和毫秒格式 / Supports seconds and milliseconds
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={getCurrentTimestamp} variant="outline" size="sm">
                    当前秒时间戳 / Current (s)
                  </Button>
                  <Button onClick={getCurrentTimestampMs} variant="outline" size="sm">
                    当前毫秒时间戳 / Current (ms)
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="datetime">日期时间 / Date & Time</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="datetime"
                      type="datetime-local"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                    />
                    <Button onClick={convertDateToTimestamp} disabled={!dateTime.trim()}>
                      转换 / Convert
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={formatCurrentTime} variant="outline" size="sm">
                    当前时间 / Current Time
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>转换结果 / Conversion Result</CardTitle>
            <CardDescription>
              转换后的结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timestamp && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">时间戳 / Timestamp:</div>
                  <div className="font-mono text-lg">{timestamp}</div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(timestamp)}>
                      复制时间戳 / Copy Timestamp
                    </Button>
                  </div>
                </div>
              )}
              
              {dateTime && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">日期时间 / Date & Time:</div>
                  <div className="font-mono text-lg">{dateTime}</div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(dateTime)}>
                      复制日期时间 / Copy DateTime
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button onClick={clearAll} variant="outline">
                  清空所有 / Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常见时间戳 / Common Timestamps</CardTitle>
            <CardDescription>
              一些常用的时间戳参考
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium">Unix纪元 / Unix Epoch</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>1970-01-01 00:00:00 UTC → 0</div>
                  <div>2000-01-01 00:00:00 UTC → 946684800</div>
                  <div>2020-01-01 00:00:00 UTC → 1577836800</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium">重要日期 / Important Dates</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>2024-01-01 00:00:00 UTC → 1704067200</div>
                  <div>2025-01-01 00:00:00 UTC → 1735689600</div>
                  <div>2030-01-01 00:00:00 UTC → 1893456000</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 