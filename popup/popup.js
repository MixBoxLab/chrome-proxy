document.addEventListener('DOMContentLoaded', () => {
  const urlFilterInput = document.getElementById('url-filter-input');
  const addRuleBtn = document.getElementById('add-rule-btn');
  const rulesList = document.getElementById('rules-list');
  const initiatorDomainInput = document.getElementById('initiator-domain-input');

  // Load initiator domain
  async function loadInitiatorDomain() {
    const { initiatorDomain = '' } = await chrome.storage.local.get('initiatorDomain');
    initiatorDomainInput.value = initiatorDomain;
  }

  // Save initiator domain on input change (blur)
  initiatorDomainInput.addEventListener('blur', async () => {
    const initiatorDomain = initiatorDomainInput.value.trim();
    await chrome.storage.local.set({ initiatorDomain });
  });

  // 加载并显示规则
  async function loadRules() {
    const { rules = [] } = await chrome.storage.local.get('rules');
    const emptyState = document.getElementById('empty-state');
    
    rulesList.innerHTML = '';
    
    if (rules.length === 0) {
      emptyState.style.display = 'block';
      rulesList.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      rulesList.style.display = 'block';
      
      rules.forEach((rule, index) => {
        const li = document.createElement('li');
        
        const urlSpan = document.createElement('span');
        urlSpan.textContent = rule.urlFilter;
        urlSpan.style.flex = '1';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.index = index;
        
        li.appendChild(urlSpan);
        li.appendChild(deleteBtn);
        rulesList.appendChild(li);
      });
    }
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

  loadInitiatorDomain();
  loadRules();
});
