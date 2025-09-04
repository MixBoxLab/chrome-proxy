# CORS Proxy Chrome Extension

This is a simple Chrome extension to help solve CORS issues during local development. It uses the `declarativeNetRequest` API to modify request and response headers for specified URL patterns.

## How to use

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable "Developer mode" in the top right corner.
3.  Click "Load unpacked" and select this directory.
4.  The extension icon will appear in your toolbar. Click on it to open the popup.
5.  In the popup, enter a URL pattern for the requests you want to proxy (e.g., `*://api.example.com/*`).
6.  Click "Add".
7.  Requests from your local development environment (e.g., `localhost`) to the specified URL will now have CORS headers added, and the `Origin` header removed.

## Project Structure

- `manifest.json`: The extension's configuration file.
- `background.js`: The service worker that manages the network request rules.
- `popup/`: Contains the HTML, CSS, and JavaScript for the user interface popup.
- `icons/`: Placeholder for extension icons. You need to add your own `icon16.png`, `icon48.png`, and `icon128.png`.
