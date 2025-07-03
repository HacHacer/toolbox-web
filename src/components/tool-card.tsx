/**
 * Tool card component
 * 工具卡片组件
 */

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tool } from "@/lib/tools-data";

interface ToolCardProps {
  tool: Tool;
  language?: 'zh' | 'en';
}

export function ToolCard({ tool, language = 'zh' }: ToolCardProps) {
  const name = language === 'zh' ? tool.name : tool.nameEn;
  const description = language === 'zh' ? tool.description : tool.descriptionEn;

  return (
    <Link href={tool.path} className="block transition-transform hover:scale-105">
      <Card className="h-full cursor-pointer border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
} 