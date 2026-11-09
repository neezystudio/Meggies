import './style.css';
import { services, projects, properties, testimonials } from './data.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    $('#preloader').classList.add('is-done');
    document.body.classList.add('is-loaded');
  }, prefersReducedMotion ? 0 : 900);
});

/* ---------- Render: services ---------- */
$('#services-grid').innerHTML = services
  .map(
    (s, i) => `
    <article class="service reveal" style="--d:${i * 0.1}s">
      <div class="service__icon">${s.icon}</div>
      <span class="service__num">0${i + 1}</span>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <ul>${s.items.map((it) => `<li>${it}</li>`).join('')}</ul>
    </article>`
  )
  .join('');

/* ---------- Render: projects ---------- */
const categoryLabel = { graphic: 'Graphic Design', web: 'Web', realestate: 'Real Estate' };

$('#work-grid').innerHTML = projects
  .map(
    (p, i) => `
    <article class="project reveal" data-category="${p.category}" data-index="${i}" tabindex="0" role="button" aria-label="Open ${p.title}">
      <div class="project__media" style="background:${p.art}">
        <span class="project__glyph">${p.glyph}</span>
        <span class="project__view">View</span>
      </div>
      <div class="project__meta">
        <div>
          <h3>${p.title}</h3>
          <span>${p.tag}</span>
        </div>
        <span class="project__cat">${categoryLabel[p.category]}</span>
      </div>
    </article>`
  )
  .join('');

/* ---------- Render: properties ---------- */
$('#properties-grid').innerHTML = properties
  .map(
    (p, i) => `
    <article class="property reveal" style="--d:${i * 0.1}s">
      <div class="property__media" style="background:${p.art}">
        <span class="property__status">${p.status}</span>
        <svg class="property__house" viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>
      </div>
      <div class="property__body">
        <p class="property__price">${p.price}</p>
        <h3>${p.title}</h3>
        <p class="property__loc">${p.location}</p>
        <ul class="property__specs">
          <li><strong>${p.beds}</strong> Beds</li>
          <li><strong>${p.baths}</strong> Baths</li>
          <li><strong>${p.area}</strong></li>
        </ul>
        <a href="#contact" class="property__link" data-enquire="${p.title}">Enquire →</a>
      </div>
    </article>`
  )
  .join('');

/* ---------- Header + mobile nav ---------- */
const header = $('#header');
const burger = $('#burger');
const nav = $('#nav');

const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', open);
});
$$('a', nav).forEach((a) =>
  a.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Active nav link based on section in view
const sections = $$('main section[id]');
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$('a', nav).forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => navObserver.observe(s));

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
$$('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Counters ---------- */
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const duration = prefersReducedMotion ? 0 : 1600;
      const start = performance.now();
      const tick = (now) => {
        const t = duration ? Math.min((now - start) / duration, 1) : 1;
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + '+';
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
$$('[data-count]').forEach((el) => countObserver.observe(el));

/* ---------- Typed word rotator ---------- */
const typedEl = $('#typed');
const words = ['websites', 'homes', 'identities', 'experiences'];
if (!prefersReducedMotion) {
  let wi = 0;
  let ci = words[0].length;
  let deleting = true;
  const loop = () => {
    const word = words[wi];
    ci += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, ci);
    let delay = deleting ? 55 : 95;
    if (!deleting && ci === word.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      delay = 300;
    }
    setTimeout(loop, delay);
  };
  setTimeout(loop, 3200);
}

/* ---------- Portfolio filter ---------- */
$('#filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  $$('.filter').forEach((b) => b.classList.toggle('is-active', b === btn));
  const f = btn.dataset.filter;
  $$('.project').forEach((card) => {
    const show = f === 'all' || card.dataset.category === f;
    card.classList.toggle('is-hidden', !show);
  });
});

/* ---------- Modal ---------- */
const modal = $('#modal');
const modalBody = $('#modal-body');
let lastFocus = null;

