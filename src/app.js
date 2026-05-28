// PromptBetter - Main Application Logic

// LocalStorage keys
const LS_FAVORITES = 'pb_favorites';
const LS_RECENT = 'pb_recent_copies';
const LS_DARKMODE = 'pb_darkmode';

// State
let currentFilter = 'all'; // 'all', 'favorites', 'recent'
let lazyRenderState = {
    prompts: [],
    rendered: 0,
    batchSize: 6,
    observer: null,
    isLoading: false,
};

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    injectStyles();
    renderCategories();
    renderFilterBar();
    renderPromptOfTheDay();
    initLazyRender(PROMPTS);
    initSearch();
    initFilters();
    initModelFilters();
    initMobileMenu();
    initBackToTop();
    handleHashNavigation();

    // Reveal main content, hide skeleton
    document.getElementById('loading-skeleton').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
});

// === FEATURE: Dark Mode ===
function initDarkMode() {
    const saved = localStorage.getItem(LS_DARKMODE);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    updateDarkModeIcon();

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(LS_DARKMODE)) {
            document.documentElement.classList.toggle('dark', e.matches);
            updateDarkModeIcon();
        }
    });

    // Toggle button
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(LS_DARKMODE, isDark ? 'dark' : 'light');
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const icon = document.querySelector('.dark-toggle-icon');
    if (icon) {
        icon.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    }
}

// === FEATURE: Lazy Render with IntersectionObserver ===
function initLazyRender(prompts) {
    lazyRenderState.prompts = prompts;
    lazyRenderState.rendered = 0;

    const grid = document.getElementById('prompts-grid');
    grid.innerHTML = '';

    // Render first batch
    renderNextBatch();

    // Set up IntersectionObserver
    if (lazyRenderState.observer) {
        lazyRenderState.observer.disconnect();
    }

    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) return;

    lazyRenderState.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !lazyRenderState.isLoading) {
                if (lazyRenderState.rendered < lazyRenderState.prompts.length) {
                    lazyRenderState.isLoading = true;
                    const loader = document.getElementById('loading-more');
                    if (loader) loader.classList.remove('hidden');

                    // Small delay for visual feedback
                    setTimeout(() => {
                        renderNextBatch();
                        lazyRenderState.isLoading = false;
                        if (loader) loader.classList.add('hidden');
                    }, 300);
                }
            }
        });
    }, { rootMargin: '200px' });

    lazyRenderState.observer.observe(sentinel);
}

function renderNextBatch() {
    const { prompts, rendered, batchSize } = lazyRenderState;
    const grid = document.getElementById('prompts-grid');
    const end = Math.min(rendered + batchSize, prompts.length);
    const batch = prompts.slice(rendered, end);

    batch.forEach((p, i) => {
        const card = createPromptCard(p, i);
        grid.appendChild(card);
    });

    lazyRenderState.rendered = end;

    // Hide load-more when all rendered
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.classList.add('hidden');
    }
}

