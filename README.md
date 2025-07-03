# 小迪的工具箱 / Xiao D Toolbox

一个包含40款实用小工具的个人开发者工具箱，所有工具均在浏览器端运行，无需后端服务。

A personal developer toolbox with 40 practical tools, all running client-side without backend services.

## ✨ 特性 / Features

- 🚀 **40款实用工具** - 涵盖文本处理、颜色设计、图片多媒体、日期时间等类别
- 🌙 **深色模式支持** - 支持浅色/深色主题切换
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **纯前端实现** - 所有功能在浏览器端运行，无需服务器
- 🎨 **现代UI设计** - 基于 shadcn/ui 组件库
- 🔧 **TypeScript** - 完整的类型支持

## 🛠️ 技术栈 / Tech Stack

- **框架 / Framework**: Next.js 15 + TypeScript
- **样式 / Styling**: TailwindCSS
- **组件库 / UI Library**: shadcn/ui
- **构建工具 / Bundler**: Vite (Next.js 15 默认)
- **主题 / Theme**: next-themes

## 📦 工具列表 / Tools List

### 文本处理 / Text Processing (10个)
1. **字数统计** - 实时统计文本字数、字符数、行数等
2. **大小写转换** - 支持多种大小写转换格式
3. **URL生成器** - 生成URL友好的slug
4. **假文生成** - 生成Lorem Ipsum占位文本
5. **Markdown预览** - 实时预览Markdown内容
6. **JSON格式化** - JSON美化与压缩
7. **YAML转换器** - YAML与JSON格式互转
8. **HTML提取器** - 从HTML中提取纯文本
9. **正则测试器** - 实时正则表达式测试
10. **文本对比** - 文本差异对比工具

### 颜色设计 / Color & Design (10个)
11. **颜色选择器** - 取色并复制十六进制值
12. **颜色转换器** - HEX、RGB、HSL格式互转
13. **配色生成器** - 自动生成配色方案
14. **对比度检测** - 检测颜色对比度
15. **渐变生成器** - 生成CSS渐变代码
16. **阴影生成器** - 生成CSS阴影效果
17. **圆角预览** - 圆角可视化预览
18. **图标生成器** - 生成多尺寸favicon
19. **CSS Clamp** - 流体尺寸计算器
20. **Tailwind速查** - Tailwind类名快速查询

### 图片多媒体 / Image & Media (10个)
21. **图片压缩** - 客户端图片压缩
22. **图片缩放** - 图像等比缩放
23. **格式转换** - PNG、WebP、JPG格式互转
24. **图片裁剪** - 在线图片裁剪工具
25. **EXIF查看器** - 查看和去除图片元数据
26. **SVG压缩** - SVG文件压缩优化
27. **GIF拆分** - GIF动画帧拆分
28. **视频剪辑** - 浏览器端视频剪辑
29. **音频转换** - 音频格式转换
30. **雪碧图生成** - 生成SVG雪碧图

### 日期时间 / Date & Time (10个)
31. **时间戳转换** - Unix时间戳与日期互转
32. **Cron解析器** - 解析Cron表达式
33. **年龄计算器** - 根据生日计算年龄
34. **时间差计算** - 计算日期间隔
35. **时区转换** - 不同时区时间转换
36. **周数计算** - ISO周数计算
37. **倒计时器** - 创建倒计时工具
38. **日期计算** - 日期加减计算
39. **工作日计算** - 计算工作日数量
40. **日历生成器** - 生成月历图片

## 🚀 快速开始 / Quick Start

### 安装依赖 / Install Dependencies

```bash
npm install
```

### 开发模式 / Development Mode

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本 / Build for Production

```bash
npm run build
```

### 启动生产服务器 / Start Production Server

```bash
npm start
```

### 代码检查 / Lint

```bash
npm run lint
```

## 📁 项目结构 / Project Structure

```
toolbox-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── tools/             # 工具页面
│   │   │   ├── word-count/    # 字数统计
│   │   │   ├── char-case/     # 大小写转换
│   │   │   └── ...            # 其他工具
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # 组件
│   │   ├── ui/               # shadcn/ui 组件
│   │   ├── tool-card.tsx     # 工具卡片
│   │   ├── tool-layout.tsx   # 工具页面布局
│   │   └── theme-toggle.tsx  # 主题切换
│   ├── lib/                  # 工具函数
│   │   ├── tools-data.ts     # 工具数据
│   │   ├── constants.ts      # 常量配置
│   │   └── utils.ts          # 工具函数
│   └── hooks/                # 自定义Hooks
└── public/                   # 静态资源
```

## 🎨 主题支持 / Theme Support

- 🌞 **浅色模式** - 明亮清爽的界面
- 🌙 **深色模式** - 护眼的深色主题
- 💻 **系统设置** - 跟随系统主题自动切换

## 📱 响应式设计 / Responsive Design

- 🖥️ **桌面端** - 完整功能体验
- 📱 **移动端** - 触摸友好的界面
- 📟 **平板端** - 适配中等屏幕

## 🤝 贡献指南 / Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证 / License

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者 / Author

**小迪 / Xiao D**

- 个人开发者工具箱
- 提升开发效率的实用工具集合

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
