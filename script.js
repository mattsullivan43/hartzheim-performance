/* Hartzheim Performance — site interactions */
(() => {
  'use strict';

  /* ---------- header scrolled state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) {
        closeMenu();
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        menu.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* ---------- scroll reveal ---------- */
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- year ---------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- contact form — submits via FormSubmit AJAX ---------- */
  const form = document.getElementById('consultForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if (data._honey) return; // bot trap

      if (!data.name || !data.email || !data.goal) {
        if (note) {
          note.textContent = 'Please fill in name, email, and goal.';
          note.className = 'form-note is-error';
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      if (note) { note.textContent = ''; note.className = 'form-note'; }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error('bad status');
        if (note) {
          note.textContent = 'Got it — Jack will be in touch within 24 hours.';
          note.className = 'form-note is-success';
        }
        form.reset();
      } catch (err) {
        if (note) {
          note.textContent = 'Something went wrong. Email jack@hartzheimperformance.com directly.';
          note.className = 'form-note is-error';
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      }
    });
  }
})();