function createPromptCard(p, animIndex) {
    const div = document.createElement('div');
    div.className = `prompt-card bg-gray-50 dark:bg-[#1a1a2e] rounded-xl p-6 border border-gray-100 dark:border-gray-700 card-hover transition-all duration-200 card-entrance`;
    div.style.animationDelay = `${animIndex * 60}ms`;
    div.dataset.id = p.id;
    div.dataset.category = p.category;
    div.dataset.models = p.models.join(',');
    div.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <span class="text-xs font-medium text-primary bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full">
                ${getCategoryIcon(p.category)} ${capitalizeFirst(p.category)}
            </span>
            <span class="text-xs text-gray-400">🔥 ${p.popularity}%</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${p.title}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${p.prompt.substring(0, 120)}...</p>
        <div class="flex flex-wrap gap-1 mb-4">
            ${p.models.map(m => `<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">${m}</span>`).join('')}
        </div>
        <div class="flex gap-2">
            <button class="copy-btn flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                    onclick="copyPromptWithPulse(this, ${p.id})">
                📋 Copy
            </button>
            <button class="favorite-btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onclick="toggleFavoriteWithBounce(this, ${p.id})">
                ${isFavorite(p.id) ? '❤️' : '🤍'}
            </button>
            <button class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onclick="viewPrompt(${p.id})">
                👁️
            </button>
        </div>
    `;
    return div;
}

// Copy with pulse animation
function copyPromptWithPulse(btn, id) {
    btn.classList.add('copy-pulse');
    setTimeout(() => btn.classList.remove('copy-pulse'), 400);
    copyPrompt(id);
}

// Favorite with bounce animation
function toggleFavoriteWithBounce(btn, id) {
    toggleFavorite(id);
    btn.innerHTML = isFavorite(id) ? '❤️' : '🤍';
    btn.classList.add('heart-bounce');
    setTimeout(() => btn.classList.remove('heart-bounce'), 600);
}

// === FEATURE 5: Prompt of the Day ===
function getPromptOfTheDay() {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % PROMPTS.length;
    return PROMPTS[dayIndex];
}

function renderPromptOfTheDay() {
    const potd = getPromptOfTheDay();
    const grid = document.getElementById('prompts-grid');
    const container = grid.parentElement;

    // Create POTD card before the grid
    const potdSection = document.createElement('div');
    potdSection.id = 'potd-section';
    potdSection.className = 'mb-8 fade-in';
    potdSection.innerHTML = `
        <div class="potd-card relative bg-white rounded-2xl p-6 border-2 border-transparent overflow-hidden cursor-pointer"
             onclick="viewPrompt(${potd.id})">
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div class="flex flex-col md:flex-row md:items-center gap-4">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-lg">⭐</span>
                        <span class="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wide">Prompt of the Day</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">${potd.title}</h3>
                    <p class="text-sm text-gray-600 line-clamp-2">${potd.prompt.substring(0, 150)}...</p>
                    <div class="flex flex-wrap gap-1 mt-3">
                        ${potd.models.map(m => `<span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">${m}</span>`).join('')}
                    </div>
                </div>
                <div class="flex gap-2 md:flex-col">
                    <button class="bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                            onclick="event.stopPropagation(); copyPrompt(${potd.id})">
                        📋 Copy
                    </button>
                    <button class="favorite-btn bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition"
                            onclick="event.stopPropagation(); toggleFavorite(${potd.id}); renderPromptOfTheDay();">
                        ${isFavorite(potd.id) ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `;

    const existing = document.getElementById('potd-section');
    if (existing) existing.remove();
    container.insertBefore(potdSection, grid);
}

// === FEATURE 2: LocalStorage Favorites ===
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(LS_FAVORITES)) || [];
    } catch { return []; }
}

function saveFavorites(favs) {
    localStorage.setItem(LS_FAVORITES, JSON.stringify(favs));
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function toggleFavorite(id) {
    const favs = getFavorites();
    const index = favs.indexOf(id);
    if (index === -1) {
        favs.push(id);
    } else {
        favs.splice(index, 1);
    }
    saveFavorites(favs);
    updateFavoriteBadge();
    // Re-render cards to update heart state
    if (currentFilter === 'favorites') {
        showFavorites();
    }
}

function updateFavoriteBadge() {
    const badge = document.getElementById('fav-badge');
    const count = getFavorites().length;
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
}

function showFavorites() {
    currentFilter = 'favorites';
    const favIds = getFavorites();
    const filtered = PROMPTS.filter(p => favIds.includes(p.id));
    updateFilterBarActiveState('favorites');
    if (filtered.length === 0) {
        const grid = document.getElementById('prompts-grid');
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <span class="text-4xl block mb-4">💔</span>
                <p class="text-lg font-medium">No saved prompts yet</p>
                <p class="text-sm mt-1">Click the ❤️ button on any prompt to save it here.</p>
            </div>
        `;
        document.getElementById('load-more-btn').classList.add('hidden');
    } else {
        renderPrompts(filtered, 20);
    }
}

// === FEATURE 3: Recently Copied History ===
function getRecentCopies() {
    try {
        return JSON.parse(localStorage.getItem(LS_RECENT)) || [];
    } catch { return []; }
}

