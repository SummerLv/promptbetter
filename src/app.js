// PromptBetter - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderPrompts(PROMPTS);
    initSearch();
    initFilters();
    initModelFilters();
    initMobileMenu();
});

// Render category cards
function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = CATEGORIES.map(cat => `
        <div class="category-card p-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer card-hover transition-all duration-200"
             data-category="${cat.id}">
            <div class="text-3xl mb-2">${cat.icon}</div>
            <h3 class="font-bold text-gray-900">${cat.name}</h3>
            <p class="text-sm text-gray-500 mt-1">${cat.desc}</p>
            <span class="inline-block mt-2 text-xs text-primary font-medium">${cat.count} prompts</span>
        </div>
    `).join('');

    // Category click handler
    grid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filtered = PROMPTS.filter(p => p.category === category);
            renderPrompts(filtered);
            document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Render prompt cards
function renderPrompts(prompts, limit = 9) {
    const grid = document.getElementById('prompts-grid');
    const displayed = prompts.slice(0, limit);

    grid.innerHTML = displayed.map(p => `
        <div class="prompt-card bg-gray-50 rounded-xl p-6 border border-gray-100 card-hover transition-all duration-200 fade-in"
             data-id="${p.id}" data-category="${p.category}" data-models="${p.models.join(',')}">
            <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-medium text-primary bg-indigo-50 px-2 py-1 rounded-full">
                    ${getCategoryIcon(p.category)} ${capitalizeFirst(p.category)}
                </span>
                <span class="text-xs text-gray-400">🔥 ${p.popularity}%</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">${p.title}</h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3">${p.prompt.substring(0, 120)}...</p>
            <div class="flex flex-wrap gap-1 mb-4">
                ${p.models.map(m => `<span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">${m}</span>`).join('')}
            </div>
            <div class="flex gap-2">
                <button class="copy-btn flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition copy-btn"
                        onclick="copyPrompt(${p.id})">
                    📋 Copy Prompt
                </button>
                <button class="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition"
                        onclick="viewPrompt(${p.id})">
                    👁️
                </button>
            </div>
        </div>
    `).join('');

    // Update load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (prompts.length <= limit) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.onclick = () => renderPrompts(prompts, limit + 9);
    }
}

// Copy prompt to clipboard
function copyPrompt(id) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (!prompt) return;

    navigator.clipboard.writeText(prompt.prompt).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = prompt.prompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!');
    });
}

// View full prompt in modal
function viewPrompt(id) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (!prompt) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-xs font-medium text-primary bg-indigo-50 px-2 py-1 rounded-full">
                        ${getCategoryIcon(prompt.category)} ${capitalizeFirst(prompt.category)}
                    </span>
                    <h2 class="text-2xl font-bold mt-2">${prompt.title}</h2>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${prompt.models.map(m => `<span class="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">${getModelLabel(m)}</span>`).join('')}
                ${prompt.tags.map(t => `<span class="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">#${t}</span>`).join('')}
            </div>
            <pre class="bg-gray-50 p-4 rounded-xl text-sm whitespace-pre-wrap font-mono text-gray-800 border">${escapeHtml(prompt.prompt)}</pre>
            <div class="mt-4 flex gap-3">
                <button onclick="copyPrompt(${prompt.id}); this.textContent='✓ Copied!'; setTimeout(() => this.textContent='📋 Copy to Clipboard', 2000)"
                        class="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition">
                    📋 Copy to Clipboard
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Search functionality
function initSearch() {
    const input = document.getElementById('search-input');
    let debounceTimer;

    const doSearch = () => {
        const query = input.value.toLowerCase().trim();
        if (query.length < 2) {
            renderPrompts(PROMPTS);
            return;
        }
        const filtered = PROMPTS.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.prompt.toLowerCase().includes(query) ||
            p.tags.some(t => t.includes(query)) ||
            p.category.includes(query)
        );
        renderPrompts(filtered, 20);
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
    };

    input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(doSearch, 300);
    });

    // Search button click
    const searchBtn = input.nextElementSibling;
    if (searchBtn) {
        searchBtn.addEventListener('click', doSearch);
    }

    // Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(debounceTimer);
            doSearch();
        }
    });
}

// Tag filters
function initFilters() {
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const category = tag.dataset.tag;
            const filtered = PROMPTS.filter(p => p.category === category);
            renderPrompts(filtered, 20);
            document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Model filters
function initModelFilters() {
    document.querySelectorAll('.model-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.model-filter').forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            btn.classList.add('active', 'bg-primary', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-700');

            const model = btn.dataset.model;
            if (model === 'all') {
                renderPrompts(PROMPTS);
            } else {
                const filtered = PROMPTS.filter(p => p.models.includes(model));
                renderPrompts(filtered, 20);
            }
        });
    });
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = '✓ ' + message;
    toast.classList.remove('hidden', 'translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2000);
}

// Mobile menu
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    // Create mobile menu
    const nav = document.querySelector('nav .max-w-7xl');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'hidden md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3';
    mobileMenu.innerHTML = `
        <a href="#categories" class="block text-gray-600 hover:text-indigo-500 py-2">Categories</a>
        <a href="#popular" class="block text-gray-600 hover:text-indigo-500 py-2">Popular</a>
        <a href="#models" class="block text-gray-600 hover:text-indigo-500 py-2">AI Models</a>
        <a href="https://buymeacoffee.com/promptbetter" target="_blank" rel="noopener" class="block bg-yellow-400 text-black font-medium px-4 py-2 rounded-lg text-center">☕ Buy me a coffee</a>
    `;
    nav.parentNode.insertBefore(mobileMenu, nav.nextSibling);

    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Utility functions
function getCategoryIcon(category) {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat ? cat.icon : '📝';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getModelLabel(model) {
    const labels = {
        'chatgpt': '🟢 ChatGPT',
        'claude': '🟣 Claude',
        'gemini': '🔵 Gemini',
        'midjourney': '🎨 Midjourney'
    };
    return labels[model] || model;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