const openProject = (i) => {
  const p = projects[i];
  modalBody.innerHTML = `
    <div class="modal__media" style="background:${p.art}"><span>${p.glyph}</span></div>
    <div class="modal__text">
      <p class="eyebrow">${categoryLabel[p.category]} · ${p.year}</p>
      <h3>${p.title}</h3>
      <p class="modal__tag">${p.tag}</p>
      <p>${p.desc}</p>
      <a href="#contact" class="btn btn--gold" data-close>Start a similar project</a>
    </div>`;
  lastFocus = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('.modal__close', modal).focus();
};
const closeModal = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocus?.focus();
};

$('#work-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.project');
  if (card) openProject(+card.dataset.index);
});
$('#work-grid').addEventListener('keydown', (e) => {
  const card = e.target.closest('.project');
  if (card && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openProject(+card.dataset.index);
  }
});
modal.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

/* ---------- Property enquiry prefill ---------- */
$('#properties-grid').addEventListener('click', (e) => {
  const link = e.target.closest('[data-enquire]');
  if (!link) return;
  const form = $('#contact-form');
  form.service.value = form.service.options[3].value;
  form.message.value = `Hi Meggie, I'd like to know more about "${link.dataset.enquire}". Is it available for a viewing?`;
});

/* ---------- Testimonials slider ---------- */
const tEl = $('#testimonial');
const tDots = $('#testimonial-dots');
let tIndex = 0;
let tTimer;

tDots.innerHTML = testimonials
  .map((_, i) => `<button aria-label="Show testimonial ${i + 1}" data-i="${i}"></button>`)
  .join('');

const showTestimonial = (i) => {
  tIndex = i;
  const t = testimonials[i];
  tEl.classList.remove('is-in');
  setTimeout(() => {
    tEl.innerHTML = `
      <blockquote>“${t.quote}”</blockquote>
      <p class="testimonial__name">${t.name}</p>
      <p class="testimonial__role">${t.role}</p>`;
    tEl.classList.add('is-in');
  }, 250);
  $$('button', tDots).forEach((b, bi) => b.classList.toggle('is-active', bi === i));
  clearInterval(tTimer);
  tTimer = setInterval(() => showTestimonial((tIndex + 1) % testimonials.length), 6000);
};
tDots.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (b) showTestimonial(+b.dataset.i);
});
showTestimonial(0);

/* ---------- Contact form ---------- */
const form = $('#contact-form');
const status = $('#form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = $$('input, select, textarea', form);
  let valid = true;
  fields.forEach((f) => {
    const ok = f.checkValidity();
    f.closest('.field').classList.toggle('is-invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = 'Please fill in all fields with a valid email.';
    status.className = 'form__status is-error';
    return;
  }
  // TODO: connect to a form backend (e.g. Formspree, EmailJS, or a serverless function).
  const data = Object.fromEntries(new FormData(form));
  const subject = encodeURIComponent(`${data.service} enquiry from ${data.name}`);
  const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
  window.location.href = `mailto:hello@meggies.com?subject=${subject}&body=${body}`;
  status.textContent = 'Thank you! Your email app should open to send the message.';
  status.className = 'form__status is-success';
  form.reset();
});

/* ---------- Custom cursor + magnetic buttons ---------- */
if (!isTouch && !prefersReducedMotion) {
  const cursor = $('.cursor');
  const dot = $('.cursor-dot');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });
  const render = () => {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(render);
  };
  render();

  document.addEventListener('mouseover', (e) => {
    const hover = e.target.closest('a, button, .project, input, select, textarea');
    document.body.classList.toggle('cursor-hover', !!hover);
  });

  $$('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => (el.style.transform = ''));
  });

  // Subtle hero glow follows the pointer
  const glow = $('.hero__glow');
  $('.hero').addEventListener('mousemove', (e) => {
    glow.style.setProperty('--x', `${e.clientX}px`);
    glow.style.setProperty('--y', `${e.clientY}px`);
  });
} else {
  document.body.classList.add('no-cursor');
}

/* ---------- Misc ---------- */
$('#year').textContent = new Date().getFullYear();
