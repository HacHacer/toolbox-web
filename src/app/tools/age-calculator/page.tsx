/**
 * Age calculator tool
 * 年龄计算器工具
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'age-calculator')!;

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);

  // Calculate age
  // 计算年龄
  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();
    
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return;

    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate years, months, days
    // 计算年、月、日
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const result: AgeResult = {
      years,
      months,
      days,
      totalDays: diffDays,
      totalHours: diffDays * 24,
      totalMinutes: diffDays * 24 * 60,
      totalSeconds: diffDays * 24 * 60 * 60
    };

    setAgeResult(result);
  };

  const setCurrentDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setTargetDate(today);
  };

  const clearAll = () => {
    setBirthDate("");
    setTargetDate("");
    setAgeResult(null);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>生日信息 / Birth Information</CardTitle>
            <CardDescription>
              输入生日和计算日期
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="birth-date">生日 / Birth Date</Label>
                <Input
                  id="birth-date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="target-date">计算日期 / Target Date</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="target-date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                  <Button onClick={setCurrentDate} variant="outline" size="sm">
                    今天 / Today
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button onClick={calculateAge} disabled={!birthDate}>
                计算年龄 / Calculate Age
              </Button>
              <Button onClick={clearAll} variant="outline">
                清空 / Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {ageResult && (
          <Card>
            <CardHeader>
              <CardTitle>计算结果 / Calculation Result</CardTitle>
              <CardDescription>
                详细的年龄计算结果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {ageResult.years} 岁 {ageResult.months} 个月 {ageResult.days} 天
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {ageResult.years} years {ageResult.months} months {ageResult.days} days
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatNumber(ageResult.totalDays)}</div>
                    <div className="text-sm text-muted-foreground">总天数 / Total Days</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatNumber(ageResult.totalHours)}</div>
                    <div className="text-sm text-muted-foreground">总小时 / Total Hours</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatNumber(ageResult.totalMinutes)}</div>
                    <div className="text-sm text-muted-foreground">总分钟 / Total Minutes</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatNumber(ageResult.totalSeconds)}</div>
                    <div className="text-sm text-muted-foreground">总秒数 / Total Seconds</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">年数 / Years</div>
                    <div className="text-2xl font-bold">{ageResult.years}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">月数 / Months</div>
                    <div className="text-2xl font-bold">{ageResult.months}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium mb-2">天数 / Days</div>
                    <div className="text-2xl font-bold">{ageResult.days}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>年龄阶段参考 / Age Stage Reference</CardTitle>
            <CardDescription>
              不同年龄阶段的分类
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">0-2岁</Badge>
                  <span>婴儿期 / Infancy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">3-5岁</Badge>
                  <span>幼儿期 / Early Childhood</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">6-12岁</Badge>
                  <span>儿童期 / Childhood</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">13-17岁</Badge>
                  <span>青少年期 / Adolescence</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">18-25岁</Badge>
                  <span>青年期 / Young Adulthood</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">26-64岁</Badge>
                  <span>成年期 / Adulthood</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">65-74岁</Badge>
                  <span>老年早期 / Early Elderly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">75岁以上</Badge>
                  <span>老年期 / Elderly</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 