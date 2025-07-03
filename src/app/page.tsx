/**
 * Home page - Bento Grid 风格（优化卡片内容）
 * 首页 Bento Grid
 */

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { tools } from "@/lib/tools-data";
import { APP_CONFIG } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-[#18181c] dark:via-[#232336] dark:to-[#18181c]">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {APP_CONFIG.name}
            </h1>
            <span className="text-xs text-muted-foreground font-mono">v{APP_CONFIG.version}</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto max-w-7xl px-4 py-10">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {APP_CONFIG.description}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            40款实用小工具，涵盖文本处理、颜色设计、图片多媒体、日期时间等类别，
            所有工具均在浏览器端运行，无需后端服务。
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] mx-auto">
          {tools.map((tool, idx) => (
            <Link
              key={tool.id}
              href={tool.path}
              className={`relative group rounded-2xl shadow-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl
                bg-gradient-to-tr ${bentoGradient(idx)} p-6 flex flex-col items-center justify-center overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              tabIndex={0}
              aria-label={tool.name}
            >
              <div className="flex flex-col items-center gap-2 z-20 w-full">
                <span className="text-4xl md:text-5xl drop-shadow-sm mb-2">{tool.icon}</span>
                <span className="font-bold text-lg md:text-xl tracking-tight text-gray-900 dark:text-white text-center">
                  {tool.name}
                </span>
                <span className="text-xs text-muted-foreground text-center line-clamp-2 mb-1">
                  {tool.description}
                </span>
              </div>
              {/* 动效箭头 */}
              <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 dark:text-indigo-300"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </div>
              {/* 背景渐变装饰 */}
              <div className="absolute -z-10 right-0 bottom-0 w-32 h-32 rounded-full blur-2xl opacity-30 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>© 2024 {APP_CONFIG.author}. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js, TypeScript, TailwindCSS and shadcn/ui
          </p>
        </footer>
      </main>
    </div>
  );
}

/**
 * 根据索引返回不同的渐变色，提升Bento Grid多样性
 */
function bentoGradient(idx: number) {
  const gradients = [
    "from-indigo-100 to-purple-50",
    "from-pink-100 to-yellow-50",
    "from-green-100 to-cyan-50",
    "from-orange-100 to-pink-50",
    "from-blue-100 to-indigo-50",
    "from-purple-100 to-pink-50",
    "from-yellow-100 to-orange-50",
    "from-cyan-100 to-blue-50"
  ];
  return gradients[idx % gradients.length];
}
