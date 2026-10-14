/* =========================================================
   Atchutha Sai Kiran — portfolio
   A scroll "descent" from the sky to the forest floor, told
   with real footage: a real eagle in flight, then real
   photographs of clouds, canopy, forest and floor that
   cross-fade as you descend. Content (projects, skills) is
   data-driven and the projects sync live with GitHub.
   ========================================================= */
(() => {
  const GH_USER = 'Shanmuk05';
  const NB = (repo, file) => `https://nbviewer.org/github/${GH_USER}/${repo}/blob/main/${encodeURIComponent(file)}`;
  const GH = repo => `https://github.com/${GH_USER}/${repo}`;

  /* ---------------- data ---------------- */
  const CATEGORIES = {
    ai:   { label: 'AI & ML',              art: 'linear-gradient(135deg,#1b0f3d,#4b3a8f 55%,#7fb3e6)', glow: '#7fb3e6' },
    data: { label: 'Data Analytics',       art: 'linear-gradient(135deg,#08303a,#14705e 55%,#58d39b)', glow: '#58d39b' },
    dev:  { label: 'Backend & Full-Stack', art: 'linear-gradient(135deg,#3a1c48,#a2486a 55%,#f3a571)', glow: '#f3a571' },
    qa:   { label: 'QA Automation',        art: 'linear-gradient(135deg,#123a2c,#3d7f57 55%,#b7e3a1)', glow: '#b7e3a1' },
  };

  const PROJECTS = [
    { repo: 'visual_product_matcher', title: 'Visual Product Matcher', cat: 'ai', emoji: '🔍', featured: true,
      desc: "Shoppers often have a picture but no keyword. This app embeds an uploaded image with OpenAI's CLIP (ViT-B/32) and uses cosine similarity to find the most visually similar products in a catalog.",
      impact: '~90% match accuracy from a single uploaded image — now runs live, entirely in your browser',
      tech: ['Python', 'OpenAI CLIP', 'PyTorch', 'Streamlit', 'transformers.js'],
      live: 'https://shanmuk05.github.io/visual_product_matcher/' },
    { repo: 'Advanced-RAG-AI-project-', title: 'Advanced RAG Document Assistant', cat: 'ai', emoji: '🧠', featured: true,
      desc: 'A fully local retrieval-augmented generation system that answers questions about company documentation. Pipeline: chunking (600 / 120 overlap), MiniLM embeddings, ChromaDB with BM25, cross-encoder reranking, then Llama 3 via Ollama.',
      impact: 'Private, on-device answers grounded in reranked context',
      tech: ['LangChain', 'ChromaDB', 'Sentence-Transformers', 'Ollama · Llama 3', 'Gradio'] },
    { repo: 'Netflixcase-study', title: 'Netflix Content Analytics & BI', cat: 'data', emoji: '🎬', featured: true,
      desc: "EDA on Netflix's global catalog to guide content investment, covering content type, genre, country and release-year trends, plus how quickly titles are added to the platform.",
      impact: 'Recommended regional investment in India, South Korea and Latin America',
      tech: ['Python', 'pandas', 'Matplotlib', 'Seaborn', 'EDA'],
      analysis: NB('Netflixcase-study', 'Netflixcase_study.ipynb') },
    { repo: 'Netflixcase-study', id: 'yulu', title: 'Yulu Demand Analytics', cat: 'data', emoji: '🚲', featured: true,
      desc: 'What drives electric-cycle rentals? I ran EDA and hypothesis tests (t-test, ANOVA, Chi-square) on 10,800+ rental records to separate the effects of weather, season and working days.',
      impact: 'Season and weather proven significant (p < 0.001), supporting dynamic pricing and targeted marketing',
      tech: ['Python', 'SciPy', 'Hypothesis Testing', 'ANOVA', 'Chi-Square'],
      analysis: NB('Netflixcase-study', 'yulu_casestudy.ipynb') },
    { repo: 'credit-card-fraud-detection', title: 'Fraud Guard AI', cat: 'ai', emoji: '🛡️',
      desc: 'End-to-end credit card fraud detection. A Random Forest / XGBoost model trained on SMOTE-balanced data with 18+ engineered features, served by a FastAPI /predict endpoint with a React + TypeScript dashboard.',
      impact: 'Real-time transaction scoring through a REST API',
      tech: ['XGBoost', 'SMOTE', 'FastAPI', 'React', 'TypeScript', 'Firebase'] },
    { repo: 'car_price_prediction', title: 'Car Price Prediction System', cat: 'ai', emoji: '🚗',
      desc: 'Full-stack ML app that estimates car prices from engine size, horsepower, curb weight, peak RPM and mileage. It compares Linear Regression, Decision Tree and Random Forest models.',
      impact: 'Random Forest was the best model; now runs live entirely in your browser',
      tech: ['scikit-learn', 'FastAPI', 'React (Vite)', 'Tailwind'],
      live: 'https://shanmuk05.github.io/car_price_prediction/',
      analysis: NB('car_price_prediction', 'CarPricePrediction(Comparision).ipynb') },
    { repo: 'peblo-ai-quiz-engine', title: 'Peblo AI Quiz Engine', cat: 'ai', emoji: '📚',
      desc: 'Backend that ingests educational content (text or PDF), splits it into learning units and uses an LLM to generate adaptive quizzes. It also has quiz-delivery and student-evaluation layers.',
      impact: 'Turns raw study material into structured, gradable quizzes',
      tech: ['FastAPI', 'OpenAI API', 'LangChain', 'SQLAlchemy', 'PyMuPDF', 'Docker'] },
    { repo: 'aerofit-case-study', title: 'Aerofit Customer Analytics', cat: 'data', emoji: '🏋️',
      desc: 'Customer profiling for a fitness-equipment brand: demographics, product lines and purchase patterns used to find high-value segments.',
      impact: 'Customers aged 25–40 drive most sales, so I recommended targeted promotions and loyalty programs',
      tech: ['Python', 'pandas', 'Seaborn', 'Customer Segmentation'],
      analysis: NB('aerofit-case-study', 'areofitcasestudy.ipynb') },
    { repo: 'taskflow-api', title: 'TaskFlow: Team Task Manager', cat: 'dev', emoji: '✅',
      desc: 'Full-stack REST API for projects and tasks with role-based access (Admin / Member), JWT auth, bcrypt password hashing, Helmet security headers and input validation.',
      impact: 'PostgreSQL-backed, one-click deployable on Render',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Render'] },
    { repo: 'Finance_backend', title: 'Finance Dashboard API', cat: 'dev', emoji: '💰',
      desc: 'Finance backend with Admin, Analyst and Viewer roles. It covers CRUD for financial records, filtering and pagination, and dashboard APIs for income, expenses, net balance, category totals and monthly trends.',
      impact: 'Role-based permissions enforced on every endpoint',
      tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'express-validator'] },
    { repo: 'lyftr-backend-assignment', title: 'Secure Webhook Ingestion Service', cat: 'dev', emoji: '🔐',
      desc: 'FastAPI service that verifies HMAC-SHA256-signed webhooks, stores messages idempotently with duplicate detection, and exposes liveness/readiness probes, stats and a Prometheus-style metrics endpoint.',
      impact: 'Production patterns: signatures, idempotency, observability',
      tech: ['FastAPI', 'Python', 'Docker Compose', 'HMAC', 'Metrics'] },
    { repo: 'Frugal_Testing_Quiz_App', title: 'Quiz App Test Automation', cat: 'qa', emoji: '🧪',
      desc: 'Java + Selenium WebDriver suite (Maven) that runs a quiz web app end-to-end in Chrome, from the landing page through every question to the result page, with a screenshot at each step.',
      impact: 'Repeatable, documented UI regression run',
      tech: ['Java', 'Selenium', 'Maven', 'ChromeDriver'],
      live: `https://${GH_USER.toLowerCase()}.github.io/Frugal_Testing_Quiz_App/` },
  ];

  const SKILLS = [
    { icon: '📊', title: 'Analysis & Statistics', items: ['EDA', 'Statistical Modelling', 'Hypothesis Testing', 't-test · ANOVA · χ²', 'Excel', 'Requirements Gathering'] },
    { icon: '🤖', title: 'AI & Machine Learning', items: ['Machine Learning', 'NLP', 'Computer Vision (CLIP)', 'RAG & LLMs', 'scikit-learn', 'XGBoost'] },
    { icon: '🐍', title: 'Languages & Data', items: ['Python', 'SQL', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
    { icon: '📈', title: 'BI & Cloud', items: ['Power BI', 'Tableau', 'BigQuery', 'Google Cloud (GCP)'] },
    { icon: '🛠️', title: 'Build & Ship', items: ['FastAPI', 'Streamlit', 'Node.js / Express', 'React', 'Docker', 'Selenium', 'Git & GitHub'] },
  ];

  /* ---------------- helpers ---------------- */
  const $ = s => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const key = (frames, d) => {
    if (d <= frames[0][0]) return frames[0][1];
    for (let i = 1; i < frames.length; i++) {
      if (d <= frames[i][0]) { const [d0, v0] = frames[i - 1], [d1, v1] = frames[i]; return lerp(v0, v1, (d - d0) / (d1 - d0)); }
    }
    return frames[frames.length - 1][1];
  };
  let prand = 7; const rand = () => { prand = (prand * 16807) % 2147483647; return (prand - 1) / 2147483646; };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator.connection && navigator.connection.saveData) || false;

  /* ---------------- content: skills ---------------- */
  const skillGrid = $('#skillGrid');
  SKILLS.forEach((s, i) => {
    const c = el('article', 'glass skill-card reveal');
    c.style.transitionDelay = (i * .08) + 's';
    c.innerHTML = `<span class="icon">${s.icon}</span><h3>${s.title}</h3><div class="chips">${s.items.map(x => `<span>${x}</span>`).join('')}</div>`;
    skillGrid.appendChild(c);
  });

  /* ---------------- content: projects ---------------- */
  const grid = $('#projectGrid');
  function artPattern() {
    let d = '';
    const cx = 60 + rand() * 280, cy = 20 + rand() * 90;
    for (let r = 1; r < 9; r++) {
      const rx = r * 26 + rand() * 8, ry = r * 15 + rand() * 6;
      d += `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${ry.toFixed(0)}" transform="rotate(${(rand() * 30 - 15).toFixed(0)} ${cx.toFixed(0)} ${cy.toFixed(0)})"/>`;
    }
    return `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;opacity:.3"><g fill="none" stroke="#fff" stroke-width="1">${d}</g></svg>`;
  }
  function card(p, meta) {
    const cat = CATEGORIES[p.cat] || CATEGORIES.dev;
    const c = el('article', 'glass project reveal');
    c.dataset.cat = p.cat;
    c.dataset.repo = p.repo;
    c.style.setProperty('--glow', cat.glow);
    const links = [];
    if (p.live) links.push(`<a class="live" href="${p.live}" target="_blank" rel="noopener">Live demo</a>`);
    if (p.analysis) links.push(`<a href="${p.analysis}" target="_blank" rel="noopener">📓 Analysis ↗</a>`);
    links.push(`<a class="code" href="${GH(p.repo)}" target="_blank" rel="noopener">⌥ Code ↗</a>`);
    c.innerHTML = `
      <div class="p-art" style="background:${cat.art}">
        ${artPattern()}
        <span class="p-shine"></span>
        ${p.featured ? '<span class="p-feat">★ Featured</span>' : ''}
        <span class="p-cat">${cat.label}</span>
        <span class="p-emoji">${p.emoji || '🌲'}</span>
      </div>
      <div class="p-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        ${p.impact ? `<div class="p-impact">${esc(p.impact)}</div>` : ''}
        ${p.tech?.length ? `<div class="chips">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
        <div class="p-meta" data-meta="${esc(p.repo)}">${meta || ''}</div>
        <div class="p-links">${links.join('')}</div>
      </div>`;
    return c;
  }
  PROJECTS.forEach(p => grid.appendChild(card(p)));

  // filters
  const filters = $('#filters');
  let activeFilter = 'all';
  function renderFilters() {
    const counts = { all: grid.children.length };
    [...grid.children].forEach(c => counts[c.dataset.cat] = (counts[c.dataset.cat] || 0) + 1);
    filters.innerHTML = '';
    [['all', 'All projects'], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.label])].forEach(([k, label]) => {
      if (!counts[k]) return;
      const b = el('button', k === activeFilter ? 'on' : '', `${label}<small>${counts[k]}</small>`);
      b.setAttribute('role', 'tab');
      b.onclick = () => { activeFilter = k; applyFilter(); renderFilters(); };
      filters.appendChild(b);
    });
  }
  function applyFilter() {
    [...grid.children].forEach(c => c.classList.toggle('hide', activeFilter !== 'all' && c.dataset.cat !== activeFilter));
  }
  renderFilters();

  // live GitHub sync: fresh repo count, languages, update dates, new repos, auto live links
  (async () => {
    try {
      let repos;
      try { repos = JSON.parse(sessionStorage.getItem('gh-repos') || 'null'); } catch (e) { }
      if (!repos) {
        const r = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
        if (!r.ok) return;
        repos = await r.json();
        try { sessionStorage.setItem('gh-repos', JSON.stringify(repos)); } catch (e) { }
      }
      const visible = repos.filter(r => !r.fork && r.name.toLowerCase() !== `${GH_USER}.github.io`.toLowerCase());
      $('#repoCount').dataset.count = visible.length;
      $('#repoCount').textContent = visible.length;
      const known = new Set(PROJECTS.map(p => p.repo));
      visible.forEach(r => {
        const when = new Date(r.pushed_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
        const meta = `${r.language ? '● ' + r.language + ' · ' : ''}updated ${when}${r.stargazers_count ? ' · ★ ' + r.stargazers_count : ''}`;
        document.querySelectorAll(`[data-meta="${CSS.escape(r.name)}"]`).forEach(m => m.textContent = meta);
        if (r.homepage && known.has(r.name)) {
          grid.querySelectorAll(`.project[data-repo="${CSS.escape(r.name)}"]`).forEach(cardEl => {
            const links = cardEl.querySelector('.p-links');
            if (links && !links.querySelector('.live') && !links.querySelector('[href*="nbviewer"]')) {
              const a = el('a', 'live'); a.href = r.homepage; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Live demo';
              links.insertBefore(a, links.firstChild);
            }
          });
        }
        if (!known.has(r.name)) {
          const lang = (r.language || '').toLowerCase();
          const cat = /jupyter/.test(lang) ? 'data' : /python/.test(lang) ? 'ai' : 'dev';
          const c = card({
            repo: r.name, cat, emoji: '🌱',
            title: r.name.replace(/[-_]+/g, ' ').replace(/\b\w/g, m => m.toUpperCase()).trim(),
            desc: r.description || 'A fresh project growing in the forest. Open the code to explore it.',
            tech: [r.language, ...(r.topics || [])].filter(Boolean),
            live: r.homepage || (r.has_pages ? `https://${GH_USER.toLowerCase()}.github.io/${r.name}/` : ''),
          }, meta);
          c.classList.add('in');
          grid.appendChild(c);
        }
      });
      renderFilters(); applyFilter(); bindTilt();
    } catch (e) { /* offline or rate-limited: curated list still shows */ }
  })();

  // 3D tilt on project cards
  function bindTilt() {
    if (reduced || matchMedia('(hover: none)').matches) return;
    grid.querySelectorAll('.project:not([data-tilt])').forEach(c => {
      c.dataset.tilt = 1;
      c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
      });
      c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });
  }
  bindTilt();

  /* ---------------- altimeter ---------------- */
  const sections = [...document.querySelectorAll('main > section')];
  const ALTS = sections.map(s => +s.dataset.alt);
  const track = $('#altTrack');
  const ticks = sections.map(s => {
    const li = el('li'), a = el('a', '', `<span class="lbl">${s.dataset.label} · ${(+s.dataset.alt).toLocaleString('en-US')} ft</span><span class="pip"></span>`);
    a.href = '#' + s.id; a.setAttribute('aria-label', s.dataset.label);
    li.appendChild(a); track.appendChild(li); return a;
  });
  const altValue = $('#altValue');

  /* ---------------- reveal + counters ---------------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll?.('[data-count]').forEach(countUp);
    io.unobserve(en.target);
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(r => io.observe(r));
  observeReveals();
  new MutationObserver(observeReveals).observe(grid, { childList: true });
  function countUp(b) {
    const end = +b.dataset.count, pre = b.dataset.prefix || '', suf = b.dataset.suffix || '';
    if (reduced) { b.textContent = pre + end.toLocaleString('en-US') + suf; return; }
    const t0 = performance.now();
    const step = t => {
      const k = Math.min(1, (t - t0) / 1400), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      b.textContent = pre + v.toLocaleString('en-US') + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- fireflies ---------------- */
  const cv = $('#fireflies'), ctx = cv.getContext('2d');
  let flies = [], fliesOn = false;
  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flies = Array.from({ length: innerWidth < 640 ? 32 : 64 }, () => ({
      x: Math.random() * innerWidth, y: innerHeight * (.25 + Math.random() * .75),
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .3, p: Math.random() * 6.28, s: 1 + Math.random() * 2.2,
    }));
  }
  function drawFlies() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    flies.forEach(f => {
      f.p += .03; f.vx += (Math.random() - .5) * .04; f.vy += (Math.random() - .5) * .04;
      f.vx *= .98; f.vy *= .98; f.x += f.vx; f.y += f.vy;
      if (f.x < -10) f.x = innerWidth + 10; if (f.x > innerWidth + 10) f.x = -10;
      if (f.y < innerHeight * .15) f.vy += .02; if (f.y > innerHeight + 10) f.y = innerHeight * .3;
      const a = .35 + .65 * Math.max(0, Math.sin(f.p));
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.s * 7);
      g.addColorStop(0, `rgba(255,244,170,${a})`); g.addColorStop(.25, `rgba(214,255,120,${a * .45})`); g.addColorStop(1, 'rgba(180,255,100,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, f.s * 7, 0, 6.29); ctx.fill();
    });
  }

  /* ---------------- the descent (real photo/video scenes) ---------------- */
  const scenes = [...document.querySelectorAll('#scenes .scene')].sort((a, b) => +a.dataset.i - +b.dataset.i);
  const vid = $('#skyvid');
  // theme-color per section, for the mobile browser chrome
  const THEME = ['#2a4a63', '#4a6076', '#2e4a39', '#28402f', '#132418', '#0c1a12', '#070f0b'];
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  /* ----- the real eagle that flies with you down the pages ----- */
  const flyEagle = $('#flyeagle');
  // screen anchors per section (% of viewport), zig-zagging so it crosses the view
  const EAGLE_ANCHORS = [
    { x: 72, y: 38 }, // 0 hero (hidden — the hero video already has the eagle)
    { x: 15, y: 13 }, // 1 clouds
    { x: 76, y: 18 }, // 2 canopy
    { x: 22, y: 24 }, // 3 treetops
    { x: 75, y: 20 }, // 4 forest
    { x: 20, y: 22 }, // 5 undergrowth
    { x: 80, y: 56 }, // 6 landing (settles into the undergrowth, right of the text)
  ];
  const eaglePos = { x: EAGLE_ANCHORS[0].x, y: EAGLE_ANCHORS[0].y };
  let eagleBank = 0, eagleW = 0;

  /* ----- eagle cry sound (unlocked on first interaction; mutable) ----- */
  const cry = $('#eaglecry'); if (cry) cry.volume = 0.55;
  const soundBtn = $('#soundBtn');
  let soundOn = true; try { soundOn = localStorage.getItem('eagleSound') !== 'off'; } catch (e) {}
  let audioUnlocked = false, lastCry = 0;
  const paintSoundBtn = () => { if (!soundBtn) return; soundBtn.textContent = soundOn ? '🔊' : '🔇'; soundBtn.classList.toggle('off', !soundOn); };
  function playCry(force) {
    if (!cry || !soundOn || !audioUnlocked) return;
    const now = performance.now();
    if (!force && now - lastCry < 4200) return;
    lastCry = now;
    try { cry.currentTime = 0; cry.play().catch(() => {}); } catch (e) {}
  }
  // Audio can only start from a real user gesture (a click/tap/key — NOT a
  // scroll). On the first such gesture we actually play the cry; only if that
  // succeeds do we mark it unlocked, so later section screeches are allowed.
  function unlockAudio() {
    if (audioUnlocked || !cry || !soundOn) return;
    try { cry.currentTime = 0; cry.play().then(() => { audioUnlocked = true; lastCry = performance.now(); }).catch(() => {}); } catch (e) {}
  }
  ['pointerdown', 'touchstart', 'keydown', 'click'].forEach(ev => addEventListener(ev, unlockAudio, { capture: true, passive: true }));
  if (soundBtn) soundBtn.onclick = () => {
    soundOn = !soundOn; try { localStorage.setItem('eagleSound', soundOn ? 'on' : 'off'); } catch (e) {}
    paintSoundBtn();
    if (soundOn) { audioUnlocked = true; lastCry = 0; playCry(true); } else if (cry) { try { cry.pause(); } catch (e) {} }
  };
  paintSoundBtn();
  let lastActive = -1;

  // honour reduced-motion / data-saver: freeze the video on its poster frame
  if ((reduced || saveData) && vid) { try { vid.removeAttribute('autoplay'); vid.pause(); vid.load(); } catch (e) {} }

  let tops = [], vh = innerHeight, vw = innerWidth, lastD = -1;
  const measure = () => { vh = innerHeight; vw = innerWidth; tops = sections.map(s => s.offsetTop); eagleW = flyEagle ? flyEagle.offsetWidth : 230; sizeCanvas(); lastD = -1; };

  function depth() {
    const y = scrollY, max = document.documentElement.scrollHeight - vh;
    if (y >= max - 1) return sections.length - 1;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (y >= tops[i]) {
        const next = i + 1 < sections.length ? Math.min(tops[i + 1], max) : max;
        const span = Math.max(1, (i + 1 === sections.length - 1 ? max : next) - tops[i]);
        return Math.min(sections.length - 1, i + clamp((y - tops[i]) / span, 0, 1));
      }
    }
    return 0;
  }

  function frame() {
    requestAnimationFrame(frame);
    const d = depth();
    const moved = Math.abs(d - lastD) > 1e-4;
    if (moved) {
      lastD = d;
      // cross-fade the scenes by proximity to the current depth, with a gentle parallax zoom
      scenes.forEach((sc, i) => {
        const dist = Math.abs(d - i);
        const op = clamp(1.18 - dist, 0, 1);
        sc.style.opacity = op.toFixed(3);
        sc.style.visibility = op <= 0.002 ? 'hidden' : 'visible';
        if (op > 0.002) sc.style.transform = `scale(${(1.06 + Math.abs(d - i) * 0.05).toFixed(3)}) translateY(${((d - i) * -2.4).toFixed(2)}vh)`;
      });
      themeMeta.content = THEME[clamp(Math.round(d), 0, THEME.length - 1)];
      // pause the video once it's scrolled well past (saves CPU/battery)
      if (vid && !reduced && !saveData) { if (d > 1.6) { if (!vid.paused) vid.pause(); } else if (vid.paused) vid.play().catch(() => {}); }
      // altimeter
      const i = Math.floor(d), alt = i >= ALTS.length - 1 ? ALTS[ALTS.length - 1] : lerp(ALTS[i], ALTS[i + 1], d - i);
      altValue.textContent = Math.round(alt).toLocaleString('en-US');
      const active = Math.min(sections.length - 1, Math.round(d));
      ticks.forEach((a, k) => a.classList.toggle('active', k === active));
      // the eagle screeches as it arrives over a new section
      if (active !== lastActive) { if (lastActive >= 0 && active >= 1) playCry(); lastActive = active; }
    }

    // the flying eagle glides toward its per-section anchor, banking and bobbing
    if (flyEagle) {
      const i = Math.floor(clamp(d, 0, EAGLE_ANCHORS.length - 1));
      const j = Math.min(i + 1, EAGLE_ANCHORS.length - 1);
      const f = clamp(d - i, 0, 1);
      const tx = lerp(EAGLE_ANCHORS[i].x, EAGLE_ANCHORS[j].x, f);
      const ty = lerp(EAGLE_ANCHORS[i].y, EAGLE_ANCHORS[j].y, f);
      const px = eaglePos.x; eaglePos.x += (tx - eaglePos.x) * 0.05; eaglePos.y += (ty - eaglePos.y) * 0.05;
      const vxp = eaglePos.x - px;                // horizontal drift → facing + bank
      const face = (EAGLE_ANCHORS[j].x - EAGLE_ANCHORS[i].x) >= 0 ? 1 : -1;
      const targetBank = clamp(vxp * 2.2, -14, 14);
      eagleBank += (targetBank - eagleBank) * 0.06;
      const now = performance.now();
      const bob = reduced ? 0 : Math.sin(now / 900) * 1.1;         // gentle rise/fall
      const flap = reduced ? 1 : 1 + Math.sin(now / 320) * 0.05;   // subtle wing-beat
      const op = key([[0, 0], [0.55, 0], [1.05, 1]], d);           // hero shows the video eagle; cut-out appears after
      flyEagle.style.opacity = op.toFixed(3);
      if (op > 0.002) {
        const xpx = eaglePos.x / 100 * vw - eagleW / 2;
        const ypx = (eaglePos.y + bob) / 100 * vh;
        flyEagle.style.transform = `translate(${xpx.toFixed(1)}px, ${ypx.toFixed(1)}px) rotate(${eagleBank.toFixed(2)}deg) scaleX(${face}) scaleY(${flap.toFixed(3)})`;
      }
    }

    // fireflies on the forest floor
    const ffo = key([[4.2, 0], [5, .5], [5.8, 1]], d);
    cv.style.opacity = ffo;
    if (ffo > 0.01 && !reduced) drawFlies(); else if (fliesOn) ctx.clearRect(0, 0, innerWidth, innerHeight);
    fliesOn = ffo > 0.01;
  }

  addEventListener('resize', measure);
  new ResizeObserver(measure).observe(document.querySelector('main'));
  addEventListener('load', measure);
  measure();
  requestAnimationFrame(frame);

  $('#ascend').onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  $('#year').textContent = new Date().getFullYear();
  requestAnimationFrame(() => document.querySelectorAll('.hero .reveal').forEach(r => r.classList.add('in')));
})();
