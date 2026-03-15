s# 本地一键更新博客说明

这个目录现在已经是本地 Git 仓库，并且已绑定远程仓库：

- `origin = https://github.com/WazichZuos/BLOG.git`

## 以后怎么用

最简单的日常流程只有两步：

1. 把新的 Markdown 稿件放进 `incoming-posts/`
2. 双击 `publish-blog.cmd`

脚本会自动做这些事：

1. 把稿件移动到 `source/_posts/`
2. 自动执行 `git add -A`
3. 自动生成提交信息并提交
4. 自动推送到 GitHub
5. GitHub Actions 自动重新部署博客

你也可以把 `.md` 文件直接拖到 `publish-blog.cmd` 上，效果一样。

## 首次需要确认的事情

### 1. GitHub Pages 发布源

在 GitHub 仓库设置里确认：

`Settings -> Pages -> Source -> GitHub Actions`

### 2. Git 登录状态

第一次推送时，如果 Git 没有登录，会要求你登录 GitHub。

### 3. 远程仓库历史

这个目录是后来初始化成 Git 仓库的。如果 GitHub 上原来的 `BLOG` 仓库已经有提交历史，而本地还是第一次推送，可能会出现“历史不一致，拒绝推送”。

如果出现这种情况，优先用下面这个更稳妥的方法：

1. 重新 `git clone` 你的 GitHub 仓库到一个新目录
2. 把当前目录中的 `source/`、`themes/anime-purple/`、`publish-blog.cmd`、`scripts/` 等内容复制过去
3. 以后只在克隆下来的仓库里双击 `publish-blog.cmd`

## 推荐的稿件格式

建议每篇稿件至少带上 Hexo Front Matter，例如：

```md
---
title: 文章标题
date: 2026-03-14 20:00:00
categories:
  - 生活
tags:
  - 思考
---

这里开始写正文。
```

## 常见问题

### 双击后窗口一闪而过

现在 `publish-blog.cmd` 已经会自动停住，方便你看结果。

### 放了稿件但没有发布

检查稿件是不是 `.md` 或 `.markdown` 文件，并确认它放在 `incoming-posts/` 里，或者是直接拖到了 `publish-blog.cmd` 上。

### 提示不是 Git 仓库

说明你不是在这个博客目录里运行，或者 `.git/` 被删掉了。

### 推送失败

常见原因：

1. 没联网
2. GitHub 未登录
3. 远程仓库已有历史，本地还没同步

## 手动命令版

如果你不想双击，也可以在终端里运行：

```powershell
npm run publish -- 更新博客内容
```

或者：

```powershell
node scripts/import-and-publish.mjs
```