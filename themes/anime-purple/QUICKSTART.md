# Anime Purple Theme - 快速开始指南

欢迎使用 Anime Purple 主题！本指南将帮助您快速上手。

## 📋 前置要求

- Node.js >= 12.0
- Hexo >= 5.0.0
- npm 或 yarn

## 🚀 快速安装

### 步骤 1: 克隆或下载主题

```bash
# 方式 A: 克隆 Git 仓库（推荐）
git clone https://github.com/yourusername/hexo-theme-anime-purple.git themes/anime-purple

# 方式 B: 下载 ZIP 并解压到 themes/anime-purple
```

### 步骤 2: 配置 Hexo

编辑项目根目录的 `_config.yml`：

```yaml
# 设置主题
theme: anime-purple

# 设置语言
language: zh-CN

# 其他基本配置
title: 我的博客
subtitle: 欢迎访问
description: 一个优雅的博客
author: 您的名字
```

### 步骤 3: 配置主题

编辑 `themes/anime-purple/_config.yml`：

```yaml
# 菜单配置
menu:
  Home: /
  Categories: /categories/
  Tags: /tags/
  Archives: /archives/
  About: /about/

# 社交链接
social:
  github: https://github.com/yourname
  weibo: https://weibo.com/yourname

# Hero 背景（可选）
hero_bg: /images/hero-bg.jpg

# 主题色（可选）
colors:
  primary: "#D8C7E9"
  primary_dark: "#6B5B95"
  primary_light: "#E8DDF5"
```

### 步骤 4: 添加动漫背景图

1. 在 `source/images/` 目录下放置您的背景图片
2. 将图片命名为 `hero-bg.jpg` 或 `hero-bg.png`
3. 在主题配置中设置路径：`hero_bg: /images/hero-bg.jpg`

推荐图片规格：
- 分辨率：1920×1080 或更高
- 格式：JPG 或 PNG
- 大小：< 2MB

### 步骤 5: 清除缓存并生成

```bash
# 清除 Hexo 缓存
hexo clean

# 生成静态文件
hexo generate

# 启动本地服务器
hexo server
```

访问 `http://localhost:4000` 预览您的博客！

## 📝 创建第一篇文章

```bash
# 创建新文章
hexo new '我的第一篇文章'
```

编辑 `source/_posts/我的第一篇文章.md`：

```markdown
---
title: 我的第一篇文章
date: 2025-01-15 10:30:00
categories:
  - 生活
tags:
  - Hexo
  - 主题
excerpt: 这是一篇文章摘要
cover: /images/post-cover.jpg
---

# 欢迎

这是您的第一篇博客文章！

## 内容

开始写您的内容...

### 子标题

更多内容...
```

## ⚙️ 常用配置

### 启用深色模式

```yaml
# themes/anime-purple/_config.yml
enable_dark_mode: true
```

### 启用评论系统（Disqus）

```bash
# 1. 在 Disqus 官网创建账户和站点
# 2. 在主题配置中添加：

enable_comments: true
comment_system: disqus
disqus_shortname: your-disqus-shortname
```

### 启用搜索功能

```bash
# 安装搜索插件
npm install hexo-generator-search --save

# 在 Hexo _config.yml 中添加
search:
  path: search.xml
  field: post
```

### 自定义社交链接

```yaml
social:
  github: https://github.com/yourname
  twitter: https://twitter.com/yourname
  weibo: https://weibo.com/yourname
  email: your-email@example.com
```

## 🎨 自定义样式

### 修改色系

在 `source/css/variables.css` 中修改 CSS 变量：

```css
:root {
    --color-primary: #D8C7E9;        /* 淡紫色 */
    --color-primary-dark: #6B5B95;   /* 深紫色 */
    --color-primary-light: #E8DDF5;  /* 浅紫色 */
    --color-accent: #FF6B9D;         /* 强调色 */
}
```

### 修改字体

在 `_config.yml` 中配置：

```yaml
font:
  base: "'Noto Sans SC', sans-serif"
  heading: "'Poppins', sans-serif"
  mono: "'Courier New', monospace"
```

### 自定义主页文案

在 `_config.yml` 中设置：

```yaml
hero_subtitle: 您的自定义文案
```

## 🐛 常见问题

### Q: 图片不显示？
**A:** 确保图片路径正确，放在 `source/` 目录下，使用 `/images/filename` 格式引用。

### Q: 菜单不能点击？
**A:** 确保对应的页面已创建。例如，要访问分类页面，需要运行：
```bash
hexo new page categories
```

### Q: 评论不显示？
**A:** 
1. 确认启用了评论系统
2. 配置正确的 Disqus shortname
3. 运行 `hexo clean && hexo generate`

### Q: 搜索功能不工作？
**A:** 
1. 安装了搜索插件
2. 运行了 `hexo generate`
3. 在浏览器控制台检查是否有错误

### Q: 移动端菜单不工作？
**A:** 
1. 清除浏览器缓存
2. 在浏览器开发者工具中检查 JavaScript 错误
3. 检查是否加载了 `script.js` 文件

## 📱 必需的页面

创建以下页面以获得完整功能：

```bash
# 创建分类页面
hexo new page categories

# 创建标签页面
hexo new page tags

# 创建归档页面
hexo new page archives

# 创建关于页面
hexo new page about
```

编辑这些页面的 markdown 文件，添加对应的 layout：

```markdown
---
title: 分类
layout: category
---
```

## 📦 部署

### 部署到 GitHub Pages

```bash
# 1. 安装部署插件
npm install hexo-deployer-git --save

# 2. 在 _config.yml 中配置
deploy:
  type: git
  repo: https://github.com/username/username.github.io
  branch: main

# 3. 部署
hexo deploy
```

### 部署到其他平台

参考 [Hexo 官方部署指南](https://hexo.io/zh-cn/docs/deployment)

## 🔗 有用的资源

- [Hexo 官方文档](https://hexo.io)
- [Markdown 语法](https://markdown.com.cn/)
- [Font Awesome 图标库](https://fontawesome.com/)
- [EJS 模板文档](https://ejs.co/)

## 📞 获取帮助

- GitHub Issues: https://github.com/yourusername/hexo-theme-anime-purple/issues
- Hexo 论坛: https://github.com/hexojs/hexo/discussions
- 主题作者: your-email@example.com

## ✨ 下一步

1. ✅ 安装并配置主题
2. ✅ 创建第一篇文章
3. 📦 自定义样式和配置
4. 🚀 部署到在线平台
5. 📝 持续撰写内容

祝您使用愉快！💜

---

**更新日志:**
- v1.0.0 - 初始版本发布
