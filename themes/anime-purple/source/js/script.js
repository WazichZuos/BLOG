/**
 * Anime Purple Theme - Main Script
 * 主交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    initSearch();
    initSmoothScroll();
    initCodeHighlight();
    initLazyLoad();
    initBackToTop();
    initReadingProgress();
    initTOC();
    initAnimeArt();
});

/**
 * Menu Toggle
 */
function initMenu() {
    const sideMenu = document.getElementById('side-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item:not(.menu-search):not(.social-link)');
    
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.toggle('expanded');
        menuOverlay.classList.toggle('active');
    });
    
    menuOverlay.addEventListener('click', function() {
        sideMenu.classList.remove('expanded');
        menuOverlay.classList.remove('active');
    });
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sideMenu.classList.remove('expanded');
                menuOverlay.classList.remove('active');
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sideMenu.classList.remove('expanded');
            menuOverlay.classList.remove('active');
        }
    });
    
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
 * Search - 基于 search.xml 的真实搜索
 */
function initSearch() {
    const menuSearch = document.getElementById('menu-search');
    const searchModal = document.getElementById('search-modal');
    const searchModalClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('search-input');
    const searchModalInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchModal) return;

    var searchData = null;

    function loadSearchData() {
        if (searchData) return Promise.resolve(searchData);
        var root = document.querySelector('meta[name="root"]');
        var baseUrl = root ? root.getAttribute('content') : '/';
        return fetch(baseUrl + 'search.xml')
            .then(function(res) { return res.text(); })
            .then(function(text) {
                var parser = new DOMParser();
                var xml = parser.parseFromString(text, 'text/xml');
                var entries = xml.querySelectorAll('entry');
                searchData = [];
                entries.forEach(function(entry) {
                    searchData.push({
                        title: entry.querySelector('title').textContent,
                        url: entry.querySelector('url').textContent.trim(),
                        content: entry.querySelector('content') ? entry.querySelector('content').textContent : ''
                    });
                });
                return searchData;
            });
    }
    
    if (menuSearch) {
        menuSearch.addEventListener('click', openSearchModal);
    }
    if (searchInput) {
        searchInput.addEventListener('focus', openSearchModal);
    }

    // Ctrl+K / Cmd+K 快捷键打开搜索
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearchModal();
        }
        if (e.key === 'Escape') {
            closeSearchModal();
        }
    });
    
    searchModalClose.addEventListener('click', closeSearchModal);
    
    if (searchModalInput) {
        searchModalInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    function openSearchModal() {
        searchModal.classList.add('active');
        searchModalInput.focus();
        loadSearchData();
    }
    
    function closeSearchModal() {
        searchModal.classList.remove('active');
        searchResults.innerHTML = '';
        searchModalInput.value = '';
    }
    
    function performSearch() {
        var query = searchModalInput.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        if (!searchData) {
            loadSearchData().then(function() { performSearch(); });
            searchResults.innerHTML = '<div class="search-results-empty"><p>加载搜索索引中...</p></div>';
            return;
        }

        var keywords = query.split(/\s+/);
        var results = [];

        searchData.forEach(function(item) {
            var titleLower = item.title.toLowerCase();
            var contentLower = item.content.toLowerCase();
            var matched = keywords.every(function(kw) {
                return titleLower.indexOf(kw) !== -1 || contentLower.indexOf(kw) !== -1;
            });
            if (matched) {
                // 匹配度评分：标题匹配权重更高
                var score = 0;
                keywords.forEach(function(kw) {
                    if (titleLower.indexOf(kw) !== -1) score += 10;
                    if (contentLower.indexOf(kw) !== -1) score += 1;
                });
                results.push({ item: item, score: score });
            }
        });

        results.sort(function(a, b) { return b.score - a.score; });

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-results-empty"><i class="fas fa-search" style="font-size:32px;margin-bottom:12px;opacity:0.3"></i><p>没有找到相关文章</p><p style="font-size:12px;color:var(--color-text-tertiary)">试试其他关键词</p></div>';
            return;
        }

        var html = '';
        results.slice(0, 20).forEach(function(r) {
            var item = r.item;
            // 提取匹配片段
            var excerpt = '';
            var contentText = item.content.replace(/<[^>]+>/g, '');
            keywords.forEach(function(kw) {
                if (!excerpt) {
                    var idx = contentText.toLowerCase().indexOf(kw);
                    if (idx !== -1) {
                        var start = Math.max(0, idx - 40);
                        var end = Math.min(contentText.length, idx + kw.length + 80);
                        excerpt = (start > 0 ? '...' : '') + contentText.substring(start, end) + (end < contentText.length ? '...' : '');
                    }
                }
            });
            if (!excerpt) {
                excerpt = contentText.substring(0, 120) + '...';
            }

            // 高亮关键词
            keywords.forEach(function(kw) {
                var re = new RegExp('(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
                excerpt = excerpt.replace(re, '<mark>$1</mark>');
            });

            var highlightedTitle = item.title;
            keywords.forEach(function(kw) {
                var re = new RegExp('(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
                highlightedTitle = highlightedTitle.replace(re, '<mark>$1</mark>');
            });

            html += '<a href="' + item.url + '" class="search-result-item">' +
                '<div class="search-result-title">' + highlightedTitle + '</div>' +
                '<div class="search-result-excerpt">' + excerpt + '</div>' +
                '</a>';
        });

        searchResults.innerHTML = '<div class="search-results-count">' + results.length + ' 篇相关文章</div>' + html;
    }
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    var heroArrow = document.querySelector('.hero-arrow');
    
    if (heroArrow) {
        heroArrow.addEventListener('click', function() {
            var firstSection = document.querySelector('section:not(.hero)');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Code Highlight - 代码块复制
 */
function initCodeHighlight() {
    var codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(function(block) {
        var copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> 复制';
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            var code = block.querySelector('code');
            var text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(function() {
                var originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> 已复制';
                copyButton.classList.add('copied');
                
                setTimeout(function() {
                    copyButton.innerHTML = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

/**
 * Back to Top - 回到顶部
 */
function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, 100));

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Reading Progress Bar - 阅读进度条
 */
function initReadingProgress() {
    var progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', throttle(function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, 16));
}

/**
 * TOC - 文章目录
 */
function initTOC() {
    var toc = document.getElementById('post-toc');
    if (!toc) return;

    var tocLinks = toc.querySelectorAll('a');
    var headings = [];

    tocLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            var target = document.getElementById(decodeURIComponent(href.substring(1)));
            if (target) headings.push({ link: link, target: target });
        }
    });

    if (headings.length === 0) return;

    // TOC 展开/折叠
    var tocToggle = document.getElementById('toc-toggle');
    if (tocToggle) {
        tocToggle.addEventListener('click', function() {
            toc.classList.toggle('collapsed');
        });
    }

    // 滚动高亮
    window.addEventListener('scroll', throttle(function() {
        var scrollTop = window.scrollY + 100;
        var current = null;

        headings.forEach(function(h) {
            if (h.target.offsetTop <= scrollTop) {
                current = h;
            }
        });

        tocLinks.forEach(function(l) { l.classList.remove('active'); });
        if (current) current.link.classList.add('active');
    }, 100));
}

/**
 * Anime Art - 处理二次元插画位的显示/隐藏
 */
function initAnimeArt() {
    document.querySelectorAll('.anime-art-slot').forEach(function(slot) {
        var img = slot.querySelector('img');
        if (img) {
            img.addEventListener('error', function() {
                slot.classList.add('empty-slot');
            });
            img.addEventListener('load', function() {
                slot.classList.remove('empty-slot');
                slot.classList.add('loaded');
            });
        }
    });
}

/**
 * Lazy Load
 */
function initLazyLoad() {
    var images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(function(img) { imageObserver.observe(img); });
    } else {
        images.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Debounce
 */
function debounce(func, delay) {
    var timeoutId;
    return function() {
        var args = arguments;
        var context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() { func.apply(context, args); }, delay);
    };
}

/**
 * Throttle
 */
function throttle(func, delay) {
    var lastCall = 0;
    return function() {
        var now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, arguments);
        }
    };
}
