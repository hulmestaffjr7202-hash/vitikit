# VitiKit — 部署手册（零成本）

> 目标：10 分钟内让 vitikit 上线公网，费用 ¥0。

## 方案 A：GitHub Pages（推荐，永久免费 + 自定义域名）

1. 在 GitHub 建一个仓库，例如 `yourname/vitikit`（Public）
2. 推送本地代码：

```bash
cd ~/Desktop/vitikit
git remote add origin https://github.com/yourname/vitikit.git
git push -u origin main
```

3. 仓库 → Settings → Pages → Source 选 `main` 分支 `/ (root)` → Save
4. 约 60 秒后上线：`https://yourname.github.io/vitikit/`

### 绑定自己的域名（可选，域名约 ¥60/年 是唯一可选项）
- 仓库根加 `CNAME` 文件内容写你的域名
- DNS 加 CNAME 记录指向 `yourname.github.io`
- Settings → Pages → Custom domain 填入并勾选 Enforce HTTPS

## 方案 B：Netlify Drop（最快，拖拽上传）

1. 打开 https://app.netlify.com/drop
2. 把整个 `vitikit` 文件夹拖进去 → 立即得到 `xxx.netlify.app` URL
3. 免费档含 100GB/月流量，够初期使用

## 方案 C：Cloudflare Pages（全球 CDN 最快）

```bash
npx wrangler pages deploy . --project-name=vitikit
```
免费档无限带宽，静态站完全免费。

## 上线后立即做

- [ ] 提交 sitemap：Google Search Console 添加资源 → 验证 → 提交 `sitemap.xml`
- [ ] Bing Webmaster Tools 同样提交（必应流量对农技词很可观）
- [ ] 注册 Google AdSense（需少量内容+一些流量后过审更容易；先挂占位）
- [ ] 加 Google Analytics 4 或 Plausible 统计

## 后续迭代路线图

| 版本 | 功能 | 目的 |
|---|---|---|
| v1.1 | Open-Meteo API 一键拉取天气数据 | 降低使用门槛（粘性↑）|
| v1.2 | 当地气象站数据自动 GDD（输入坐标）| SEO 抓「XX region GDD」长尾 |
| v2.0 | Pro：喷药记录 PDF 导出 | 变现（$5/月 或 $29/季）|
