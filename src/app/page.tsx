/**
 * Home page
 * 首页
 */

import { ThemeToggle } from "@/components/theme-toggle";
import { ToolCard } from "@/components/tool-card";
import { tools, categories } from "@/lib/tools-data";
import { APP_CONFIG } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{APP_CONFIG.name}</h1>
            <span className="text-sm text-muted-foreground">v{APP_CONFIG.version}</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8 mx-auto">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {APP_CONFIG.description}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            40款实用小工具，涵盖文本处理、颜色设计、图片多媒体、日期时间等类别，
            所有工具均在浏览器端运行，无需后端服务。
          </p>
        </div>

        {/* Tools grid by category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryTools = tools.filter(tool => tool.category === category.id);
            
            return (
              <section key={category.id} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    ({categoryTools.length} 工具)
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 {APP_CONFIG.author}. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js, TypeScript, TailwindCSS and shadcn/ui
          </p>
        </footer>
      </main>
    </div>
  );
}
