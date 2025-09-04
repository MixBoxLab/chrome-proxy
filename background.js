// background.js

// 更新拦截规则的函数
async function updateRules() {
  const { rules, initiatorDomain } = await chrome.storage.local.get(['rules', 'initiatorDomain']);
  if (!rules || rules.length === 0) {
    // 如果没有规则，清空所有动态规则
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleIds = existingRules.map(rule => rule.id);
    if (ruleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ruleIds });
    }
    console.log("No rules found, cleared all dynamic rules.");
    return;
  }

  const newRules = rules.map((rule, index) => {
    const id = index + 1; // 规则 ID 必须是正整数
    const condition = {
      urlFilter: rule.urlFilter,
      resourceTypes: [
        'main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font',
        'object', 'xmlhttprequest', 'ping', 'csp_report', 'media', 'websocket'
      ]
    };

    if (initiatorDomain && initiatorDomain.trim() !== '') {
      condition.initiatorDomains = [initiatorDomain.trim()];
    }

    return {
      id: id,
      priority: 1,
      action: {
        type: 'modifyHeaders',
        // 修改响应头，解决CORS问题
        responseHeaders: [
          { header: 'Access-Control-Allow-Origin', operation: 'set', value: '*' },
          { header: 'Access-Control-Allow-Methods', operation: 'set', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS' },
          { header: 'Access-Control-Allow-Headers', operation: 'set', value: '*' }
        ],
        // 修改请求头，移除 Origin，防止服务器端校验
        requestHeaders: [
          { header: 'Origin', operation: 'remove' },
          { header: 'Referer', operation: 'remove' }
        ]
      },
      condition: condition
    };
  });

  // 获取现有规则以便清空
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRuleIds = existingRules.map(rule => rule.id);

  // 原子化地更新规则：先移除旧的，再添加新的
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: newRules
  });
  
  console.log("Rules updated:", newRules);
}

// 插件安装时或 storage 变化时，更新规则
chrome.runtime.onInstalled.addListener(updateRules);
chrome.storage.onChanged.addListener(updateRules);
