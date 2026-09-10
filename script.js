(() => {
  'use strict';

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- copy button ---------- */
  const copyBtn = document.getElementById('copyBtn');
  const codeEl = document.getElementById('filenameCode');
  if (copyBtn && codeEl) {
    copyBtn.addEventListener('click', async () => {
      const text = codeEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const range = document.createRange();
        range.selectNodeContents(codeEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();
      }
      copyBtn.textContent = copyBtn.dataset.done;
      copyBtn.classList.add('is-copied');
      window.clearTimeout(copyBtn._resetTimer);
      copyBtn._resetTimer = window.setTimeout(() => {
        copyBtn.textContent = copyBtn.dataset.default;
        copyBtn.classList.remove('is-copied');
      }, 1800);
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- screenshot placeholder fallback ---------- */
  document.querySelectorAll('.shot-frame img').forEach((img) => {
    const showPlaceholder = () => {
      img.style.display = 'none';
      const placeholder = img.nextElementSibling;
      if (placeholder) placeholder.hidden = false;
    };
    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    } else {
      img.addEventListener('error', showPlaceholder);
    }
  });

  /* ---------- to-top button ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.hidden = window.scrollY < 480;
    }, { passive: true });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
