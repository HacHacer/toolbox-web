### System（系统指令）
你是一名 **10 年以上经验** 的全栈工程师兼产品设计师，精通 **TypeScript、React/Next.js、TailwindCSS、shadcn、Vite** 及现代组件架构。  
作为 **Cursor IDE 内的自动化编码代理** 工作：
​
- 可直接访问文件系统，创建 / 编辑 / 删除文件，并执行 **“Install dependencies”** 等操作。  
- 必须在 **一次对话** 内完成全部任务，除非我明确要求暂停。  
- 除非被请求说明，否则始终输出 **有效代码块** 或 **文件树差异**；不要给出纯文字解释。  
- 交付的代码需结构清晰、可运行，并附 **英文 + 简明中文** 注释。
​
---
​
### User（用户指令）
目标：为个人开发者「小迪」打造一个 **纯前端网站**，包含 **40 款小工具**（所有逻辑仅在浏览器端运行，不接入 AI 或后端存储）。
​
#### 技术栈
- **Next.js 15 + TypeScript**  
- **TailwindCSS + shadcn**（支持浅/深色切换）  
- **Vite** Bundler（Next 15 默认）  
- 无任何服务器端或数据库依赖
​
#### UI / UX 要求
- 首页以卡片网格方式列出所有工具，支持响应式与浅/深色切换  
- 每个工具页面需可独立运行，无整页刷新  
- 移动端友好，所有交互均流畅
​
#### 实现要求
- **40 个工具全部实现最小可用功能**，不得留 TODO 占位  
- 组件均使用 **函数式写法**，并附 **JSDoc + 简明中文** 注释  
- 提供统一的 ESLint / Prettier 配置  
- 生成 `README.md`，包含快速启动与贡献指南（中 / EN）
​
#### 交付顺序
1. 输出 **项目文件树差异**（file-tree diff），创建完整目录与 40 个组件文件  
2. 按需分块输出 **全部代码**：核心配置文件、框架文件及 40 个工具组件实现  
3. 自动添加脚本：`npm run dev`、`npm run build`、`npm run lint`  
4. 如输出过长被截断，请在同一会话输入 **`#continue`** 续写，直至全部完成  
5. 生成完毕即视为任务完成；除非我发出新指令，请勿额外解释或提问
​
---
​
#### 📦 40 Tools List（slug | 英文名 | 一句话功能）
​
**文本处理**  
1. `word-count` | Word Count | 实时统计文本字数  
2. `char-case` | Case Converter | 大小写转换  
3. `slugify` | Slug Generator | 生成 URL-slug  
4. `lorem-ipsum` | Lorem Ipsum | 假文生成  
5. `markdown-preview` | Markdown Preview | MD→HTML 预览  
6. `json-pretty` | JSON Formatter | JSON 美化 / 压缩  
7. `yaml-to-json` | YAML→JSON | 格式互转  
8. `html-to-text` | HTML Stripper | 提取纯文本  
9. `regex-tester` | RegEx Tester | 正则实时匹配  
10. `diff-viewer` | Text Diff | 文本差异对比  
​
**颜色 / 设计**  
11. `color-picker` | Color Picker | 取色并复制十六进制  
12. `hex-rgb` | HEX↔RGB | 颜色格式互转  
13. `palette-generator` | Palette Maker | 自动配色  
14. `contrast-checker` | Contrast Checker | 对比度检测  
15. `gradient-maker` | Gradient Maker | CSS 渐变生成  
16. `shadow-generator` | Shadow CSS | 盒阴影调配  
17. `border-radius` | Radius Preview | 圆角可视化  
18. `favicon-generator` | Favicon Maker | 生成多尺寸 ICO  
19. `css-clamp` | CSS Clamp | Fluid size 计算  
20. `tailwind-cheatsheet` | Tailwind Lookup | 类名速查  
​
**图片 / 多媒体**  
21. `image-compress` | Image Compressor | 客户端压缩 JPG/PNG/WebP  
22. `image-resize` | Resize Image | 图像等比缩放  
23. `image-convert` | Format Convert | PNG↔WebP↔JPG  
24. `image-crop` | Crop Image | 裁剪并导出  
25. `exif-viewer` | EXIF Viewer | 查看 / 去除元数据  
26. `svg-minify` | SVG Minifier | 压缩 SVG  
27. `gif-split` | GIF Splitter | GIF 帧拆分  
28. `video-trim` | Video Trim | 浏览器端剪辑  
29. `audio-convert` | Audio Convert | 音频格式转换  
30. `icon-spriter` | SVG Sprite Gen | 生成雪碧图  
​
**日期 / 时间**  
31. `unix-timestamp` | Timestamp↔Date | 时间戳互转  
32. `cron-parser` | Cron Parser | 解析 Cron 表达式  
33. `age-calculator` | Age Calc | 计算年龄  
34. `time-diff` | Time Diff | 日期间隔  
35. `timezone-convert` | TZ Convert | 时区换算  
36. `week-number` | Week No. | ISO 周数  
37. `countdown-timer` | Countdown | 倒计时  
38. `date-add` | Date Plus | 日期加减  
39. `working-days` | Workdays Calc | 工作日计算  
40. `calendar-maker` | Mini Calendar | 生成月历 PNG  
​
---
​
> **执行规则**  
> - 按“交付顺序”完成；如输出过长，使用 `#continue` 续写。  
> - 未收到新指令前，请勿额外解释或提问。
