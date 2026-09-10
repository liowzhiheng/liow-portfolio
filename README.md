# Portfolio（公开站）＋本地内容编辑器

此仓库刻意将公开作品集与编辑功能隔离：GitHub Pages **只会发布根目录的 Angular Portfolio**。本地编辑器位于 `editor/`，不被公开站构建或部署工作流引用，因此访客无法下载或访问后台。

## 首次部署公开作品集

1. 将根目录项目推送到 GitHub 的 `main` 分支。
2. GitHub 仓库的 **Settings → Pages** 选择 **GitHub Actions**。
3. Actions 工作流会自动发布。无需在代码中填写仓库名称。

## 日常更新内容（不修改代码）

1. 在自己的电脑、项目根目录运行 `npm run editor`。
2. 打开终端显示的本地网址（通常是 `http://localhost:8080`）。这不是线上网址，不要部署 `editor/`。
3. 修改资料、首页文案、技能、社交链接、经历、项目与排序。草稿会自动保存在当前浏览器。
4. 点击“导出 content.json”。
5. 在 GitHub 网页打开 `public/assets/content.json`，点击编辑，用导出文件的完整内容替换并 Commit。
6. GitHub Actions 完成后，公开站自动更新。

编辑器包含导入 JSON、导出 JSON、自动本地草稿、下载备份、还原初始示例和本地 JSON 预览。它不会直接写入 GitHub，也不会收集任何资料。

## 更新图片和简历

- 将图片上传到 GitHub 的 `public/assets/images/`，在编辑器填入 `assets/images/文件名.jpg`。
- 将 PDF 上传到 `public/assets/`，在编辑器“简历路径”填入 `assets/你的简历.pdf`。
- 图片推荐至少 1200×900，使用 JPG 或 WebP。

## 安全边界

- 访客只会收到公开 Angular 站点资源；其中没有 `/admin` 路由、编辑按钮、编辑器组件或后台脚本。
- `editor/` 仅供本地运行。请不要把它单独部署，也不要把编辑器链接加到公开站。
- 发布权限仍由你的 GitHub 帐号保护；只有拥有仓库写入权限的人才能替换 `content.json`。

## 命令

```bash
npm install
npm start              # 公开站本地预览
npm run editor         # 仅本地内容编辑器
npm run build:pages    # 公开站生产构建
npm run build:editor   # 编辑器语法检查
```

日常你需要替换的公开文件只有 `public/assets/content.json`、`public/assets/images/` 的图片和 `public/assets/` 的简历 PDF。仓库名称不需要改代码。