function saveRecentCopy(id) {
    const recent = getRecentCopies();
    // Remove if already exists
    const filtered = recent.filter(r => r.id !== id);
    // Add to front
    filtered.unshift({ id, timestamp: Date.now() });
    // Keep only last 10
    const trimmed = filtered.slice(0, 10);
    localStorage.setItem(LS_RECENT, JSON.stringify(trimmed));
}

function showRecent() {
    currentFilter = 'recent';
    const recent = getRecentCopies();
    updateFilterBarActiveState('recent');

    if (recent.length === 0) {
        const grid = document.getElementById('prompts-grid');
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <span class="text-4xl block mb-4">🕐</span>
                <p class="text-lg font-medium">No recently copied prompts</p>
                <p class="text-sm mt-1">Copy a prompt and it will appear here.</p>
            </div>
        `;
        document.getElementById('load-more-btn').classList.add('hidden');
        return;
    }

    const recentPrompts = recent
        .map(r => {
            const prompt = PROMPTS.find(p => p.id === r.id);
            return prompt ? { ...prompt, _copiedAt: r.timestamp } : null;
        })
        .filter(Boolean);

    renderPrompts(recentPrompts, 10, true);
}

// === FEATURE 2 & 3: Filter Bar (Favorites + Recent) ===
function renderFilterBar() {
    const section = document.querySelector('#popular .max-w-7xl');
    const headerDiv = section.querySelector('.flex.justify-between');

    // Add favorites and recent buttons to the model filter area
    const filterArea = headerDiv.querySelector('.flex.gap-2');

    // Create a separator
    const separator = document.createElement('span');
    separator.className = 'w-px h-6 bg-gray-300 self-center mx-1';
    filterArea.appendChild(separator);

    // Favorites button
    const favBtn = document.createElement('button');
    favBtn.id = 'fav-filter-btn';
    favBtn.className = 'relative bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition';
    favBtn.innerHTML = `❤️ Saved <span id="fav-badge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full items-center justify-center text-[10px] font-bold" style="display:none">0</span>`;
    favBtn.addEventListener('click', () => showFavorites());
    filterArea.appendChild(favBtn);

    // Recent button
    const recentBtn = document.createElement('button');
    recentBtn.id = 'recent-filter-btn';
    recentBtn.className = 'bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition';
    recentBtn.textContent = '🕐 Recent';
    recentBtn.addEventListener('click', () => showRecent());
    filterArea.appendChild(recentBtn);

    updateFavoriteBadge();
}

function updateFilterBarActiveState(active) {
    // Reset model filters
    document.querySelectorAll('.model-filter').forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-700');
    });
    // Reset custom filters
    const favBtn = document.getElementById('fav-filter-btn');
    const recentBtn = document.getElementById('recent-filter-btn');
    favBtn.classList.remove('bg-primary', 'text-white');
    favBtn.classList.add('bg-gray-100', 'text-gray-700');
    recentBtn.classList.remove('bg-primary', 'text-white');
    recentBtn.classList.add('bg-gray-100', 'text-gray-700');

    if (active === 'favorites') {
        favBtn.classList.add('bg-primary', 'text-white');
        favBtn.classList.remove('bg-gray-100', 'text-gray-700');
    } else if (active === 'recent') {
        recentBtn.classList.add('bg-primary', 'text-white');
        recentBtn.classList.remove('bg-gray-100', 'text-gray-700');
    }
}

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
            currentFilter = 'all';
            const category = card.dataset.category;
            const filtered = PROMPTS.filter(p => p.category === category);
            renderPrompts(filtered);
            document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Render prompt cards
function renderPrompts(prompts, limit = 9, showTimestamp = false) {
    // When called directly (from search/filter), bypass lazy render
    if (lazyRenderState.observer) {
        lazyRenderState.observer.disconnect();
    }

    const grid = document.getElementById('prompts-grid');
    const displayed = prompts.slice(0, limit);

    grid.innerHTML = displayed.map((p, i) => `
        <div class="prompt-card bg-gray-50 dark:bg-[#1a1a2e] rounded-xl p-6 border border-gray-100 dark:border-gray-700 card-hover transition-all duration-200 card-entrance"
             style="animation-delay: ${i * 60}ms"
             data-id="${p.id}" data-category="${p.category}" data-models="${p.models.join(',')}">
            <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-medium text-primary bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full">
                    ${getCategoryIcon(p.category)} ${capitalizeFirst(p.category)}
                </span>
                <div class="flex items-center gap-2">
                    ${showTimestamp && p._copiedAt ? `<span class="text-xs text-gray-400">${formatTimeAgo(p._copiedAt)}</span>` : ''}
                    <span class="text-xs text-gray-400">🔥 ${p.popularity}%</span>
                </div>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${p.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${p.prompt.substring(0, 120)}...</p>
            <div class="flex flex-wrap gap-1 mb-4">
                ${p.models.map(m => `<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">${m}</span>`).join('')}
            </div>
            <div class="flex gap-2">
                <button class="copy-btn flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                        onclick="copyPromptWithPulse(this, ${p.id})">
                    📋 Copy
                </button>
                <button class="favorite-btn bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        onclick="toggleFavoriteWithBounce(this, ${p.id})">
                    ${isFavorite(p.id) ? '❤️' : '🤍'}
                </button>
                <button class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        onclick="viewPrompt(${p.id})">
                    👁️
                </button>
            </div>
        </div>
    `).join('');

    // Update load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (prompts.length <= limit) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
        loadMoreBtn.onclick = () => renderPrompts(prompts, limit + 9, showTimestamp);
    }
}

// Copy prompt to clipboard
function copyPrompt(id) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (!prompt) return;

    navigator.clipboard.writeText(prompt.prompt).then(() => {
        showToast('Copied to clipboard!');
        saveRecentCopy(id);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = prompt.prompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!');
        saveRecentCopy(id);
    });
}

// Copy filled prompt (with variable values)
function copyFilledPrompt(id) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (!prompt) return;

    const modal = document.querySelector('.fixed.inset-0');
    if (!modal) return;

    // Get all variable inputs
    const inputs = modal.querySelectorAll('.var-input');
    let filledText = prompt.prompt;

    inputs.forEach(input => {
        const placeholder = input.dataset.placeholder;
        const value = input.textContent.trim() || placeholder;
        filledText = filledText.replace(placeholder, value);
    });

    navigator.clipboard.writeText(filledText).then(() => {
        showToast('Copied with your values filled in!');
        saveRecentCopy(id);
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = filledText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied with your values filled in!');
        saveRecentCopy(id);
    });
}

// Reset all variable fields
function resetVariables() {
    const modal = document.querySelector('.fixed.inset-0');
    if (!modal) return;
    modal.querySelectorAll('.var-input').forEach(input => {
        input.textContent = '';
        input.classList.add('empty');
    });
}

// === FEATURE 1: Variable Placeholder Filling ===
function parsePromptWithVariables(text) {
    // Find all [ANYTHING] patterns and replace with editable spans
    const regex = /\[([^\]]+)\]/g;
    let result = escapeHtml(text);

    // We need to work on escaped HTML, so the brackets are still literal
    const escapedRegex = /\[([^\]]+)\]/g;
    result = result.replace(escapedRegex, (match, content) => {
        return `<span class="var-input empty" contenteditable="true" data-placeholder="${match}" title="Click to fill: ${content}" spellcheck="false">${''}</span>`;
    });

    return result;
}

// === FEATURE 4: Social Sharing ===
function shareTwitter(prompt) {
    const text = encodeURIComponent(`Check out this AI prompt template: "${prompt.title}" - via @promptbetter`);
    const url = encodeURIComponent(getShareUrl(prompt.id));
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareLinkedIn(prompt) {
    const url = encodeURIComponent(getShareUrl(prompt.id));
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function copyShareLink(promptId) {
    const url = getShareUrl(promptId);
    navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Link copied to clipboard!');
    });
}

function getShareUrl(promptId) {
    const base = window.location.href.split('#')[0];
    return `${base}#prompt-${promptId}`;
}

// === "Try It" Button — Open prompt in AI chat ===
function getFilledPromptText(promptId) {
    const prompt = PROMPTS.find(p => p.id === promptId);
    if (!prompt) return '';

    const modal = document.querySelector('.fixed.inset-0');
    if (!modal) return prompt.prompt;

    const inputs = modal.querySelectorAll('.var-input');
    let filledText = prompt.prompt;

    inputs.forEach(input => {
        const placeholder = input.dataset.placeholder;
        const value = input.textContent.trim() || placeholder;
        filledText = filledText.replace(placeholder, value);
    });

    return filledText;
}

function getTryItUrl(promptId) {
    const prompt = PROMPTS.find(p => p.id === promptId);
    if (!prompt) return null;

    const text = getFilledPromptText(promptId);
    const encoded = encodeURIComponent(text);
    const primaryModel = prompt.models[0];

    const urlMap = {
        'chatgpt': `https://chat.openai.com/?q=${encoded}`,
        'claude': `https://claude.ai/new?q=${encoded}`,
        'gemini': `https://gemini.google.com/?q=${encoded}`,
    };

    return urlMap[primaryModel] || urlMap['chatgpt'];
}

function tryItInAI(promptId) {
    const url = getTryItUrl(promptId);
    if (url) {
        window.open(url, '_blank');
    }
}

function getModelNameForTryIt(promptId) {
    const prompt = PROMPTS.find(p => p.id === promptId);
    if (!prompt) return 'AI';
    const labels = { 'chatgpt': 'ChatGPT', 'claude': 'Claude', 'gemini': 'Gemini' };
    return labels[prompt.models[0]] || 'AI';
}

// Handle #prompt-{id} hash on page load
function handleHashNavigation() {
    const hash = window.location.hash;
    const match = hash.match(/^#prompt-(\d+)$/);
    if (match) {
        const id = parseInt(match[1]);
        setTimeout(() => viewPrompt(id), 500);
    }
}

// View full prompt in modal (with variable filling + sharing + favorites)
function viewPrompt(id) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (!prompt) return;

    // Update hash for sharing
    history.replaceState(null, '', `#prompt-${id}`);

    // Parse prompt text with variable inputs
    const promptHtml = parsePromptWithVariables(prompt.prompt);
    const hasVariables = /\[([^\]]+)\]/.test(prompt.prompt);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
            history.replaceState(null, '', window.location.pathname);
        }
    };

    modal.innerHTML = `
        <div class="bg-white dark:bg-[#16213e] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl fade-in">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-xs font-medium text-primary bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full">
                        ${getCategoryIcon(prompt.category)} ${capitalizeFirst(prompt.category)}
                    </span>
                    <h2 class="text-2xl font-bold mt-2 dark:text-white">${prompt.title}</h2>
                </div>
                <button onclick="this.closest('.fixed').remove(); history.replaceState(null, '', window.location.pathname);" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl">&times;</button>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${prompt.models.map(m => `<span class="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">${getModelLabel(m)}</span>`).join('')}
                ${prompt.tags.map(t => `<span class="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">#${t}</span>`).join('')}
            </div>

            ${hasVariables ? `
            <div class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4 text-sm text-amber-800">
                💡 <strong>Fill in the highlighted fields</strong> below, then copy to get your personalized prompt.
            </div>
            ` : ''}

            <div class="prompt-display bg-gray-50 p-4 rounded-xl text-sm whitespace-pre-wrap font-mono text-gray-800 border leading-relaxed">${promptHtml}</div>

            <div class="mt-4 flex flex-wrap gap-3">
                <button onclick="copyFilledPrompt(${prompt.id}); this.textContent='✓ Copied!'; setTimeout(() => this.textContent='📋 Copy to Clipboard', 2000)"
                        class="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition">
                    📋 Copy to Clipboard
                </button>
                <button onclick="tryItInAI(${prompt.id})"
                        class="try-it-btn bg-green-500 text-white py-3 px-5 rounded-lg font-medium hover:bg-green-600 transition"
                        title="Open in ${getModelNameForTryIt(prompt.id)}">
                    🚀 Try it
                </button>
                <button onclick="toggleFavorite(${prompt.id}); this.innerHTML = isFavorite(${prompt.id}) ? '❤️ Saved' : '🤍 Save'; if(isFavorite(${prompt.id})) this.classList.add('heart-pulse');"
                        class="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition">
                    ${isFavorite(prompt.id) ? '❤️ Saved' : '🤍 Save'}
                </button>
                ${hasVariables ? `
                <button onclick="resetVariables()"
                        class="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition">
                    🔄 Reset
                </button>
                ` : ''}
            </div>

            <!-- Social Sharing -->
            <div class="mt-4 pt-4 border-t border-gray-100">
                <p class="text-xs text-gray-400 uppercase font-medium mb-2">Share this prompt</p>
                <div class="flex gap-2">
                    <button onclick="shareTwitter(PROMPTS.find(p => p.id === ${prompt.id}))"
                            class="flex items-center gap-1 bg-[#1DA1F2] text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                        𝕏 Twitter
                    </button>
                    <button onclick="shareLinkedIn(PROMPTS.find(p => p.id === ${prompt.id}))"
                            class="flex items-center gap-1 bg-[#0A66C2] text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                        in LinkedIn
                    </button>
                    <button onclick="copyShareLink(${prompt.id})"
                            class="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
                        🔗 Copy Link
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Set up variable input placeholder behavior
    modal.querySelectorAll('.var-input').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.classList.contains('empty')) {
                this.classList.remove('empty');
            }
        });
        input.addEventListener('blur', function() {
            if (!this.textContent.trim()) {
                this.classList.add('empty');
            }
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Move to next input
                const allInputs = [...modal.querySelectorAll('.var-input')];
                const idx = allInputs.indexOf(this);
                if (idx < allInputs.length - 1) {
                    allInputs[idx + 1].focus();
                } else {
                    this.blur();
                }
            }
        });
    });
}

