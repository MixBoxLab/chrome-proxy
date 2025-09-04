document.addEventListener('DOMContentLoaded', () => {
  const urlFilterInput = document.getElementById('url-filter-input');
  const addRuleBtn = document.getElementById('add-rule-btn');
  const rulesList = document.getElementById('rules-list');

  // 加载并显示规则
  async function loadRules() {
    const { rules = [] } = await chrome.storage.local.get('rules');
    rulesList.innerHTML = '';
    rules.forEach((rule, index) => {
      const li = document.createElement('li');
      li.textContent = rule.urlFilter;
      const deleteBtn = document.createElement('span');
      deleteBtn.textContent = '删除';
      deleteBtn.className = 'delete-btn';
      deleteBtn.dataset.index = index;
      li.appendChild(deleteBtn);
      rulesList.appendChild(li);
    });
  }

  // 添加规则
  addRuleBtn.addEventListener('click', async () => {
    const urlFilter = urlFilterInput.value.trim();
    if (!urlFilter) return;

    const { rules = [] } = await chrome.storage.local.get('rules');
    // 防止重复添加
    if (rules.some(rule => rule.urlFilter === urlFilter)) {
        alert('规则已存在！');
        return;
    }
    
    rules.push({ urlFilter });
    await chrome.storage.local.set({ rules });
    urlFilterInput.value = '';
    loadRules();
  });

  // 删除规则（事件委托）
  rulesList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = parseInt(e.target.dataset.index, 10);
      const { rules = [] } = await chrome.storage.local.get('rules');
      rules.splice(index, 1);
      await chrome.storage.local.set({ rules });
      loadRules();
    }
  });

  loadRules();
});
