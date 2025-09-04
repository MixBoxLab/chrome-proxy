# Chrome 插件调试指南

## 快速刷新插件的方法

### 方法一：扩展页面刷新
1. 打开 `chrome://extensions/`
2. 找到 "CORS Proxy" 插件
3. 点击刷新图标 🔄

### 方法二：快捷键刷新
- 在扩展页面按 `Ctrl+R` (Windows) 或 `Cmd+R` (Mac)

## 常见调试场景

### 🎨 调试弹窗样式
1. 点击插件图标打开弹窗
2. 右键弹窗 → "审查元素"
3. 在 DevTools 中修改 CSS，实时预览效果
4. 满意后将修改复制到 `popup.css`

### 🔧 调试后台逻辑
1. 在 `chrome://extensions/` 中点击"服务工作线程"
2. 在 `background.js` 中添加 `console.log` 语句
3. 刷新插件，查看控制台输出

### 🌐 测试跨域请求
创建一个简单的测试页面：

```html
<!DOCTYPE html>
<html>
<head>
    <title>CORS 测试</title>
</head>
<body>
    <button onclick="testCORS()">测试跨域请求</button>
    <div id="result"></div>
    
    <script>
        async function testCORS() {
            try {
                const response = await fetch('https://api.github.com/users/octocat');
                const data = await response.json();
                document.getElementById('result').innerHTML = 
                    `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                document.getElementById('result').innerHTML = 
                    `<p style="color: red;">错误: ${error.message}</p>`;
            }
        }
    </script>
</body>
</html>
```

### 📊 查看存储数据
在弹窗的 DevTools Console 中执行：
```javascript
// 查看当前存储的规则
chrome.storage.local.get(['rules', 'initiatorDomain']).then(console.log);

// 清空所有规则（谨慎使用）
chrome.storage.local.clear();
```

### 🐛 常见问题排查

#### 问题1: 插件图标显示但点击无反应
- 检查 `popup.html` 路径是否正确
- 查看 DevTools Console 是否有 JavaScript 错误

#### 问题2: 跨域请求仍然被阻止
- 确认规则格式正确（如 `*://api.example.com/*`）
- 检查 "生效域名" 设置是否匹配当前页面
- 在 Network 面板查看请求头是否被修改

#### 问题3: 样式显示异常
- 确认 `popup.css` 路径正确
- 检查 CSS 语法错误
- 清除浏览器缓存

## 开发技巧

### 热重载
- 每次修改代码后记得刷新插件
- 可以保持扩展页面打开，方便快速刷新

### 版本控制
- 定期提交代码：`git add . && git commit -m "描述修改内容"`
- 为重要版本打标签：`git tag v1.0.0`

### 测试不同场景
1. **localhost 开发环境**
2. **127.0.0.1 访问**
3. **不同端口号**
4. **HTTPS 页面**
