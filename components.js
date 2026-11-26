// ==========================================================================
// 華翔興業 Hwa Shine — 全站共用雙語元件 (zh-Hant / EN Header, Subnav, Footer)
// 單一檔案維護，中英文全站自動同步更新
// ==========================================================================

(function () {
  function isEnglishPage() {
    const p = window.location.pathname.toLowerCase();
    return p === '/en' || p.startsWith('/en/') || (document.documentElement.lang || '').toLowerCase().startsWith('en');
  }

  // 確保 body 套用主題類名，並為全站未包覆捲動容器的表格自動加上橫向捲動保護
  function initSiteEnhancements() {
    if (document.body) {
      document.body.classList.add('hs-dark');
    }
    document.querySelectorAll('table').forEach((table) => {
      const parent = table.parentElement;
      if (!parent) return;
      const cls = parent.className || '';
      const overflowX = window.getComputedStyle(parent).overflowX;
      if (
        overflowX === 'auto' ||
        overflowX === 'scroll' ||
        /\b(overflow-x-auto|table-responsive|data-table-container|table-wrapper|table-container|hs-table-scroll)\b/.test(cls)
      ) {
        return;
      }
      const wrapper = document.createElement('div');
      wrapper.className = 'hs-table-scroll';
      parent.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteEnhancements);
  } else {
    initSiteEnhancements();
  }

  const BILINGUAL_SLUGS = new Set([
    'pb15-0','pb15-1','pb15-3','pb15-4','pb15-6','pb60',
    'po13','po34','po36','po43','po64','po72',
    'pr122','pr144','pr146','pr149','pr166','pr168','pr170','pigmentred176','pr177','pr185','pr208','pr242','pr254',
    'pv19','pv23',
    'py14','py74','py83','py110','py128','py138','py139','py150','py151','py154','py155','py180','py181','py191','py192',
    'solvent-dyes-showcase'
  ]);

  function getAlternateLangUrl(isEn) {
    const rawPath = window.location.pathname;
    const path = rawPath.toLowerCase();
    const search = window.location.search || '';
    if (isEn) {
      if (path === '/en' || path === '/en/' || path === '/en/index' || path === '/en/index.html') return '/';
      if (path.startsWith('/en/fluorescent')) return rawPath.replace(/^\/en/i, '') || '/fluorescent/';
      const stripped = rawPath.replace(/^\/en/i, '');
      return (stripped || '/') + search;
    } else {
      if (path === '/' || path === '/index' || path === '/index.html') return '/en/';
      if (path === '/products' || path === '/products.html') return '/en/products' + search;
      if (path === '/about' || path === '/about.html') return '/en/about';
      if (path === '/contact' || path === '/contact.html') return '/en/contact' + search;
      if (path.startsWith('/fluorescent')) return '/en' + rawPath;
      const slug = path.replace(/^\//, '').replace(/\.html$/, '');
      if (BILINGUAL_SLUGS.has(slug)) return '/en' + rawPath;
      return '/en/';
    }
  }

  function isCurrentPath(href) {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const full = path + search;
    const target = href.toLowerCase();

    if (target.includes('?')) {
      return full === target || full === target.replace('/products?', '/products.html?');
    }
    if (target === '/' || target === '/index.html') {
      return path === '/' || path === '/index' || path === '/index.html';
    }
    if (target === '/en/') {
      return path === '/en' || path === '/en/' || path === '/en/index' || path === '/en/index.html';
    }
    if (target === '/products' || target === '/en/products') {
      return (path === target || path === target + '.html') && !search.includes('category=organic') && !search.includes('category=other');
    }
    return path === target || path === target + '.html' || path.startsWith(target + '/');
  }

  const NAV_ITEMS_ZH = [
    { label: '首頁', href: '/' },
    { label: '有機顏料', href: '/products?category=organic' },
    { label: '溶劑染料', href: '/solvent-dyes-showcase' },
    { label: '螢光增白劑', href: '/fluorescent/' },
    { label: '其他', href: '/products?category=other' },
    { label: '產品總表', href: '/products' },
    { label: '關於我們', href: '/about' },
  ];

  const NAV_ITEMS_EN = [
    { label: 'Home', href: '/en/' },
    { label: 'Organic Pigments', href: '/en/products?category=organic' },
    { label: 'Solvent Dyes', href: '/en/solvent-dyes-showcase' },
    { label: 'Brighteners', href: '/en/fluorescent/' },
    { label: 'Catalog', href: '/en/products' },
    { label: 'About', href: '/en/about' },
  ];

  const SUBNAV_GROUPS = [
    {
      prefix: '/pa-mxd6/',
      label: 'MXD6 專區',
      items: [
        { label: 'MXD6 首頁', href: '/PA-MXD6/indexMXD6.html' },
        { label: '關於 MXD6', href: '/PA-MXD6/about.html' },
        { label: '產品中心', href: '/PA-MXD6/products.html' },
        { label: '應用 / 數據', href: '/PA-MXD6/solutions.html' },
      ],
    },
    {
      prefix: '/fluorescent/',
      label: '螢光增白劑專區',
      items: [
        { label: '產品總覽', href: '/fluorescent/index.html' },
        { label: 'KCB', href: '/fluorescent/kcb.html' },
        { label: 'OB', href: '/fluorescent/ob.html' },
        { label: 'OB-1', href: '/fluorescent/ob-1.html' },
        { label: 'KSN', href: '/fluorescent/ksn.html' },
        { label: 'FP-127', href: '/fluorescent/127.html' },
      ],
    },
    {
      prefix: '/en/fluorescent/',
      label: 'Optical Brighteners',
      items: [
        { label: 'Overview', href: '/en/fluorescent/index.html' },
        { label: 'KCB', href: '/en/fluorescent/kcb.html' },
        { label: 'OB', href: '/en/fluorescent/ob.html' },
        { label: 'OB-1', href: '/en/fluorescent/ob-1.html' },
        { label: 'KSN', href: '/en/fluorescent/ksn.html' },
        { label: 'FP-127', href: '/en/fluorescent/127.html' },
      ],
    },
  ];

  function getSubnavHtml() {
    const path = window.location.pathname.toLowerCase();
    const group = SUBNAV_GROUPS.find((g) => path.startsWith(g.prefix));
    if (!group) return '';

    const links = group.items
      .map((item) => {
        const target = item.href.toLowerCase();
        const targetNoExt = target.replace(/\.html$/, '');
        const isIndex = target.endsWith('/index.html') && (path === group.prefix || path === target);
        const isActive = isIndex || path === target || path === targetNoExt;
        return `<a href="${item.href}" class="${isActive ? 'active' : ''}">${item.label}</a>`;
      })
      .join('');

    return `
      <div class="hs-subnav" role="navigation" aria-label="${group.label}導覽">
        <div class="hs-subnav-inner">
          <span class="hs-subnav-label">${group.label}</span>
          <div class="hs-subnav-links">${links}</div>
        </div>
      </div>
    `;
  }

  class CustomHeader extends HTMLElement {
    connectedCallback() {
      const isEn = isEnglishPage();
      const title = this.getAttribute('page-title');
      const subtitle = this.getAttribute('page-subtitle') || '';
      const badge = this.getAttribute('page-badge') || '';
      const compact = this.getAttribute('compact') === 'true';

      const navItems = isEn ? NAV_ITEMS_EN : NAV_ITEMS_ZH;
      const homeHref = isEn ? '/en/' : '/';
      const contactHref = isEn ? '/en/contact' : '/contact';
      const contactLabel = isEn ? 'Contact Us' : '聯絡我們';
      const brandName = isEn ? 'Hwa Shine' : '華翔興業';
      const brandSub = isEn ? 'SPECIALTY CHEMICALS' : 'HWA SHINE CHEMICALS';
      const langHref = getAlternateLangUrl(isEn);
      const langLabel = isEn ? '繁體中文' : 'EN';

      const navLinksHtml = navItems
        .map((item) => {
          const activeClass = isCurrentPath(item.href) ? 'active' : '';
          return `<li><a href="${item.href}" class="${activeClass}">${item.label}</a></li>`;
        })
        .join('');

      const mobileLinksHtml = navItems
        .map((item) => {
          const activeClass = isCurrentPath(item.href) ? 'active' : '';
          return `<a href="${item.href}" class="${activeClass}">${item.label}</a>`;
        })
        .join('');

      const heroHtml =
        !compact && title
          ? `
            <section class="hs-hero">
              <div class="hs-hero-inner">
                ${badge ? `<div class="hs-hero-badge">${badge}</div>` : ''}
                <h1>${title}</h1>
                ${subtitle ? `<p>${subtitle}</p>` : ''}
              </div>
            </section>
          `
          : '';

      this.innerHTML = `
        <header class="hs-navbar" role="banner">
          <div class="hs-navbar-inner">
            <a href="${homeHref}" class="hs-brand" aria-label="${isEn ? 'Hwa Shine Co., Ltd. Home' : '華翔興業有限公司首頁'}">
              <span class="hs-brand-mark">HS</span>
              <span class="hs-brand-text">
                <span class="hs-brand-name">${brandName}</span>
                <span class="hs-brand-sub">${brandSub}</span>
              </span>
            </a>

            <nav aria-label="${isEn ? 'Main navigation' : '主導航列'}">
              <ul class="hs-nav-links">
                ${navLinksHtml}
                <li><a href="${langHref}" class="hs-lang-btn" title="${isEn ? '切換至繁體中文版' : 'Switch to English'}">🌐 ${langLabel}</a></li>
                <li><a href="${contactHref}" class="hs-nav-cta">${contactLabel}</a></li>
              </ul>
            </nav>

            <button type="button" class="hs-mobile-toggle" aria-label="${isEn ? 'Toggle navigation' : '切換導航選單'}" aria-expanded="false">
              ☰
            </button>
          </div>

          <div class="hs-mobile-menu" role="navigation" aria-label="${isEn ? 'Mobile navigation' : '行動版導航列'}">
            ${mobileLinksHtml}
            <a href="${contactHref}">${contactLabel}</a>
            <a href="${langHref}" style="color:#38bdf8 !important;">🌐 ${isEn ? '切換至繁體中文版' : 'English Version (EN)'}</a>
          </div>
        </header>
        ${getSubnavHtml()}
        ${heroHtml}
      `;

      const toggleBtn = this.querySelector('.hs-mobile-toggle');
      const mobileMenu = this.querySelector('.hs-mobile-menu');
      if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
          const isOpen = mobileMenu.classList.toggle('open');
          toggleBtn.setAttribute('aria-expanded', String(isOpen));
          toggleBtn.textContent = isOpen ? '✕' : '☰';
        });
      }
    }
  }

  if (!customElements.get('custom-header')) {
    customElements.define('custom-header', CustomHeader);
  }

  class CustomFooter extends HTMLElement {
    connectedCallback() {
      const isEn = isEnglishPage();

      if (isEn) {
        this.innerHTML = `
          <footer class="hs-footer" role="contentinfo">
            <div class="hs-footer-inner">
              <div>
                <div class="hs-brand" style="margin-bottom: 1rem;">
                  <span class="hs-brand-mark">HS</span>
                  <span class="hs-brand-text">
                    <span class="hs-brand-name">Hwa Shine Co., Ltd.</span>
                    <span class="hs-brand-sub">TAIWAN SPECIALTY CHEMICALS</span>
                  </span>
                </div>
                <p>Trusted Taiwan supplier of high-performance organic pigments, solvent dyes, optical brighteners, MXD6 barrier nylon, and photoinitiator TPO for coatings, inks, plastics, and engineering polymers.</p>
              </div>

              <div>
                <h4>Product Lines</h4>
                <ul>
                  <li><a href="/en/products?category=organic">Organic Pigments (40 Grades)</a></li>
                  <li><a href="/en/solvent-dyes-showcase">Solvent Dyes (35 Grades)</a></li>
                  <li><a href="/en/fluorescent/">Optical Brighteners (5 Grades)</a></li>
                  <li><a href="/en/products?category=other">MXD6 Nylon &amp; Photoinitiator TPO</a></li>
                </ul>
              </div>

              <div>
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="/en/">Home</a></li>
                  <li><a href="/en/about">About Us</a></li>
                  <li><a href="/en/products">Product Catalog</a></li>
                  <li><a href="/en/contact">Contact &amp; Samples</a></li>
                  <li><a href="/">繁體中文版 (Traditional Chinese)</a></li>
                </ul>
              </div>

              <div>
                <h4>Contact Information</h4>
                <p><strong>Address:</strong> 37F., No. 7, Sec. 5, Xinyi Rd., Xinyi Dist., Taipei City 110, Taiwan</p>
                <p><strong>Phone:</strong> <a href="tel:+886277337581">+886-2-7733-7581</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@hwashine.tw">info@hwashine.tw</a></p>
              </div>
            </div>

            <div class="hs-footer-bottom">
              <span>&copy; 2026 Hwa Shine Co., Ltd. All Rights Reserved.</span>
            </div>
          </footer>
        `;
        return;
      }

      this.innerHTML = `
        <footer class="hs-footer" role="contentinfo">
          <div class="hs-footer-inner">
            <div>
              <div class="hs-brand" style="margin-bottom: 1rem;">
                <span class="hs-brand-mark">HS</span>
                <span class="hs-brand-text">
                  <span class="hs-brand-name">華翔興業有限公司</span>
                  <span class="hs-brand-sub">HWA SHINE CO., LTD.</span>
                </span>
              </div>
              <p>專注於高性能有機顏料、溶劑染料、螢光增白劑、MXD6 阻氣尼龍與光起始劑，為塗料、油墨、塑膠與工程材料產業提供專業色彩與機能解決方案。</p>
            </div>

            <div>
              <h4>產品線</h4>
              <ul>
                <li><a href="/products?category=organic">有機顏料</a></li>
                <li><a href="/solvent-dyes-showcase">溶劑染料</a></li>
                <li><a href="/fluorescent/">螢光增白劑</a></li>
                <li><a href="/PA-MXD6/indexMXD6">MXD6 阻氣尼龍</a></li>
                <li><a href="/products?category=other">光起始劑 TPO &amp; 其他</a></li>
              </ul>
            </div>

            <div>
              <h4>網站導覽</h4>
              <ul>
                <li><a href="/">首頁</a></li>
                <li><a href="/about">關於我們</a></li>
                <li><a href="/products">產品中心</a></li>
                <li><a href="/tool.html">顏料資料分析工具</a></li>
                <li><a href="/en/">English Version</a></li>
                <li><a href="/contact">聯絡我們</a></li>
              </ul>
            </div>

            <div>
              <h4>聯絡資訊</h4>
              <p><strong>地址：</strong>臺北市信義區信義路5段7號37樓</p>
              <p><strong>電話：</strong><a href="tel:0277337581">02-77337581</a></p>
              <p><strong>Email：</strong><a href="mailto:info@hwashine.tw">info@hwashine.tw</a></p>
            </div>
          </div>

          <div class="hs-footer-bottom">
            <span>&copy; 2026 華翔興業有限公司 Hwa Shine Co., Ltd. 版權所有</span>
          </div>
        </footer>
      `;
    }
  }

  if (!customElements.get('custom-footer')) {
    customElements.define('custom-footer', CustomFooter);
  }
})();
