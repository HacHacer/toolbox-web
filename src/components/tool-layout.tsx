/**
 * Tool layout component
 * 工具页面布局组件
 */

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tool } from "@/lib/tools-data";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
  language?: 'zh' | 'en';
}

export function ToolLayout({ tool, children, language = 'zh' }: ToolLayoutProps) {
  const name = language === 'zh' ? tool.name : tool.nameEn;
  const description = language === 'zh' ? tool.description : tool.descriptionEn;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                {language === 'zh' ? '首页' : 'Home'}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h1 className="text-lg font-semibold">{name}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 