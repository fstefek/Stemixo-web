/* ════════════════════════════════════════════════
   STEMIXO — main.js
   ════════════════════════════════════════════════ */

/* ── Sticky header ─────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger menu ────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Zavři menu kliknutím na odkaz
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

/* ── Hero parallax / scale ─────────────────────── */
const heroBg = document.querySelector('.hero__bg');
if (heroBg) {
  window.addEventListener('load', () => heroBg.classList.add('loaded'));
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
}

/* ── Scroll fade-in ────────────────────────────── */
const fadeEls = document.querySelectorAll(
  '.service-card, .why-card, .about__text, .stat, .section-head, .contact__info, .contact__form, .gallery__item:not(.hidden)'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* ── Gallery: Load more ────────────────────────── */
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const hidden = document.querySelectorAll('.gallery__item.hidden');
    hidden.forEach((item, i) => {
      setTimeout(() => {
        item.classList.remove('hidden');
        item.classList.add('fade-up');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => item.classList.add('visible'));
        });
        observer.observe(item);
      }, i * 60);
    });
    loadMoreBtn.style.display = 'none';
  });
}

/* ── Lightbox ──────────────────────────────────── */
// Vytvoření lightbox elementu
const lb = document.createElement('div');
lb.id = 'lightbox';
lb.innerHTML = '<span class="lb-close">&times;</span><img alt="Realizace">';
document.body.appendChild(lb);

const lbImg = lb.querySelector('img');

document.getElementById('galleryGrid').addEventListener('click', (e) => {
  const item = e.target.closest('.gallery__item');
  if (!item) return;
  const src = item.querySelector('img').src;
  lbImg.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
});

const closeLightbox = () => {
  lb.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
};

lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── Contact form ──────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const phone   = form.querySelector('#phone').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const message = form.querySelector('#message').value.trim();

    const body = [
      `Jméno: ${name}`,
      `Telefon: ${phone}`,
      email ? `E-mail: ${email}` : '',
      service ? `Typ práce: ${service}` : '',
      `\nZpráva:\n${message}`,
    ].filter(Boolean).join('\n');

    const mailtoLink = `mailto:Filip.stefek@seznam.cz`
      + `?subject=${encodeURIComponent('Poptávka – ' + (service || 'Stemixo web'))}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
}

/* ── Smooth active nav on scroll ──────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.style.color = l.getAttribute('href') === `#${id}`
          ? 'white'
          : 'rgba(255,255,255,.75)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
