/* =========================================================
   Eagle's Descent — portfolio of Atchutha Sai Kiran
   The scenery is driven by "d": how many sections deep you are
   (0 = sky, 6 = forest floor), so long sections descend slowly.
   ========================================================= */
(() => {
  const GH_USER = 'Shanmuk05';
  const NB = (repo, file) => `https://nbviewer.org/github/${GH_USER}/${repo}/blob/main/${encodeURIComponent(file)}`;
  const GH = repo => `https://github.com/${GH_USER}/${repo}`;

  /* ---------------- data ---------------- */
  const CATEGORIES = {
    ai:   { label: 'AI & ML',            art: 'linear-gradient(135deg,#1b0f3d,#4b3a8f 55%,#7fb3e6)' },
    data: { label: 'Data Analytics',     art: 'linear-gradient(135deg,#08303a,#14705e 55%,#58d39b)' },
    dev:  { label: 'Backend & Full-Stack', art: 'linear-gradient(135deg,#3a1c48,#a2486a 55%,#f3a571)' },
    qa:   { label: 'QA Automation',      art: 'linear-gradient(135deg,#123a2c,#3d7f57 55%,#b7e3a1)' },
  };

  const PROJECTS = [
    { repo: 'visual_product_matcher', title: 'Visual Product Matcher', cat: 'ai', emoji: '🔍', featured: true,
      desc: "Shoppers often have a picture but no keyword. This Streamlit app embeds an uploaded image with OpenAI's CLIP (ViT-B/32) and uses cosine similarity to find the most visually similar products in a catalog.",
      impact: '~90% match accuracy from a single uploaded image, so products are easier to find',
      tech: ['Python', 'OpenAI CLIP', 'PyTorch', 'Streamlit', 'scikit-learn'] },
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
      impact: 'Random Forest was the best model; served through a FastAPI backend and a React frontend',
      tech: ['scikit-learn', 'FastAPI', 'React (Vite)', 'Tailwind'],
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
      impact: 'PostgreSQL-backed and ready to deploy on Railway',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Railway'] },
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
  // piecewise-linear keyframes: [[d, value], ...]
  const key = (frames, d) => {
    if (d <= frames[0][0]) return frames[0][1];
    for (let i = 1; i < frames.length; i++) {
      if (d <= frames[i][0]) {
        const [d0, v0] = frames[i - 1], [d1, v1] = frames[i];
        return lerp(v0, v1, (d - d0) / (d1 - d0));
      }
    }
    return frames[frames.length - 1][1];
  };
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',')})`; };
  const keyColor = (frames, d) => {
    if (d <= frames[0][0]) return mix(frames[0][1], frames[0][1], 0);
    for (let i = 1; i < frames.length; i++) if (d <= frames[i][0]) {
      const [d0, c0] = frames[i - 1], [d1, c1] = frames[i];
      return mix(c0, c1, (d - d0) / (d1 - d0));
    }
    const last = frames[frames.length - 1][1]; return mix(last, last, 0);
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- build the world ---------------- */
  // shared gradients
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute"><defs>
    <linearGradient id="cloudGrad" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="100"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f6eef0"/><stop offset="1" stop-color="#d9d4e6"/></linearGradient>
    <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d6f9c"/><stop offset="1" stop-color="#5b6b8c"/></linearGradient>
    <linearGradient id="mtnGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d5f86"/><stop offset="1" stop-color="#465a74"/></linearGradient>
    <linearGradient id="trunkGrad" x1="0" x2="1"><stop offset="0" stop-color="#050c09"/><stop offset=".45" stop-color="#1c2a1f"/><stop offset="1" stop-color="#040907"/></linearGradient>
  </defs></svg>`);

  function cloudSVG(w) {
    const n = 5 + Math.floor(rand() * 4);
    let c = '';
    for (let i = 0; i < n; i++) {
      const cx = 40 + (i / (n - 1)) * 220 + (rand() - .5) * 20;
      const r = 26 + rand() * 38 * Math.sin(Math.PI * (i + .5) / n);
      c += `<circle cx="${cx.toFixed(1)}" cy="${(88 - r * .55).toFixed(1)}" r="${r.toFixed(1)}"/>`;
    }
    return `<svg viewBox="0 0 300 110" style="width:${w}px"><g fill="url(#cloudGrad)">${c}<rect x="30" y="70" width="240" height="28" rx="14"/></g></svg>`;
  }

  // stars (visible only at the first light of dawn)
  const stars = $('#stars');
  for (let i = 0; i < 70; i++) {
    const s = el('i'); s.style.left = rand() * 100 + '%'; s.style.top = rand() * 45 + '%';
    s.style.animationDelay = rand() * 3 + 's'; s.style.opacity = .3 + rand() * .7; stars.appendChild(s);
  }

  // drifting clouds in the high sky
  const drift = $('#driftClouds');
  for (let i = 0; i < 7; i++) {
    const c = el('div', 'cloud', cloudSVG(140 + rand() * 220));
    c.style.top = (4 + rand() * 50) + 'vh'; c.style.opacity = .55 + rand() * .4;
    const dur = 70 + rand() * 80; c.style.animationDuration = dur + 's'; c.style.animationDelay = -rand() * dur + 's';
    drift.appendChild(c);
  }

  // a far flock of birds
  const birds = $('#birds');
  for (let i = 0; i < 6; i++) {
    const b = el('div', 'bird'); b.style.top = (rand() * 60) + '%';
    const dur = 40 + rand() * 20; b.style.animationDuration = dur + 's'; b.style.animationDelay = -(8 + i * 1.3) + 's';
    b.style.transform = `scale(${.5 + rand() * .6})`; birds.appendChild(b);
  }

  // mountains
  function ridge(w, h, base, amp, steps) {
    let d = `M0,${h}`, y = base;
    for (let i = 0; i <= steps; i++) {
      y = clamp(y + (rand() - .5) * amp, base - amp * 1.4, base + amp * .6);
      d += ` L${(i / steps * w).toFixed(0)},${y.toFixed(0)}`;
    }
    return d + ` L${w},${h} Z`;
  }
  $('#mountains').innerHTML = `<svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" style="width:100%;height:46vh;display:block">
    <path d="${ridge(1600, 420, 170, 90, 26)}" fill="url(#mtnGrad)" opacity=".75"/>
    <path d="${ridge(1600, 420, 250, 70, 34)}" fill="url(#mtnGrad2)" opacity=".9"/></svg>`;

  // forest rows
  function pine(x, base, h) {
    const w = h * (.38 + rand() * .1), tiers = 4;
    let left = [], right = [];
    for (let t = 0; t < tiers; t++) {
      const yb = base - h * (t / tiers) * .92, wt = w * (1 - t / tiers * .78) / 2;
      const yt = base - h * ((t + 1) / tiers) * .92;
      left.push(`${(x - wt).toFixed(1)},${(yb - h * .04).toFixed(1)}`, `${(x - wt * .62).toFixed(1)},${(yt + h * .02).toFixed(1)}`);
      right.unshift(`${(x + wt * .62).toFixed(1)},${(yt + h * .02).toFixed(1)}`, `${(x + wt).toFixed(1)},${(yb - h * .04).toFixed(1)}`);
    }
    return `M${(x - w * .08).toFixed(1)},${base} L${left.join(' L')} L${x.toFixed(1)},${(base - h).toFixed(1)} L${right.join(' L')} L${(x + w * .08).toFixed(1)},${base} Z`;
  }
  function forestRow(count, minH, maxH, H = 420) {
    let d = '';
    const trees = [];
    for (let i = 0; i < count; i++) trees.push({ x: (i + rand() * .8) / count * 1640 - 20, h: minH + rand() * (maxH - minH) });
    trees.sort((a, b) => a.h - b.h);
    trees.forEach(t => { d += pine(t.x, H - 20 - rand() * 10, t.h); });
    return `${d} M0,${H - 34} L1600,${H - 34} L1600,${H} L0,${H} Z`;
  }

  const FOREST = [
    { color: '#4f6f78', keys: [[0, 80], [1, 62], [2, 42], [3, 22], [4, 2], [6, -20]], zoom: .02, trees: [70, 70, 160], fog: true },
    { color: '#34584f', keys: [[0, 88], [1, 74], [2, 54], [3, 32], [4, 4], [6, -30]], zoom: .035, trees: [52, 100, 220], fog: true },
    { color: '#1f4537', keys: [[0, 97], [1, 87], [2, 68], [3, 44], [4, -6], [6, -45]], zoom: .05, trees: [38, 150, 300], fog: true },
    { color: '#12301f', keys: [[0, 108], [1, 101], [2, 86], [3, 62], [4, -8], [6, -70]], zoom: .07, trees: [24, 220, 380], interior: true },
  ];
  const forestHost = $('#forestLayers');
  const forestEls = FOREST.map((f, i) => {
    const wrap = el('div', 'forest');
    const fill = f.interior
      ? `background:linear-gradient(180deg,${f.color} 0%,#0d2418 25%,#081a11 60%,#030a07 100%)`
      : `background:${f.color}`;
    wrap.innerHTML = `<svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" style="height:${30 + i * 8}vh"><path fill="${f.color}" d="${forestRow(...f.trees)}"/></svg>
      <div class="fill" style="${fill}">${f.interior ? interiorTrunks() : ''}</div>${f.fog ? '<div class="fog"></div>' : ''}`;
    forestHost.appendChild(wrap);
    return wrap;
  });
  function interiorTrunks() {
    let r = '';
    for (let i = 0; i < 26; i++) {
      const x = rand() * 1600, w = 6 + rand() * 22;
      r += `<rect x="${x.toFixed(0)}" y="0" width="${w.toFixed(0)}" height="1000" fill="url(#trunkGrad)" opacity="${(.25 + rand() * .5).toFixed(2)}"/>`;
    }
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMin slice" style="width:100%;height:100vh;opacity:.9">${r}</svg>`;
  }

  // two giant foreground pines framing the descent
  function giantPine(flip) {
    const H = 3000, W = 700, x = 350;
    let d = '';
    for (let t = 0; t < 16; t++) {
      const y = 40 + t * 150 + (rand() - .5) * 30, w = 120 + t * 22 + rand() * 50;
      d += `M${x},${y - 30} L${x - w},${y + 150 + rand() * 30} L${x - w * .4},${y + 120} L${x},${y + 135} L${x + w * .4},${y + 120} L${x + w},${y + 150 + rand() * 30} Z `;
    }
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin meet" style="width:100%;height:auto;${flip ? 'transform:scaleX(-1)' : ''}">
      <rect x="${x - 34}" y="0" width="68" height="${H}" fill="url(#trunkGrad)"/>
      <path d="${d}" fill="#06140d"/></svg>`;
  }
  const giants = [-1, 1].map(side => {
    const g = el('div', 'forest giant');
    g.style.cssText = `width:min(70vw,620px);left:auto;right:auto;${side < 0 ? 'left:-24vw' : 'right:-24vw'};filter:blur(1.5px)`;
    g.innerHTML = giantPine(side > 0);
    forestHost.appendChild(g);
    return g;
  });

  // ferns & mushrooms on the forest floor
  const floor = el('div', 'forest floor');
  (() => {
    let d = '', glow = '';
    for (let i = 0; i < 60; i++) {
      const x = rand() * 1600, h = 40 + rand() * 120, lean = (rand() - .5) * 60;
      d += `M${x},300 Q${x + lean * .4},${300 - h * .6} ${x + lean},${300 - h} Q${x + lean * .6 + 6},${300 - h * .5} ${x + 10},300 Z `;
    }
    for (let i = 0; i < 9; i++) {
      const x = 80 + rand() * 1440, s = .6 + rand() * .8;
      glow += `<g transform="translate(${x},${292}) scale(${s})"><rect x="-3" y="-26" width="6" height="26" fill="#d9cfb8"/>
        <path d="M-20,-24 Q0,-52 20,-24 Z" fill="#ffb067" style="filter:drop-shadow(0 0 8px #ffb067)"/></g>`;
    }
    floor.innerHTML = `<svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" style="height:32vh">
      <path d="${d}" fill="#030a06"/>${glow}<rect y="292" width="1600" height="10" fill="#030a06"/></svg><div class="fill" style="background:#030a06"></div>`;
  })();
  forestHost.appendChild(floor);

  // the cloud layer we dive through
  const pass = $('#cloudPass');
  for (let i = 0; i < 16; i++) {
    const c = el('div', 'cloud', cloudSVG(380 + rand() * 520));
    c.style.left = (rand() * 120 - 30) + 'vw'; c.style.top = (rand() * 130) + 'vh';
    c.style.opacity = .82 + rand() * .18;
    pass.appendChild(c);
  }

  /* ---------------- content ---------------- */
  // skills
  const skillGrid = $('#skillGrid');
  SKILLS.forEach((s, i) => {
    const c = el('article', 'glass skill-card reveal');
    c.style.transitionDelay = (i * .08) + 's';
    c.innerHTML = `<span class="icon">${s.icon}</span><h3>${s.title}</h3><div class="chips">${s.items.map(x => `<span>${x}</span>`).join('')}</div>`;
    skillGrid.appendChild(c);
  });

  // projects
  const grid = $('#projectGrid');
  function card(p, meta) {
    const cat = CATEGORIES[p.cat] || CATEGORIES.dev;
    const c = el('article', 'glass project reveal');
    c.dataset.cat = p.cat;
    const links = [];
    if (p.live) links.push(`<a class="live" href="${p.live}" target="_blank" rel="noopener">Live demo</a>`);
    if (p.analysis) links.push(`<a href="${p.analysis}" target="_blank" rel="noopener">📓 View analysis ↗</a>`);
    links.push(`<a href="${GH(p.repo)}" target="_blank" rel="noopener">⌥ Code ↗</a>`);
    c.innerHTML = `
      <div class="p-art" style="background:${cat.art}">
        ${artPattern()}
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
  function artPattern() {
    // tiny contour-line "topographic map" so each card looks like terrain seen from above
    let d = '';
    const cx = 60 + rand() * 280, cy = 20 + rand() * 90;
    for (let r = 1; r < 9; r++) {
      const rx = r * 26 + rand() * 8, ry = r * 15 + rand() * 6;
      d += `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${rx.toFixed(0)}" ry="${ry.toFixed(0)}" transform="rotate(${(rand() * 30 - 15).toFixed(0)} ${cx.toFixed(0)} ${cy.toFixed(0)})"/>`;
    }
    return `<svg viewBox="0 0 400 132" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;opacity:.28"><g fill="none" stroke="#fff" stroke-width="1">${d}</g></svg>`;
  }
  PROJECTS.forEach(p => grid.appendChild(card(p)));

  // filters
  const filters = $('#filters');
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
  let activeFilter = 'all';
  function applyFilter() {
    [...grid.children].forEach(c => c.classList.toggle('hide', activeFilter !== 'all' && c.dataset.cat !== activeFilter));
  }
  renderFilters();

  // live GitHub sync: fresh repo count, languages, update dates, and any new repos
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
        if (!known.has(r.name)) {
          // a new repo, so it shows up automatically
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
        c.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
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
    if (reduced) return;
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
    flies = Array.from({ length: innerWidth < 640 ? 34 : 70 }, () => ({
      x: Math.random() * innerWidth, y: innerHeight * (.25 + Math.random() * .75),
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .3, p: Math.random() * 6.28, s: 1 + Math.random() * 2.2,
    }));
  }
  function drawFlies(t) {
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

  /* ---------------- the descent ---------------- */
  const sky = $('#sky'), sun = $('#sun'), eagle = $('#eagle'), rays = $('#rays'), mountains = $('#mountains');
  const SKY = {
    top: [[0, '#16203b'], [.55, '#2f4f86'], [1.2, '#4b80b8'], [2, '#4f8fbd'], [3, '#3d7a86'], [4, '#123a2c'], [6, '#030b07']],
    mid: [[0, '#6b4f88'], [.55, '#b27c9a'], [1.2, '#9cc4e4'], [2, '#acd3ea'], [3, '#8ec2b0'], [4, '#1d4a36'], [6, '#06150e']],
    bot: [[0, '#f7a86f'], [.55, '#fbd3a0'], [1.2, '#f2e6cf'], [2, '#e2f0de'], [3, '#cfe6c4'], [4, '#2a5a40'], [6, '#0a1f15']],
  };
  let tops = [], lastY = -1, lastT = 0, lastD = -1, diveTimer, vh = innerHeight, vw = innerWidth, eagleW = 300;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const measure = () => {
    vh = innerHeight; vw = innerWidth;
    tops = sections.map(s => s.offsetTop);
    eagleW = eagle.offsetWidth;
    sizeCanvas();
    lastD = -1;
  };

  function depth() {
    const y = scrollY, max = document.documentElement.scrollHeight - vh;
    if (y >= max - 1) return sections.length - 1;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (y >= tops[i]) {
        const next = i + 1 < sections.length ? Math.min(tops[i + 1], max) : max;
        // the last section ends exactly at max scroll
        const span = Math.max(1, (i + 1 === sections.length - 1 ? max : next) - tops[i]);
        return Math.min(sections.length - 1, i + clamp((y - tops[i]) / span, 0, 1));
      }
    }
    return 0;
  }

  function frame(t) {
    requestAnimationFrame(frame);
    const d = depth();
    window.__d = d;
    // nothing moves once the eagle is gone, the page is still and no fireflies are out
    if (Math.abs(d - lastD) < 1e-4 && d > 1.2 && !fliesOn) { lastY = scrollY; lastT = t; return; }
    lastD = d;
    window.__d = d;
    // sky
    sky.style.background = `linear-gradient(180deg, ${keyColor(SKY.top, d)} 0%, ${keyColor(SKY.mid, d)} 52%, ${keyColor(SKY.bot, d)} 100%)`;
    themeMeta.content = keyColor(SKY.top, d);
    stars.style.opacity = key([[0, .7], [.6, 0]], d);
    sun.style.transform = `translateY(${key([[0, 0], [1, -40], [2, -75], [3, -110]], d)}vh) scale(${key([[0, 1], [1.5, 1.25]], d)})`;
    sun.style.opacity = key([[0, 1], [2.6, .8], [3.6, 0]], d);
    drift.style.transform = `translateY(${key([[0, 0], [1, -70], [2, -140]], d)}vh)`;
    birds.style.transform = `translateY(${key([[0, 0], [1, -50]], d)}vh)`;
    mountains.style.transform = `translateY(${key([[0, 56], [1, 42], [2, 30], [3, 16]], d)}vh)`;
    mountains.style.opacity = key([[0, 1], [3, .6]], d);

    FOREST.forEach((f, i) => {
      forestEls[i].style.transform = `translateY(${key(f.keys, d)}vh) scale(${1 + d * f.zoom})`;
    });
    const gy = key([[0, 170], [2, 128], [3, 78], [4, -40], [5, -150], [6, -235]], d);
    giants.forEach(g => g.style.transform = `translateY(${gy}vh) scale(${1 + d * .04})`);
    floor.style.transform = `translateY(${key([[0, 140], [4.6, 120], [6, 70]], d)}vh)`;

    pass.style.transform = `translateY(${key([[0, 95], [.5, 10], [1, -90], [1.6, -190]], d)}vh) scale(${key([[0, 1], [1, 1.5]], d)})`;
    pass.style.opacity = key([[0, .95], [.9, .95], [1.4, 0]], d);

    rays.style.opacity = key([[3.2, 0], [4, .95], [5, .7], [6, .35]], d);
    const ffo = key([[4.2, 0], [5, .55], [5.7, 1]], d);
    cv.style.opacity = ffo;
    if (ffo > 0.01 && !reduced) drawFlies(t); else if (fliesOn) ctx.clearRect(0, 0, innerWidth, innerHeight);
    fliesOn = ffo > 0.01;

    // eagle: glides at dawn, then folds its wings and dives into the clouds
    const bob = reduced ? 0 : Math.sin(t / 1200) * 1.2;
    const ex = key([[0, 64], [.5, 52], [1.1, 40]], d), ey = key([[0, 24], [.5, 48], [1.1, 82]], d) + bob * (1 - Math.min(1, d * 3));
    const es = key([[0, 1], [.5, .7], [1.1, .3]], d), er = key([[0, -4], [.25, 24], [1.1, 58]], d) + (reduced ? 0 : Math.sin(t / 1700) * 3);
    const w = eagleW;
    eagle.style.transform = `translate(${ex * vw / 100 - w / 2}px, ${ey * vh / 100 - w * .19}px) rotate(${er}deg) scale(${es})`;
    eagle.style.opacity = key([[0, 1], [.85, 1], [1.15, 0]], d);

    // altimeter
    const i = Math.floor(d), alt = i >= ALTS.length - 1 ? ALTS[ALTS.length - 1] : lerp(ALTS[i], ALTS[i + 1], d - i);
    altValue.textContent = Math.round(alt).toLocaleString('en-US');
    const active = Math.min(sections.length - 1, Math.round(d));
    ticks.forEach((a, k) => a.classList.toggle('active', k === active));

    // fold wings while the visitor scrolls fast
    const y = scrollY;
    if (lastY >= 0 && t - lastT > 0) {
      const v = (y - lastY) / (t - lastT);
      if (v > .9) { eagle.classList.add('diving'); clearTimeout(diveTimer); diveTimer = setTimeout(() => eagle.classList.remove('diving'), 380); }
    }
    lastY = y; lastT = t;
  }

  addEventListener('resize', measure);
  new ResizeObserver(measure).observe(document.querySelector('main'));
  addEventListener('load', measure);
  measure();
  requestAnimationFrame(frame);

  $('#ascend').onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  $('#year').textContent = new Date().getFullYear();
  // hero reveals immediately
  requestAnimationFrame(() => document.querySelectorAll('.hero .reveal').forEach(r => r.classList.add('in')));
})();