// Search functionality
function initSearch() {
    const input = document.getElementById('search-input');
    let debounceTimer;

    const doSearch = () => {
        currentFilter = 'all';
        const query = input.value.toLowerCase().trim();
        if (query.length < 2) {
            initLazyRender(PROMPTS);
            return;
        }
        const filtered = PROMPTS.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.prompt.toLowerCase().includes(query) ||
            p.tags.some(t => t.includes(query)) ||
            p.category.includes(query)
        );
        if (filtered.length === 0) {
            renderEmptySearchResults(query);
        } else {
            renderPrompts(filtered, 20);
        }
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
            currentFilter = 'all';
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
            currentFilter = 'all';
            // Update active state
            document.querySelectorAll('.model-filter').forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            btn.classList.add('active', 'bg-primary', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-700');

            // Reset custom filter buttons
            const favBtn = document.getElementById('fav-filter-btn');
            const recentBtn = document.getElementById('recent-filter-btn');
            if (favBtn) { favBtn.classList.remove('bg-primary', 'text-white'); favBtn.classList.add('bg-gray-100', 'text-gray-700'); }
            if (recentBtn) { recentBtn.classList.remove('bg-primary', 'text-white'); recentBtn.classList.add('bg-gray-100', 'text-gray-700'); }

            const model = btn.dataset.model;
            if (model === 'all') {
                initLazyRender(PROMPTS);
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
    const nav = document.querySelector('nav .max-w-7xl');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'hidden md:hidden bg-white dark:bg-[#16213e] border-t border-gray-100 dark:border-gray-700 py-4 px-4 space-y-3';
    mobileMenu.innerHTML = `
        <a href="#categories" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-500 py-2">Categories</a>
        <a href="#popular" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-500 py-2">Popular</a>
        <a href="#models" class="block text-gray-600 dark:text-gray-300 hover:text-indigo-500 py-2">AI Models</a>
        <button onclick="toggleDarkMode(); updateDarkModeIcon();" class="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-indigo-500 py-2"><span class="dark-toggle-icon-mobile">${document.documentElement.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode'}</span></button>
        <button onclick="showFavorites(); document.getElementById('popular').scrollIntoView({behavior:'smooth'}); document.getElementById('mobile-menu').classList.add('hidden');" class="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-indigo-500 py-2">❤️ My Saved</button>
        <button onclick="showRecent(); document.getElementById('popular').scrollIntoView({behavior:'smooth'}); document.getElementById('mobile-menu').classList.add('hidden');" class="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-indigo-500 py-2">🕐 Recent</button>
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

function formatTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

// === FEATURE: Empty Search Results ===
function renderEmptySearchResults(query) {
    const grid = document.getElementById('prompts-grid');
    const suggestions = CATEGORIES.slice(0, 4).map(c => c.name).join(', ');
    grid.innerHTML = `
        <div class="col-span-full text-center py-16 text-gray-500 fade-in">
            <span class="text-5xl block mb-4">🔍</span>
            <p class="text-xl font-semibold text-gray-700 mb-2">No prompts found for "${escapeHtml(query)}"</p>
            <p class="text-sm text-gray-500 mb-6">Try a different keyword or browse by category</p>
            <div class="flex flex-wrap justify-center gap-2 mb-4">
                <span class="text-sm text-gray-400">Suggestions:</span>
                ${['writing', 'coding', 'marketing', 'email', 'seo', 'startup'].map(s =>
                    `<button class="text-sm bg-indigo-50 text-primary px-3 py-1 rounded-full hover:bg-indigo-100 transition"
                             onclick="document.getElementById('search-input').value='${s}'; document.getElementById('search-input').dispatchEvent(new Event('input'));">
                        ${s}
                    </button>`
                ).join('')}
            </div>
            <button onclick="document.getElementById('search-input').value=''; initLazyRender(PROMPTS);"
                    class="text-primary font-medium hover:underline">
                ← Show all prompts
            </button>
        </div>
    `;
    document.getElementById('load-more-btn').classList.add('hidden');
}

// === FEATURE: Back to Top Button ===
function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'fixed bottom-6 right-6 bg-primary text-white w-12 h-12 rounded-full shadow-lg z-40 flex items-center justify-center text-xl font-bold hover:bg-indigo-700 transition-all duration-300 opacity-0 translate-y-4 pointer-events-none';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            btn.classList.add('opacity-100', 'translate-y-0');
        } else {
            btn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            btn.classList.remove('opacity-100', 'translate-y-0');
        }
    });
}

// Inject dynamic styles for new features
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Variable input fields */
        .var-input {
            display: inline-block;
            min-width: 80px;
            padding: 2px 8px;
            margin: 0 2px;
            border-radius: 6px;
            background: #EEF2FF;
            border: 1.5px dashed #6366f1;
            color: #4338ca;
            font-weight: 600;
            font-family: inherit;
            outline: none;
            transition: all 0.2s ease;
            cursor: text;
            line-height: 1.6;
        }
        .var-input:focus {
            background: #fff;
            border-style: solid;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .var-input.empty::before {
            content: attr(data-placeholder);
            color: #a5b4fc;
            font-weight: 500;
        }
        .var-input:focus.empty::before {
            color: #c7d2fe;
        }

        /* Heart pulse animation */
        @keyframes heartPulse {
            0% { transform: scale(1); }
            25% { transform: scale(1.3); }
            50% { transform: scale(1); }
            75% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        .heart-pulse {
            animation: heartPulse 0.5s ease-in-out;
        }

        /* Prompt of the Day card */
        .potd-card {
            background: linear-gradient(white, white) padding-box,
                        linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899) border-box;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        html.dark .potd-card {
            background: linear-gradient(#16213e, #16213e) padding-box,
                        linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899) border-box;
        }
        .potd-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.2);
        }

        /* Prompt display in modal */
        .prompt-display {
            line-height: 1.8;
        }

        /* Filter button badge positioning */
        #fav-filter-btn {
            position: relative;
        }

        /* Share buttons hover */
        .share-btn:hover {
            transform: translateY(-1px);
        }

        /* Smooth scroll for everything */
        html {
            scroll-behavior: smooth;
        }

        /* Try It button */
        .try-it-btn {
            font-weight: 600;
            letter-spacing: 0.02em;
        }
        .try-it-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        /* Back to top button */
        #back-to-top {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
