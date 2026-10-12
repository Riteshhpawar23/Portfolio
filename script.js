/* ═══════════════════════════════════════════════════
   Portfolio — Main Script
   ═══════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── DOM Refs ─────────────────────────────────────
  const html = document.documentElement;
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  const themeToggle = document.getElementById('theme-toggle');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const typedEl = document.getElementById('typed-text');
  const overlay = document.getElementById('page-transition-overlay');

  // ─── Theme Toggle ────────────────────────────────
  const THEME_KEY = 'portfolio-theme';

  function getTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { }
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    saveTheme(theme);
  }

  // Load saved theme or respect system preference
  const saved = getTheme();
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // ─── Navbar Scroll Effect ─────────────────────────
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  }, { passive: true });

  // ─── Active Nav Link ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        allNavLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));

  // ─── Mobile Menu ──────────────────────────────────
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // ─── Page Transition Helper ───────────────────────
  let isTransitioning = false;

  function smoothNavigateTo(targetId) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Phase 1: curtain slides IN
    overlay.classList.remove('out');
    overlay.classList.add('in');

    // After curtain covers screen, jump-scroll then slide OUT
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        // Temporarily disable smooth scroll for the instant jump behind the curtain
        html.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: 'start' });
        // Re-enable smooth scroll
        requestAnimationFrame(() => { html.style.scrollBehavior = ''; });
      }

      // Phase 2: curtain slides OUT
      overlay.classList.remove('in');
      overlay.classList.add('out');

      setTimeout(() => {
        overlay.classList.remove('out');
        isTransitioning = false;
      }, 460); // wait for all panels to finish exiting
    }, 460); // wait for panels to fully cover screen
  }

  // Close menu when a link is clicked + fire transition
  allNavLinks.forEach(link => {
    link.addEventListener('click', e => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothNavigateTo(href.slice(1));
      }
    });
  });

  // ─── Scroll Reveal (all variants) ────────────────
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-children';
  const reveals = document.querySelectorAll(revealSelectors);

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // ─── Skill Bar Animation ─────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        fill.classList.add('animate');
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(f => skillObserver.observe(f));

  // ─── Typing Effect ───────────────────────────────
  const titles = [
    'AI Engineer',
    'AI & Data Science Engineer',
    'AI Agents & LLM Specialist',
    'Deep Learning & NLP Engineer'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPE_SPEED = 90;
  const DELETE_SPEED = 50;
  const PAUSE_END = 1800;
  const PAUSE_START = 400;

  function typeLoop() {
    const current = titles[titleIndex];
    if (!isDeleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, PAUSE_END);
        return;
      }
      setTimeout(typeLoop, TYPE_SPEED);
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeLoop, PAUSE_START);
        return;
      }
      setTimeout(typeLoop, DELETE_SPEED);
    }
  }

  typeLoop();

  // ─── Back To Top ──────────────────────────────────
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Contact Form ─────────────────────────────────
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simple email pattern check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you, ' + name + '! Your message has been received. I will get back to you soon.');
    contactForm.reset();
  });

  // ─── Skill Marquee Coverflow Effect ──────────────
  const skillScroller = document.querySelector('.skills-scroller');
  const skillCards = document.querySelectorAll('.skill-card');

  function updateSkillCards() {
    if (!skillScroller || skillCards.length === 0) return;
    const scrollerRect = skillScroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;

    skillCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(scrollerCenter - cardCenter);
      
      const maxDist = 300;
      let scale = 1.1 - (dist / maxDist) * 0.35;
      scale = Math.max(0.75, Math.min(scale, 1.1));
      
      let opacity = 1 - (dist / (maxDist * 1.5)) * 0.5;
      opacity = Math.max(0.4, Math.min(opacity, 1));

      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = Math.round(scale * 100);

      if (dist < 130) {
        card.classList.add('active-skill');
      } else {
        card.classList.remove('active-skill');
      }
    });

    requestAnimationFrame(updateSkillCards);
  }

  if (skillScroller) {
    updateSkillCards();
  }

  // ─── Neural Network Canvas Lines ────────────────
  const nnContainer = document.getElementById('neural-net');
  const canvas = document.getElementById('nn-canvas');
  
  if (nnContainer && canvas) {
    const ctx = canvas.getContext('2d');
    let connections = [];
    let isMobile = false;
    let dpr = window.devicePixelRatio || 1;
    
    function cacheConnections() {
      connections = [];
      const rect = nnContainer.getBoundingClientRect();
      isMobile = window.innerWidth <= 900;
      
      const layer1 = Array.from(nnContainer.querySelectorAll('[data-layer="1"] .nn-node'));
      const layer2 = Array.from(nnContainer.querySelectorAll('[data-layer="2"] .nn-node'));
      const layer3 = Array.from(nnContainer.querySelectorAll('[data-layer="3"] .nn-node'));
      
      const overlap = 20;

      function getEdges(el) {
        const elRect = el.getBoundingClientRect();
        return {
          right: { x: (elRect.right - rect.left) - overlap, y: (elRect.top - rect.top) + elRect.height / 2 },
          left: { x: (elRect.left - rect.left) + overlap, y: (elRect.top - rect.top) + elRect.height / 2 },
          top: { x: (elRect.left - rect.left) + elRect.width / 2, y: (elRect.top - rect.top) + overlap },
          bottom: { x: (elRect.left - rect.left) + elRect.width / 2, y: (elRect.bottom - rect.top) - overlap }
        };
      }
      
      layer1.forEach(n1 => {
        const edges1 = getEdges(n1);
        const start = isMobile ? edges1.bottom : edges1.right;
        layer2.forEach(n2 => {
          const edges2 = getEdges(n2);
          const end = isMobile ? edges2.top : edges2.left;
          connections.push({ start, end });
        });
      });
      
      layer2.forEach(n2 => {
        const edges2 = getEdges(n2);
        const start = isMobile ? edges2.bottom : edges2.right;
        layer3.forEach(n3 => {
          const edges3 = getEdges(n3);
          const end = isMobile ? edges3.top : edges3.left;
          connections.push({ start, end });
        });
      });
    }

    function resizeCanvas() {
      const rect = nnContainer.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      cacheConnections();
    }
    
    function drawPaths() {
      ctx.beginPath();
      connections.forEach(conn => {
        ctx.moveTo(conn.start.x, conn.start.y);
        if (isMobile) {
          const ctrlY = conn.start.y + (conn.end.y - conn.start.y) / 2;
          ctx.bezierCurveTo(conn.start.x, ctrlY, conn.end.x, ctrlY, conn.end.x, conn.end.y);
        } else {
          const ctrlX = conn.start.x + (conn.end.x - conn.start.x) / 2;
          ctx.bezierCurveTo(ctrlX, conn.start.y, ctrlX, conn.end.y, conn.end.x, conn.end.y);
        }
      });
      ctx.stroke();
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width*2, canvas.height*2);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Draw static background tracks
      ctx.strokeStyle = isDark ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 107, 0, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      drawPaths();
      
      // Draw animated flowing data lines
      ctx.strokeStyle = isDark ? 'rgba(255, 107, 0, 0.8)' : 'rgba(255, 107, 0, 0.9)';
      ctx.lineWidth = 2;
      ctx.setLineDash([15, 30]);
      ctx.lineDashOffset = -performance.now() / 25;
      drawPaths();
      
      requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    document.getElementById('theme-toggle').addEventListener('click', () => { setTimeout(resizeCanvas, 50); });
    
    const nnObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        resizeCanvas();
        setTimeout(resizeCanvas, 500); // Wait for fonts/layout to settle
      }
    });
    nnObserver.observe(nnContainer);
    
    animate();
  }

  // ─── Floating Lines Background Canvas ────────────────
  const floatCanvases = document.querySelectorAll('.floating-lines-bg');
  
  floatCanvases.forEach(floatCanvas => {
    const fCtx = floatCanvas.getContext('2d');
    let fWidth, fHeight;
    let floatingLines = [];
    let fTime = 0;
    
    // Create 15 lines with parameters matching React-bits configuration
    for(let i=0; i<15; i++) {
      floatingLines.push({
        yOffset: (Math.random() * 1200) - 600, 
        amplitude: 30 + Math.random() * 60, // bend strength 
        frequency: 0.001 + Math.random() * 0.0015, // bend radius
        speed: 0.0003 + Math.random() * 0.0005, // animation speed
        phase: Math.random() * Math.PI * 2,
        thickness: 0.9 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.5
      });
    }

    function initFloatCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const parent = floatCanvas.parentElement;
      fWidth = parent.clientWidth || window.innerWidth;
      fHeight = parent.clientHeight || window.innerHeight;
      floatCanvas.width = fWidth * dpr;
      floatCanvas.height = fHeight * dpr;
      floatCanvas.style.width = `${fWidth}px`;
      floatCanvas.style.height = `${fHeight}px`;
      fCtx.scale(dpr, dpr);
    }

    function drawFloatingLines() {
      fCtx.clearRect(0, 0, fWidth * 2, fHeight * 2);
      
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const grad = fCtx.createLinearGradient(0, 0, fWidth, 0);
      grad.addColorStop(0, isDark ? 'rgba(13, 1, 14, 0.1)' : 'rgba(250, 83, 41, 0.05)');
      grad.addColorStop(1, isDark ? 'rgba(250, 83, 41, 0.7)' : 'rgba(250, 83, 41, 0.4)');
      
      fCtx.strokeStyle = grad;
      fCtx.shadowBlur = 12;
      fCtx.shadowColor = 'rgba(250, 83, 41, 0.4)';

      floatingLines.forEach(line => {
        fCtx.beginPath();
        // Parallax using bounding rect relative to screen Center to avoid pushing lines offscreen in lower sections
        const rect = floatCanvas.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const parallaxOffset = (centerY - viewportCenter) * 0.2; 
        
        for (let x = 0; x <= fWidth + 50; x += 30) {
          const y = (fHeight / 2) + line.yOffset 
                    - parallaxOffset
                    + Math.sin(x * line.frequency + fTime * line.speed + line.phase) * line.amplitude
                    + Math.sin(x * line.frequency * 0.5 - fTime * line.speed * 1.5) * (line.amplitude * 0.5);
          if (x === 0) fCtx.moveTo(x, y);
          else fCtx.lineTo(x, y);
        }
        
        fCtx.lineWidth = line.thickness;
        fCtx.globalAlpha = line.opacity;
        fCtx.stroke();
      });
      
      fTime += 16;
      requestAnimationFrame(drawFloatingLines);
    }

    window.addEventListener('resize', initFloatCanvas);
    initFloatCanvas();
    drawFloatingLines();
  });

})();
