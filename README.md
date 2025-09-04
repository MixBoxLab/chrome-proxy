# CORS Proxy Chrome Extension

English | [简体中文](README-zh_CN.md)

This is a simple Chrome extension to help solve CORS issues during local development. It uses the `declarativeNetRequest` API to modify request and response headers for specified URL patterns.

## ✨ Features

- 🎯 **Precise Control**: Only processes specified URL patterns
- 🏠 **Domain Restriction**: Can be configured to work only on specific domains (e.g., localhost)
- 🎨 **Modern UI**: Elegant interface following shadcn/ui design principles
- ⚡ **High Performance**: Built on Manifest V3 with declarative network request API
- 🔧 **Easy to Use**: Intuitive popup interface with no complex configuration

## 🚀 How to Use

### Install Extension

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable "**Developer mode**" in the top right corner.
3.  Click "**Load unpacked**" and select this directory.
4.  The extension icon will appear in your toolbar.

### Configure Proxy Rules

1. **Set Effective Domain** (Optional)
   - Click the extension icon to open the popup
   - Enter a domain in the "Effective Domain" field, e.g., `localhost`
   - Leave empty to work on all websites

2. **Add Proxy Rules**
   - Enter a URL pattern in the popup
   - Example: `*://api.example.com/*`
   - Click "Add"

3. **Start Using**
   - Make requests from your local development environment (e.g., `localhost`) to the specified URLs
   - The extension will automatically add CORS headers and remove Origin headers
   - CORS issues are resolved

## 📖 URL Pattern Examples

| Pattern | Description |
|---------|-------------|
| `*://api.example.com/*` | Matches all requests to api.example.com |
| `https://api.github.com/*` | Only matches HTTPS requests to GitHub API |
| `*://localhost:8080/*` | Matches all requests to local port 8080 |
| `*://*.api.com/*` | Matches all subdomains of api.com |

## 🛠️ Development & Debugging

### Local Debugging Steps

1. **Load Extension**: Follow the installation steps above
2. **Modify Code**: Edit project files
3. **Refresh Extension**: Click the refresh icon on `chrome://extensions/`
4. **Test Functionality**: Use the test page to verify effects

### Debugging Tools

- **Popup Debugging**: Right-click extension icon → "Inspect popup"
- **Background Debugging**: Click "Service worker" on the extensions page
- **Network Monitoring**: Use browser DevTools Network panel

### Test Page

The project includes a test page `tests/test-page.html` to help you quickly verify the extension functionality:

```bash
open tests/test-page.html
```

## 📁 Project Structure

```
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── popup/                 # Popup interface
│   ├── popup.html         # Interface structure
│   ├── popup.css          # Styles
│   └── popup.js           # Interaction logic
└── tests/                 # Testing utilities
    ├── test-page.html     # Test page for verification
    └── debug-helper.md    # Debugging guide
```

## 🔧 Technical Implementation

### Core Technologies

- **Manifest V3**: Latest extension specification
- **declarativeNetRequest**: High-performance network request interception
- **chrome.storage.local**: Local data persistence
- **Service Worker**: Background processing logic

### CORS Handling Mechanism

The extension resolves CORS issues by:

1. **Modifying Request Headers**:
   - Removes `Origin` header
   - Removes `Referer` header

2. **Adding Response Headers**:
   - `Access-Control-Allow-Origin: *`
   - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS`
   - `Access-Control-Allow-Headers: *`

## 🐛 Common Issues

### Q: Why do CORS requests still fail?
A: Please check:
- Is the extension properly loaded?
- Does the URL pattern correctly match?
- Does the effective domain setting match the current page?

### Q: How to verify if the extension is working?
A: In DevTools Network panel:
- Check if `Origin` header is removed from requests
- Check if CORS headers are added to responses

### Q: Can this be used in production?
A: This extension is mainly for **development environments**. For production:
- Configure CORS properly on the server side
- Use reverse proxy
- Configure API gateway

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📞 Support

If you encounter issues:
- Submit an [Issue](https://github.com/MixBoxLab/chrome-proxy/issues)
- Check project documentation
- Refer to debugging guides

---

**Note**: This extension is for development purposes only. It's not recommended for long-term production use. The proper approach is to configure appropriate CORS policies on the server side.
