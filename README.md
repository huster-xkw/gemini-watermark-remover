# AI 水印去除器

一个纯前端、可本地运行的 Gemini 图片可见水印去除工具。

- 100% 浏览器端处理，不上传图片
- 使用反向 Alpha 混合算法，非 AI 修补
- 中文产品化界面（开始处理 / 结果预览 / 功能特点 / 常见问题）
- 支持处理完成自动提示与自动下载
- License: [MIT](./LICENSE)

## 效果说明

本项目用于去除 **可见** 的 Gemini 角标水印（右下角图标）。

不包含：

- 不去除 Google 的隐形 SynthID
- 不保证对所有来源图片都有效（建议使用 Gemini 的原始下载文件）

## 核心特性

- **纯前端处理**：图片仅在本地浏览器内计算
- **无损思路**：按像素反算，不走 inpainting
- **自动识别**：根据分辨率使用 48 / 96 两种水印模板
- **实时预览**：原图与结果图并排展示
- **自动下载**：处理成功后可自动触发下载
- **开箱即用**：静态文件即可部署，无需后端

## 算法原理（简述）

Gemini 可见水印属于标准 Alpha 混合：

```text
final = alpha * logo + (1 - alpha) * original
```

已知 `final`（上传图像像素）、`logo`（白色）、`alpha`（由模板图提取），即可反推出：

```text
original = (final - alpha * logo) / (1 - alpha)
```

本项目通过 `assets/bg_48.png` 和 `assets/bg_96.png` 生成 alpha map，再对目标区域逐像素反算。

## 项目结构

```text
gemini-watermark-remover/
├── assets/
│   ├── bg_48.png      # 小尺寸水印 alpha 参考
│   ├── bg_96.png      # 大尺寸水印 alpha 参考
│   └── qrcode.jpg     # 页面公众号二维码（可替换）
├── js/
│   ├── alphaMap.js    # alpha map 计算
│   ├── blendModes.js  # 反向混合公式
│   ├── engine.js      # 核心处理引擎
│   └── app.js         # 交互逻辑
├── index.html         # 页面与样式
└── README.md
```

## 本地运行

> 注意：项目使用 ES Modules，不能直接双击 `index.html` 打开。

在项目根目录执行：

```bash
python3 -m http.server 8080
```

浏览器访问：

```text
http://localhost:8080
```

## 部署方式

可直接部署到任意静态托管平台：

- GitHub Pages
- Cloudflare Pages
- Vercel（静态）
- Netlify

无需数据库、无需后端服务。

## License

本项目采用 [MIT License](./LICENSE)。

## 免责声明

- 仅供学习、研究与个人用途
- 请遵守相关平台条款和当地法律法规
- 请勿用于侵犯版权、冒用来源或误导性传播

## 致谢

- 原始思路与社区实现参考：
  - [dearabhin/gemini-watermark-remover](https://github.com/dearabhin/gemini-watermark-remover)
  - [allenk/GeminiWatermarkTool](https://github.com/allenk/GeminiWatermarkTool)
