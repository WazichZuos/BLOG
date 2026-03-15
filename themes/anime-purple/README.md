# Anime Purple Theme for Hexo

一个极简风格的 Hexo 博客主题，采用淡紫色主色调，融入动漫元素，配备左侧悬浮菜单。

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)
![Hexo](https://img.shields.io/badge/hexo-%3E%3D5.0.0-blue)

## ✨ 特性

- 🎨 **淡紫色主题** - 优雅的紫色配色方案
- 📱 **响应式设计** - 完美兼容桌面、平板和手机
- 🌙 **深色模式** - 自动或手动切换深色/亮色主题
- 🎯 **左侧悬浮菜单** - 展开/收起交互式菜单导航
- 🖼️ **动漫背景支持** - Hero 区域和分类支持背景图
- ⚡ **流畅动画** - 优雅的过渡和加载动画
- 🔍 **搜索功能** - 集成搜索功能（需要配置搜索插件）
- 💬 **评论系统** - 支持 Disqus 和其他评论系统
- 📊 **阅读时间估计** - 自动计算文章阅读时间
- 🏷️ **灵活的分类和标签** - 美观的分类和标签页面

## 📦 安装

### 方式 1: 克隆主题

```bash
git clone https://github.com/yourusername/hexo-theme-anime-purple.git themes/anime-purple
```

### 方式 2: 下载 ZIP

1. 从 GitHub 下载主题 ZIP 文件
2. 解压到 `themes/anime-purple` 目录

## ⚙️ 配置

### 1. 修改 Hexo 全局配置

编辑 Hexo 项目根目录下的 `_config.yml`：

```yaml
# 设置主题
theme: anime-purple

# 其他配置...
language: zh-CN
```

### 2. 配置主题

编辑 `themes/anime-purple/_config.yml`：

```yaml
# 菜单项
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
  twitter: https://twitter.com/yourname

# Hero 背景图（将图片放在 source/images/ 目录）
hero_bg: /images/hero-bg.jpg

# 主题色（可选自定义）
colors:
  primary: "#D8C7E9"
  primary_dark: "#6B5B95"
  primary_light: "#E8DDF5"
```

## 🎨 配色方案

主题使用以下配色方案：

| 用途 | 十六进制 | RGB | 应用 |
|------|--------|-----|------|
| 主色（淡紫） | `#D8C7E9` | 216, 199, 233 | 按钮、标题、强调 |
| 深紫色 | `#6B5B95` | 107, 91, 149 | 菜单、文字、链接 |
| 浅紫色 | `#E8DDF5` | 232, 221, 245 | 背景、卡片 |
| 粉红色 | `#FF6B9D` | 255, 107, 157 | 特殊强调 |
| 背景白 | `#FAFAFA` | 250, 250, 250 | 页面背景 |

## 📄 目录结构

```
hexo-theme-anime-purple/
├── layout/                  # 模板文件
│   ├── layout.ejs          # 主布局
│   ├── index.ejs           # 首页
│   ├── post.ejs            # 文章页
│   ├── category.ejs        # 分类页
│   └── _partials/          # 分部模板
│       ├── menu.ejs        # 菜单
│       └── footer.ejs      # 页脚
├── source/                  # 资源文件
│   ├── css/                # 样式文件
│   │   ├── variables.css   # CSS 变量
│   │   ├── reset.css       # 重置样式
│   │   ├── style.css       # 主样式
│   │   ├── menu.css        # 菜单样式
│   │   └── responsive.css  # 响应式样式
│   ├── js/                 # 脚本文件
│   │   └── script.js       # 主脚本
│   ├── images/             # 图片资源
│   └── fonts/              # 字体文件
├── _config.yml            # 主题配置
├── package.json           # 项目信息
└── README.md              # 本文件
```

## 🚀 功能详解

### 左侧悬浮菜单

菜单默认处于收起状态（60px 宽），点击菜单按钮展开为完整菜单（240px 宽）。

**特性：**
- 展开/收起平滑过渡
- 移动设备上以覆盖层显示
- 活跃页面菜单项高亮显示
- 悬停时显示 Tooltip

### Hero 区域

首页顶部的全屏 Hero 区域：

- 支持背景图片（设置 `hero_bg`）
- 搜索框集成
- 向下滚动箭头提示

### 文章页面

**特性：**
- 美观的文章头部（标题、时间、分类、标签）
- 自动计算阅读时间
- 相关文章推荐
- 代码块语法高亮与复制按钮
- 评论区
- 文章导航（上一篇/下一篇）

### 分类页面

- 分类卡片网格视图
- 选中分类的文章列表
- 按发布日期排序
- 标签快速导航

### 深色模式

- 自动检测系统偏好设置
- 手动切换按钮
- 记住用户选择
- 平滑过渡效果

## 📝 撰写文章

在 `source/_posts/` 目录创建 Markdown 文件：

```markdown
---
title: 文章标题
date: 2025-01-15 10:30:00
categories:
  - 技术
tags:
  - Hexo
  - 主题
cover: /images/cover.jpg
excerpt: 文章摘要
---

文章内容...
```

## 🎯 推荐搜索插件

为了启用搜索功能，安装以下插件之一：

```bash
# 选项 1: JSON 内容生成
npm install hexo-generator-json-content --save

# 选项 2: 本地搜索
npm install hexo-generator-search --save
```

然后在 Hexo `_config.yml` 中配置：

```yaml
search:
  path: search.xml
  field: post
```

## 💬 评论系统

### Disqus

1. 在 [Disqus](https://disqus.com) 注册并创建站点
2. 在主题 `_config.yml` 中配置：

```yaml
enable_comments: true
comment_system: disqus
disqus_shortname: your-disqus-shortname
```

### Gitalk

1. 创建 GitHub OAuth 应用
2. 在主题配置中添加 Gitalk 配置

## 📊 SEO 优化

主题自动生成：
- `sitemap.xml` - 网站地图
- 元标签 - Open Graph 和 Twitter Card
- 结构化数据 - JSON-LD

## 🌐 国际化

主题支持多语言，在 `_config.yml` 中设置：

```yaml
language: zh-CN    # 中文
# language: en      # 英文
# language: ja      # 日文
```

## 🐛 已知问题

- 搜索功能需要额外的 Hexo 插件
- 某些 CDN 在特定地区可能缓慢

## 📚 更多资源

- [Hexo 官网](https://hexo.io)
- [EJS 模板语言](https://ejs.co)
- [CSS 变量文档](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有使用和支持此主题的用户！

---

**需要帮助？** 在 GitHub 上提交 Issue 或联系主题作者。

**享受使用！** 💜
