/**
 * Application constants
 * 应用常量配置
 */

export const APP_CONFIG = {
  name: '小迪的工具箱',
  nameEn: 'Xiao D Toolbox',
  description: '40款实用小工具，提升开发效率',
  descriptionEn: '40 practical tools to boost development efficiency',
  author: '小迪',
  version: '1.0.0'
};

export const THEME_CONFIG = {
  light: 'light',
  dark: 'dark',
  system: 'system'
};

export const LOCAL_STORAGE_KEYS = {
  theme: 'toolbox-theme',
  language: 'toolbox-language',
  toolHistory: 'toolbox-history'
};

export const SUPPORTED_LANGUAGES = [
  { code: 'zh', name: '中文', nameEn: 'Chinese' },
  { code: 'en', name: 'English', nameEn: 'English' }
];

export const DEFAULT_LANGUAGE = 'zh'; 