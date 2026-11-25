// ==========================================================================
// 華翔興業 Hwa Shine — 全站共用元件 (Header / Nav / Page Hero / Footer)
// 單一檔案維護，全站頁面自動同步更新
// ==========================================================================

(function () {
  // 確保 body 套用深色工業風主類名
  if (document.body) {
    document.body.classList.add('hs-dark');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('hs-dark');
    });
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
    if (target === '/products') {
      return (path === '/products' || path === '/products.html') && !search.includes('category=organic') && !search.includes('category=other');
    }
    return path === target || path === target + '.html' || path.startsWith(target + '/');
  }

  const NAV_ITEMS = [
    { label: '首頁', href: '/' },
    { label: '有機顏料', href: '/products?category=organic' },
    { label: '溶劑染料', href: '/solvent-dyes-showcase' },
    { label: '螢光增白劑', href: '/fluorescent/' },
    { label: '其他', href: '/products?category=other' },
    { label: '產品總表', href: '/products' },
    { label: '關於我們', href: '/about' },
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

  // ==========================================
  // 1. 全站共用頁首 & 導航列 (<custom-header>)
  //    屬性：
  //      page-title="頁面標題"       (有設定時自動渲染工業風 Hero Banner)
  //      page-subtitle="副標題說明"
  //      page-badge="分類標籤"
  //      compact="true"              (僅顯示頂部導航列，不渲染 Hero Banner)
  // ==========================================
  class CustomHeader extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute('page-title');
      const subtitle = this.getAttribute('page-subtitle') || '';
      const badge = this.getAttribute('page-badge') || '';
      const compact = this.getAttribute('compact') === 'true';

      const navLinksHtml = NAV_ITEMS.map((item) => {
        const activeClass = isCurrentPath(item.href) ? 'active' : '';
        return `<li><a href="${item.href}" class="${activeClass}">${item.label}</a></li>`;
      }).join('');

      const mobileLinksHtml = NAV_ITEMS.map((item) => {
        const activeClass = isCurrentPath(item.href) ? 'active' : '';
        return `<a href="${item.href}" class="${activeClass}">${item.label}</a>`;
      }).join('');

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
            <a href="/" class="hs-brand" aria-label="華翔興業有限公司首頁">
              <span class="hs-brand-mark">HS</span>
              <span class="hs-brand-text">
                <span class="hs-brand-name">華翔興業</span>
                <span class="hs-brand-sub">HWA SHINE CHEMICALS</span>
              </span>
            </a>

            <nav aria-label="主導航列">
              <ul class="hs-nav-links">
                ${navLinksHtml}
                <li><a href="/contact" class="hs-nav-cta">聯絡我們</a></li>
              </ul>
            </nav>

            <button type="button" class="hs-mobile-toggle" aria-label="切換導航選單" aria-expanded="false">
              ☰
            </button>
          </div>

          <div class="hs-mobile-menu" role="navigation" aria-label="行動版導航列">
            ${mobileLinksHtml}
            <a href="/contact">聯絡我們</a>
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

  // ==========================================
  // 2. 全站共用頁尾 (<custom-footer>)
  // ==========================================
  class CustomFooter extends HTMLElement {
    connectedCallback() {
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
                <li><a href="/products?category=other">光起始劑 TPO & 其他</a></li>
              </ul>
            </div>

            <div>
              <h4>網站導覽</h4>
              <ul>
                <li><a href="/">首頁</a></li>
                <li><a href="/about">關於我們</a></li>
                <li><a href="/products">產品中心</a></li>
                <li><a href="/tool.html">顏料資料分析工具</a></li>
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
