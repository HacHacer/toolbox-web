/**
 * Tools data configuration
 * 工具数据配置
 */

export interface Tool {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: 'text' | 'design' | 'media' | 'time';
  icon: string;
  path: string;
}

export const tools: Tool[] = [
  // 文本处理
  {
    id: 'word-count',
    name: '字数统计',
    nameEn: 'Word Count',
    description: '实时统计文本字数',
    descriptionEn: 'Real-time text word count',
    category: 'text',
    icon: '📝',
    path: '/tools/word-count'
  },
  {
    id: 'char-case',
    name: '大小写转换',
    nameEn: 'Case Converter',
    description: '大小写转换',
    descriptionEn: 'Convert text case',
    category: 'text',
    icon: '🔄',
    path: '/tools/char-case'
  },
  {
    id: 'slugify',
    name: 'URL生成器',
    nameEn: 'Slug Generator',
    description: '生成 URL-slug',
    descriptionEn: 'Generate URL-friendly slugs',
    category: 'text',
    icon: '🔗',
    path: '/tools/slugify'
  },
  {
    id: 'lorem-ipsum',
    name: '假文生成',
    nameEn: 'Lorem Ipsum',
    description: '假文生成',
    descriptionEn: 'Generate placeholder text',
    category: 'text',
    icon: '📄',
    path: '/tools/lorem-ipsum'
  },
  {
    id: 'markdown-preview',
    name: 'Markdown预览',
    nameEn: 'Markdown Preview',
    description: 'MD→HTML 预览',
    descriptionEn: 'Markdown to HTML preview',
    category: 'text',
    icon: '📖',
    path: '/tools/markdown-preview'
  },
  {
    id: 'json-pretty',
    name: 'JSON格式化',
    nameEn: 'JSON Formatter',
    description: 'JSON 美化 / 压缩',
    descriptionEn: 'Format and minify JSON',
    category: 'text',
    icon: '📋',
    path: '/tools/json-pretty'
  },
  {
    id: 'yaml-to-json',
    name: 'YAML转换器',
    nameEn: 'YAML→JSON',
    description: '格式互转',
    descriptionEn: 'Convert between YAML and JSON',
    category: 'text',
    icon: '⚙️',
    path: '/tools/yaml-to-json'
  },
  {
    id: 'html-to-text',
    name: 'HTML提取器',
    nameEn: 'HTML Stripper',
    description: '提取纯文本',
    descriptionEn: 'Extract plain text from HTML',
    category: 'text',
    icon: '🧹',
    path: '/tools/html-to-text'
  },
  {
    id: 'regex-tester',
    name: '正则测试器',
    nameEn: 'RegEx Tester',
    description: '正则实时匹配',
    descriptionEn: 'Real-time regex testing',
    category: 'text',
    icon: '🔍',
    path: '/tools/regex-tester'
  },
  {
    id: 'diff-viewer',
    name: '文本对比',
    nameEn: 'Text Diff',
    description: '文本差异对比',
    descriptionEn: 'Compare text differences',
    category: 'text',
    icon: '📊',
    path: '/tools/diff-viewer'
  },

  // 颜色/设计
  {
    id: 'color-picker',
    name: '颜色选择器',
    nameEn: 'Color Picker',
    description: '取色并复制十六进制',
    descriptionEn: 'Pick colors and copy hex values',
    category: 'design',
    icon: '🎨',
    path: '/tools/color-picker'
  },
  {
    id: 'hex-rgb',
    name: '颜色转换器',
    nameEn: 'HEX↔RGB',
    description: '颜色格式互转',
    descriptionEn: 'Convert between color formats',
    category: 'design',
    icon: '🌈',
    path: '/tools/hex-rgb'
  },
  {
    id: 'palette-generator',
    name: '配色生成器',
    nameEn: 'Palette Maker',
    description: '自动配色',
    descriptionEn: 'Generate color palettes',
    category: 'design',
    icon: '🎯',
    path: '/tools/palette-generator'
  },
  {
    id: 'contrast-checker',
    name: '对比度检测',
    nameEn: 'Contrast Checker',
    description: '对比度检测',
    descriptionEn: 'Check color contrast ratios',
    category: 'design',
    icon: '👁️',
    path: '/tools/contrast-checker'
  },
  {
    id: 'gradient-maker',
    name: '渐变生成器',
    nameEn: 'Gradient Maker',
    description: 'CSS 渐变生成',
    descriptionEn: 'Generate CSS gradients',
    category: 'design',
    icon: '🌅',
    path: '/tools/gradient-maker'
  },
  {
    id: 'shadow-generator',
    name: '阴影生成器',
    nameEn: 'Shadow CSS',
    description: '盒阴影调配',
    descriptionEn: 'Generate box shadows',
    category: 'design',
    icon: '👤',
    path: '/tools/shadow-generator'
  },
  {
    id: 'border-radius',
    name: '圆角预览',
    nameEn: 'Radius Preview',
    description: '圆角可视化',
    descriptionEn: 'Visualize border radius',
    category: 'design',
    icon: '⭕',
    path: '/tools/border-radius'
  },
  {
    id: 'favicon-generator',
    name: '图标生成器',
    nameEn: 'Favicon Maker',
    description: '生成多尺寸 ICO',
    descriptionEn: 'Generate multi-size favicons',
    category: 'design',
    icon: '🖼️',
    path: '/tools/favicon-generator'
  },
  {
    id: 'css-clamp',
    name: 'CSS Clamp',
    nameEn: 'CSS Clamp',
    description: 'Fluid size 计算',
    descriptionEn: 'Calculate fluid sizes',
    category: 'design',
    icon: '📏',
    path: '/tools/css-clamp'
  },
  {
    id: 'tailwind-cheatsheet',
    name: 'Tailwind速查',
    nameEn: 'Tailwind Lookup',
    description: '类名速查',
    descriptionEn: 'Quick Tailwind class reference',
    category: 'design',
    icon: '⚡',
    path: '/tools/tailwind-cheatsheet'
  },

  // 图片/多媒体
  {
    id: 'image-compress',
    name: '图片压缩',
    nameEn: 'Image Compressor',
    description: '客户端压缩 JPG/PNG/WebP',
    descriptionEn: 'Client-side image compression',
    category: 'media',
    icon: '🗜️',
    path: '/tools/image-compress'
  },
  {
    id: 'image-resize',
    name: '图片缩放',
    nameEn: 'Resize Image',
    description: '图像等比缩放',
    descriptionEn: 'Resize images proportionally',
    category: 'media',
    icon: '📐',
    path: '/tools/image-resize'
  },
  {
    id: 'image-convert',
    name: '格式转换',
    nameEn: 'Format Convert',
    description: 'PNG↔WebP↔JPG',
    descriptionEn: 'Convert between image formats',
    category: 'media',
    icon: '🔄',
    path: '/tools/image-convert'
  },
  {
    id: 'image-crop',
    name: '图片裁剪',
    nameEn: 'Crop Image',
    description: '裁剪并导出',
    descriptionEn: 'Crop and export images',
    category: 'media',
    icon: '✂️',
    path: '/tools/image-crop'
  },
  {
    id: 'exif-viewer',
    name: 'EXIF查看器',
    nameEn: 'EXIF Viewer',
    description: '查看 / 去除元数据',
    descriptionEn: 'View and remove EXIF data',
    category: 'media',
    icon: '📷',
    path: '/tools/exif-viewer'
  },
  {
    id: 'svg-minify',
    name: 'SVG压缩',
    nameEn: 'SVG Minifier',
    description: '压缩 SVG',
    descriptionEn: 'Minify SVG files',
    category: 'media',
    icon: '📉',
    path: '/tools/svg-minify'
  },
  {
    id: 'gif-split',
    name: 'GIF拆分',
    nameEn: 'GIF Splitter',
    description: 'GIF 帧拆分',
    descriptionEn: 'Split GIF into frames',
    category: 'media',
    icon: '🎬',
    path: '/tools/gif-split'
  },
  {
    id: 'video-trim',
    name: '视频剪辑',
    nameEn: 'Video Trim',
    description: '浏览器端剪辑',
    descriptionEn: 'Browser-based video trimming',
    category: 'media',
    icon: '🎥',
    path: '/tools/video-trim'
  },
  {
    id: 'audio-convert',
    name: '音频转换',
    nameEn: 'Audio Convert',
    description: '音频格式转换',
    descriptionEn: 'Convert audio formats',
    category: 'media',
    icon: '🎵',
    path: '/tools/audio-convert'
  },
  {
    id: 'icon-spriter',
    name: '雪碧图生成',
    nameEn: 'SVG Sprite Gen',
    description: '生成雪碧图',
    descriptionEn: 'Generate SVG sprites',
    category: 'media',
    icon: '🧩',
    path: '/tools/icon-spriter'
  },

  // 日期/时间
  {
    id: 'unix-timestamp',
    name: '时间戳转换',
    nameEn: 'Timestamp↔Date',
    description: '时间戳互转',
    descriptionEn: 'Convert between timestamps and dates',
    category: 'time',
    icon: '⏰',
    path: '/tools/unix-timestamp'
  },
  {
    id: 'cron-parser',
    name: 'Cron解析器',
    nameEn: 'Cron Parser',
    description: '解析 Cron 表达式',
    descriptionEn: 'Parse cron expressions',
    category: 'time',
    icon: '⏱️',
    path: '/tools/cron-parser'
  },
  {
    id: 'age-calculator',
    name: '年龄计算器',
    nameEn: 'Age Calc',
    description: '计算年龄',
    descriptionEn: 'Calculate age from birthdate',
    category: 'time',
    icon: '🎂',
    path: '/tools/age-calculator'
  },
  {
    id: 'time-diff',
    name: '时间差计算',
    nameEn: 'Time Diff',
    description: '日期间隔',
    descriptionEn: 'Calculate time differences',
    category: 'time',
    icon: '📅',
    path: '/tools/time-diff'
  },
  {
    id: 'timezone-convert',
    name: '时区转换',
    nameEn: 'TZ Convert',
    description: '时区换算',
    descriptionEn: 'Convert between timezones',
    category: 'time',
    icon: '🌍',
    path: '/tools/timezone-convert'
  },
  {
    id: 'week-number',
    name: '周数计算',
    nameEn: 'Week No.',
    description: 'ISO 周数',
    descriptionEn: 'Calculate ISO week numbers',
    category: 'time',
    icon: '📊',
    path: '/tools/week-number'
  },
  {
    id: 'countdown-timer',
    name: '倒计时器',
    nameEn: 'Countdown',
    description: '倒计时',
    descriptionEn: 'Create countdown timers',
    category: 'time',
    icon: '⏳',
    path: '/tools/countdown-timer'
  },
  {
    id: 'date-add',
    name: '日期计算',
    nameEn: 'Date Plus',
    description: '日期加减',
    descriptionEn: 'Add or subtract from dates',
    category: 'time',
    icon: '➕',
    path: '/tools/date-add'
  },
  {
    id: 'working-days',
    name: '工作日计算',
    nameEn: 'Workdays Calc',
    description: '工作日计算',
    descriptionEn: 'Calculate working days',
    category: 'time',
    icon: '💼',
    path: '/tools/working-days'
  },
  {
    id: 'calendar-maker',
    name: '日历生成器',
    nameEn: 'Mini Calendar',
    description: '生成月历 PNG',
    descriptionEn: 'Generate monthly calendar PNG',
    category: 'time',
    icon: '📆',
    path: '/tools/calendar-maker'
  }
];

export const categories = [
  { id: 'text', name: '文本处理', nameEn: 'Text Processing', icon: '📝' },
  { id: 'design', name: '颜色设计', nameEn: 'Color & Design', icon: '🎨' },
  { id: 'media', name: '图片多媒体', nameEn: 'Image & Media', icon: '🖼️' },
  { id: 'time', name: '日期时间', nameEn: 'Date & Time', icon: '⏰' }
];

export const getToolsByCategory = (category: string) => {
  return tools.filter(tool => tool.category === category);
}; 