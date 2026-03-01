/**
 * Anime Purple Theme - Main Script
 * 主交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMenu();
    initSearch();
    initTheme();
    initSmoothScroll();
    initCodeHighlight();
});

/**
 * Menu Toggle
 * 菜单切换功能
 */
function initMenu() {
    const sideMenu = document.getElementById('side-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item:not(.menu-search):not(.menu-theme-toggle):not(.social-link)');
    
    if (!menuToggle) return;
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.toggle('expanded');
        menuOverlay.classList.toggle('active');
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        sideMenu.classList.remove('expanded');
        menuOverlay.classList.remove('active');
    });
    
    // Close menu when clicking on menu items (mobile)
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sideMenu.classList.remove('expanded');
                menuOverlay.classList.remove('active');
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sideMenu.classList.remove('expanded');
            menuOverlay.classList.remove('active');
        }
    });
    
    // Set active menu item based on current page
    setActiveMenuItem();
}

function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item[href]');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath === href || currentPath.startsWith(href + '/')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Search Functionality
 * 搜索功能
 */
function initSearch() {
    const menuSearch = document.getElementById('menu-search');
    const searchModal = document.getElementById('search-modal');
    const searchModalClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('search-input');
    const searchModalInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-results');
    
    const heroSearch = document.querySelector('.hero-search');
    if (!searchModal) return;
    
    // Open search modal
    if (menuSearch) {
        menuSearch.addEventListener('click', openSearchModal);
    }
    if (searchInput) {
        searchInput.addEventListener('focus', openSearchModal);
    }
    
    // Close search modal
    searchModalClose.addEventListener('click', closeSearchModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearchModal();
        }
    });
    
    // Search functionality
    if (searchModalInput) {
        searchModalInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    function openSearchModal() {
        searchModal.classList.add('active');
        searchModalInput.focus();
    }
    
    function closeSearchModal() {
        searchModal.classList.remove('active');
        searchResults.innerHTML = '';
    }
    
    function performSearch() {
        const query = searchModalInput.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }
        
        // This is a placeholder - in real Hexo, integrate with Hexo API
        // or use a search index
        searchResults.innerHTML = `
            <div class="search-results-empty">
                <p>搜索功能需要配置搜索插件</p>
                <p style="font-size: 12px;">请安装 hexo-generator-search 或 hexo-generator-json-content</p>
            </div>
        `;
    }
}

/**
 * Theme Toggle
 * 深色模式切换
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    if (!themeToggle) return;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme-preference');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem('theme-preference', currentTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme-preference')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
    
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.style.colorScheme = 'dark';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span class="menu-label">亮色</span>';
            themeToggle.setAttribute('title', '切换到亮色模式');
        } else {
            htmlElement.style.colorScheme = 'light';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span class="menu-label">深色</span>';
            themeToggle.setAttribute('title', '切换到深色模式');
        }
    }
}

/**
 * Smooth Scroll
 * 平滑滚动
 */
function initSmoothScroll() {
    const heroArrow = document.querySelector('.hero-arrow');
    
    if (heroArrow) {
        heroArrow.addEventListener('click', function() {
            const firstSection = document.querySelector('section:not(.hero)');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Code Highlight
 * 代码高亮处理
 */
function initCodeHighlight() {
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> 复制';
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 12px;
            background-color: rgba(255,255,255,0.1);
            color: #E0E0E0;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> 已复制';
                copyButton.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }, 2000);
            });
        });
        
        copyButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(255,255,255,0.2)';
        });
        
        copyButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
    });
}

/**
 * Utility Functions
 * 工具函数
 */

/**
 * Debounce function
 * 防抖函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle function
 * 节流函数
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

/**
 * 添加图片懒加载
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * 初始化 Reward 按钮
 */
function initRewardButton() {
    const rewardBtn = document.getElementById('reward-btn');
    if (rewardBtn) {
        rewardBtn.addEventListener('click', function() {
            alert('感谢支持！请在此处添加打赏二维码或链接');
        });
    }
}

// Initialize additional features
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initLazyLoad();
        initRewardButton();
    });
} else {
    initLazyLoad();
    initRewardButton();
}
