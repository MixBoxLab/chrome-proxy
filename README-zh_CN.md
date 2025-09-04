# CORS Proxy Chrome 扩展

[English](README.md) | 简体中文

这是一个简单的 Chrome 扩展，帮助解决本地开发中的跨域请求问题。它使用 `declarativeNetRequest` API 来修改指定 URL 模式的请求和响应头。

## ✨ 功能特点

- 🎯 **精准控制**：只对指定的 URL 模式进行代理处理
- 🏠 **域名限制**：可设置只在特定域名（如 localhost）下生效
- 🎨 **现代界面**：采用 shadcn/ui 设计语言的优雅界面
- ⚡ **高性能**：基于 Manifest V3，使用声明式网络请求 API
- 🔧 **易于使用**：直观的弹窗界面，无需复杂配置

## 🚀 使用方法

### 安装扩展

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 在右上角开启"**开发者模式**"
3. 点击"**加载已解压的扩展程序**"
4. 选择本项目的根目录
5. 扩展图标将出现在工具栏中

### 配置代理规则

1. **设置生效域名**（可选）
   - 点击扩展图标打开弹窗
   - 在"生效域名"输入框中填入域名，例如：`localhost`
   - 留空则在所有网站上生效

2. **添加代理规则**
   - 在弹窗中输入要代理的 URL 模式
   - 例如：`*://api.example.com/*`
   - 点击"添加"按钮

3. **开始使用**
   - 从你的本地开发环境（如 `localhost`）向指定 URL 发起请求
   - 扩展会自动添加 CORS 头并移除 Origin 头
   - 跨域问题得到解决

## 📖 URL 模式示例

| 模式 | 说明 |
|------|------|
| `*://api.example.com/*` | 匹配 api.example.com 的所有请求 |
| `https://api.github.com/*` | 只匹配 GitHub API 的 HTTPS 请求 |
| `*://localhost:8080/*` | 匹配本地 8080 端口的所有请求 |
| `*://*.api.com/*` | 匹配所有 api.com 子域名 |

## 🛠️ 开发调试

### 本地调试步骤

1. **加载扩展**：按照上述安装步骤加载到 Chrome
2. **修改代码**：编辑项目文件
3. **刷新扩展**：在 `chrome://extensions/` 页面点击刷新图标
4. **测试功能**：使用测试页面验证效果

### 调试工具

- **弹窗调试**：右键扩展图标 → "审查弹出内容"
- **后台调试**：在扩展页面点击"服务工作线程"
- **网络监控**：使用浏览器 DevTools 的 Network 面板

### 测试页面

项目包含了一个测试页面 `tests/test-page.html`，可以帮助你快速验证扩展功能：

```bash
open tests/test-page.html
```

## 📁 项目结构

```
├── manifest.json          # 扩展配置文件
├── background.js          # 后台服务工作线程
├── icons/                 # 扩展图标
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── popup/                 # 弹窗界面
│   ├── popup.html         # 界面结构
│   ├── popup.css          # 样式文件
│   └── popup.js           # 交互逻辑
└── tests/                 # 测试工具
    ├── test-page.html     # 功能验证测试页面
    └── debug-helper.md    # 调试指南
```

## 🔧 技术实现

### 核心技术

- **Manifest V3**：使用最新的扩展规范
- **declarativeNetRequest**：高性能的网络请求拦截
- **chrome.storage.local**：本地数据持久化存储
- **Service Worker**：后台处理逻辑

### CORS 处理机制

扩展通过以下方式解决跨域问题：

1. **修改请求头**：
   - 移除 `Origin` 头
   - 移除 `Referer` 头

2. **添加响应头**：
   - `Access-Control-Allow-Origin: *`
   - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS`
   - `Access-Control-Allow-Headers: *`

## 🐛 常见问题

### Q: 为什么跨域请求仍然失败？
A: 请检查：
- 扩展是否正确加载
- URL 模式是否正确匹配
- 生效域名设置是否与当前页面匹配

### Q: 如何查看扩展是否生效？
A: 在 DevTools 的 Network 面板中：
- 查看请求头是否移除了 `Origin`
- 查看响应头是否添加了 CORS 相关字段

### Q: 能否在生产环境使用？
A: 这个扩展主要用于**开发环境**。生产环境建议：
- 在服务器端正确配置 CORS
- 使用反向代理
- 配置 API 网关

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果你在使用过程中遇到问题，可以：
- 提交 [Issue](https://github.com/MixBoxLab/chrome-proxy/issues)
- 查看项目文档
- 参考调试指南

---

**注意**：此扩展仅用于开发目的，不建议在生产环境中长期使用。正确的做法是在服务器端配置适当的 CORS 策略。
