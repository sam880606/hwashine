// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', String(!open));
    });
    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth < 960) { nav.style.display = 'none'; toggle.setAttribute('aria-expanded', 'false'); }
    }));
  }

  // Chart on solutions page
  const chartEl = document.getElementById('barrierChart');
  if (chartEl) {
    import('chart.js').then(({ Chart }) => {
      const ctx = chartEl.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['PET', 'PA6', 'MXD6', 'EVOH(參考)'],
          datasets: [{
            label: '相對阻氧指數（高=好）',
            data: [1, 1.5, 3.2, 4.0],
            backgroundColor: ['#ddd','#bbb','#111','#888'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
          plugins: { legend: { display: false } }
        }
      });
      // Ensure canvas height on mobile
      chartEl.parentElement.style.minHeight = '220px';
    }).catch(() => { /* fail silent */ });
  }

  // Solutions page tag filter
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const filters = filterBar.querySelectorAll('.tag-filter');
    const articles = document.querySelectorAll('.solution-article');

    const applyFilter = (activeTag) => {
      // Filter articles
      articles.forEach(article => {
        const articleTags = article.dataset.tags || '';
        const shouldShow = activeTag === 'all' || articleTags.includes(activeTag);
        article.style.display = shouldShow ? 'block' : 'none';
      });

      // Update active state on buttons
      filters.forEach(f => {
        if (f.dataset.tag === activeTag) {
          f.classList.add('active');
        } else {
          f.classList.remove('active');
        }
      });
    };

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const activeTag = filter.dataset.tag;
        applyFilter(activeTag);
      });
    });

    // Check for filter in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filterTag = urlParams.get('filter');
    if (filterTag) {
      applyFilter(filterTag);
    }
  }

  // Contact form logic
  const form = document.getElementById('contactForm');
  const mailto = document.getElementById('mailtoFallback');
  if (form && mailto) {
    mailto.addEventListener('click', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const subject = encodeURIComponent('MXD6 洽詢 - ' + (fd.get('topic') || '一般詢問'));
      const body = encodeURIComponent(
        `公司/姓名: ${fd.get('name')||''}\nEmail: ${fd.get('email')||''}\n電話: ${fd.get('phone')||''}\n需求:\n${fd.get('message')||''}`
      );
      window.location.href = `mailto:info@hwashine.tw?subject=${subject}&body=${body}`;
    });
  }

  // Animation logic
  const animateOnLoad = document.querySelectorAll('.animate-on-load');
  animateOnLoad.forEach((el, i) => {
    const delay = (el.dataset.delay || i) * 100;
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });
  
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateOnScroll.forEach(el => {
    observer.observe(el);
  });
});