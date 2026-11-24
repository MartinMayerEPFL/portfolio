import { projects, translations } from './content.js';
import { engineDiagram, refreshEngineDiagrams } from './diagrams.js';

const grid = document.querySelector('#project-grid');
const dialog = document.querySelector('#project-dialog');
const detail = document.querySelector('#project-detail');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const header = document.querySelector('#site-header');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileNavigation = window.matchMedia('(max-width: 600px)');
let language = 'fr';
let filter = 'all';
let activeProject = null;
let lastProjectId = null;
let revealObserver;
let scrollPending = false;

try {
  const storedLanguage = localStorage.getItem('martin-portfolio-language');
  if (storedLanguage === 'fr' || storedLanguage === 'en') language = storedLanguage;
} catch { /* The site also works when browser storage is disabled. */ }

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

function projectTags(tags, limit = tags.length) {
  return `<ul class="project-tags">${tags.slice(0, limit).map(tag => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>`;
}

function projectVisual(project, isDetail = false) {
  const text = project[language];
  if (!project.image) return engineDiagram(translations[language]);
  const image = `<img src="assets/images/${project.image}.webp" alt="${escapeHtml(text.imageAlt)}" width="${project.width}" height="${project.height}" ${isDetail ? '' : 'loading="lazy"'} />`;
  return `${image}${!isDetail ? `<span class="image-label ${project.id === 'sisyphus' ? 'award-label' : ''}">${escapeHtml(text.label)}</span>` : ''}`;
}

function renderProjectCards() {
  revealObserver?.disconnect();
  const text = translations[language];
  grid.innerHTML = projects.map(project => {
    const copy = project[language];
    return `<article class="project-card reveal ${project.layout ? `project-${project.layout}` : ''} ${project.linkType === 'website' ? 'project-with-website' : ''}" data-category="${project.category}" data-id="${project.id}">
      <a class="project-link" href="Martin_Mayer_Portfolio.pdf#page=${project.page}" data-project="${project.id}" aria-label="${escapeHtml(`${text.discover} : ${copy.title}`)}">
        <div class="project-visual visual-${project.id}">${projectVisual(project)}</div>
        <div class="project-copy"><p class="project-category">${escapeHtml(copy.category)}</p><h3>${escapeHtml(copy.title)}</h3><p class="project-subtitle">${escapeHtml(copy.subtitle)}</p>
        ${project.layout ? `<p class="project-summary">${escapeHtml(copy.summary)}</p>` : ''}
        ${projectTags(project.tags, 3)}<span class="project-read">${text.discover}<span class="plus-icon" aria-hidden="true"></span></span></div>
      </a>${project.linkType === 'website' ? `<a class="project-website-link" href="${project.url}" target="_blank" rel="noopener noreferrer">${text.websiteLink}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h12v12H9zM3 9v12h12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></a>` : ''}</article>`;
  }).join('');
  applyFilter(false);
  observeReveals();
  refreshEngineDiagrams();
}

function applyFilter(animate = true) {
  let visible = 0;
  grid.dataset.filter = filter;
  for (const card of grid.querySelectorAll('.project-card')) {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    card.classList.remove('filter-enter');
    if (show) {
      if (animate) {
        card.classList.add('is-visible');
        card.style.animationDelay = `${visible * 45}ms`;
        void card.offsetWidth;
        card.classList.add('filter-enter');
      }
      visible++;
    }
  }
  for (const button of document.querySelectorAll('button[data-filter]')) {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  if (animate) document.querySelector('#filter-status').textContent = translations[language].projectsVisible(visible);
  refreshEngineDiagrams();
}

function pauseProjectVideos() {
  dialog.querySelectorAll('video').forEach(video => video.pause());
}

function projectDemonstrations(project) {
  if (!project.videos?.length) return '';
  const text = translations[language];
  return `<section class="detail-demonstrations" aria-labelledby="demonstrations-title"><h3 id="demonstrations-title">${text.demonstrations}</h3>
    <div class="demo-grid ${project.videos.length === 1 ? 'demo-grid-single' : ''}">${project.videos.map(video => {
      const copy = video[language];
      return `<figure class="project-demo">
        <video controls playsinline loop preload="none" width="${video.width}" height="${video.height}" poster="assets/media/${video.file}.webp" aria-label="${escapeHtml(copy.title)}" aria-describedby="caption-${video.file}">
          <source src="assets/media/${video.file}.mp4" type="video/mp4" />
          <a href="assets/media/${video.file}.mp4">${text.videoFallback}</a>
        </video>
        <figcaption id="caption-${video.file}"><div><h4>${escapeHtml(copy.title)}</h4><p>${escapeHtml(copy.caption)}</p></div><a class="media-source-link" href="${video.source}" target="_blank" rel="noopener noreferrer">${text.videoSource}</a></figcaption>
      </figure>`;
    }).join('')}</div></section>`;
}

function renderProjectDetail(project) {
  pauseProjectVideos();
  const copy = project[language];
  const text = translations[language];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const gallery = project.gallery?.map(image => `<figure class="${image.model ? 'gallery-model' : ''}"><img src="assets/images/${image.image}.${image.format || 'webp'}" alt="${escapeHtml(image[language])}" loading="lazy" /><figcaption>${escapeHtml(image[language])}</figcaption></figure>`).join('');
  detail.innerHTML = `
    <div class="detail-header"><p class="eyebrow">${escapeHtml(copy.category)}</p><h2 id="dialog-title">${escapeHtml(copy.title)}</h2><p class="detail-subtitle">${escapeHtml(copy.subtitle)}</p>
      <dl class="detail-meta"><div><dt>${text.role}</dt><dd>${escapeHtml(copy.role)}</dd></div><div><dt>${text.context}</dt><dd>${escapeHtml(copy.context)}</dd></div></dl>
    </div>
    <div class="detail-cover visual-${project.id}">${projectVisual(project, true)}</div>
    <div class="detail-body"><aside class="detail-sidebar"><div><h3>${text.technologies}</h3>${projectTags(project.tags)}</div><div class="detail-outcome"><strong>${escapeHtml(copy.metric)}</strong><span>${escapeHtml(copy.metricLabel)}</span></div></aside>
      <div class="detail-narrative"><p>${escapeHtml(copy.introduction)}</p><h3>${text.contributions}</h3><ul>${copy.details.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        <div class="detail-external">${project.url ? `<a class="button button-dark" href="${project.url}" target="_blank" rel="noopener noreferrer"><span class="button-square" aria-hidden="true"></span>${project.linkType === 'code' ? text.codeLink : text.websiteLink}</a>` : ''}<a class="text-link" href="Martin_Mayer_Portfolio.pdf#page=${project.page}" target="_blank" rel="noopener noreferrer">${text.sourcePdf}</a></div>
      </div>
    </div>
    ${gallery ? `<div class="detail-gallery">${gallery}</div>` : ''}
    ${projectDemonstrations(project)}
    <button class="detail-next" type="button" data-next="${next.id}"><span><small>${text.nextProject}</small><strong>${escapeHtml(next[language].title)}</strong></span><span class="plus-icon" aria-hidden="true"></span></button>`;
  refreshEngineDiagrams();
}

function openProject(id, { updateHistory = true, replaceHistory = false } = {}) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  closeMenu();
  activeProject = project;
  lastProjectId = id;
  renderProjectDetail(project);
  if (!dialog.open) dialog.showModal();
  refreshEngineDiagrams();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  dialog.querySelector('.dialog-close').focus({ preventScroll: true });
  if (updateHistory) {
    const method = replaceHistory ? 'replaceState' : 'pushState';
    const portfolioReturn = replaceHistory ? Boolean(history.state?.portfolioReturn) : true;
    history[method]({ portfolioProject: id, portfolioReturn }, '', `#projet-${id}`);
  }
}

function closeProject({ updateHistory = true } = {}) {
  if (!dialog.open) return;
  pauseProjectVideos();
  dialog.close();
  document.body.classList.remove('dialog-open');
  activeProject = null;
  const trigger = grid.querySelector(`[data-project="${lastProjectId}"]`);
  if (trigger && !trigger.closest('[hidden]')) trigger.focus({ preventScroll: true });
  if (updateHistory && location.hash.startsWith('#projet-')) {
    if (history.state?.portfolioReturn) history.back();
    else {
      history.replaceState(null, '', `${location.pathname}${location.search}#projets`);
      document.querySelector('#projets').scrollIntoView({ behavior: 'instant' });
    }
  }
}

function syncProjectHash() {
  const id = location.hash.replace('#projet-', '');
  if (location.hash.startsWith('#projet-') && projects.some(project => project.id === id)) {
    if (activeProject?.id !== id) openProject(id, { updateHistory: false });
  } else closeProject({ updateHistory: false });
}

function setLanguage(nextLanguage, announce = false) {
  if (!translations[nextLanguage]) return;
  language = nextLanguage;
  document.documentElement.lang = language;
  const text = translations[language];
  // Only the authored local translation dictionary can supply markup here.
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = text[element.dataset.i18n];
    if (typeof value === 'string') element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const value = text[element.dataset.i18nAria];
    if (typeof value === 'string') element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
  document.querySelector('meta[name="description"]').content = text.description;
  document.querySelector('meta[property="og:locale"]').content = language === 'fr' ? 'fr_CH' : 'en_GB';
  menuToggle.setAttribute('aria-label', menuToggle.getAttribute('aria-expanded') === 'true' ? text.closeMenu : text.openMenu);
  renderProjectCards();
  if (activeProject) {
    const previousScroll = dialog.scrollTop;
    renderProjectDetail(activeProject);
    dialog.scrollTop = previousScroll;
  }
  try { localStorage.setItem('martin-portfolio-language', language); } catch { /* Optional preference only. */ }
  if (announce) document.querySelector('#language-status').textContent = text.languageChanged;
}

function observeReveals() {
  if (!('IntersectionObserver' in window) || reducedMotion.matches) return;
  document.documentElement.classList.add('motion-ready');
  revealObserver ??= new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -35px 0px', threshold: .06 });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(element => revealObserver.observe(element));
}

function closeMenu({ restoreFocus = false } = {}) {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', translations[language].openMenu);
  if (restoreFocus) menuToggle.focus();
}

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.style.setProperty('--scroll-progress', max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
  header.classList.toggle('scrolled', window.scrollY > 30);
  let currentSection = null;
  for (const id of ['projets', 'apropos', 'contact']) {
    if (document.getElementById(id).getBoundingClientRect().top <= window.innerHeight * .36) currentSection = id;
  }
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.hash === `#${currentSection}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const hero = document.querySelector('.hero');
  if (!reducedMotion.matches && window.scrollY < hero.offsetHeight) {
    document.querySelector('.hero-terrain').style.transform = `translateY(${window.scrollY * .08}px)`;
  }
  scrollPending = false;
}

document.addEventListener('click', event => {
  const projectLink = event.target.closest('[data-project]');
  // Preserve the browser’s modified-click behaviour for opening the source PDF.
  if (projectLink && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
    event.preventDefault();
    openProject(projectLink.dataset.project);
    return;
  }
  const nextProject = event.target.closest('[data-next]');
  if (nextProject) openProject(nextProject.dataset.next, { replaceHistory: true });
  const filterButton = event.target.closest('button[data-filter]');
  if (filterButton && filterButton.dataset.filter !== filter) {
    filter = filterButton.dataset.filter;
    applyFilter();
  }
  const languageButton = event.target.closest('[data-lang]');
  if (languageButton && languageButton.dataset.lang !== language) setLanguage(languageButton.dataset.lang, true);
  if (event.target.closest('.nav-link, .wordmark')) closeMenu();
  if (!event.target.closest('.site-header')) closeMenu();
});

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', translations[language][open ? 'closeMenu' : 'openMenu']);
  nav.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu({ restoreFocus: true });
});
nav.addEventListener('focusout', event => {
  if (mobileNavigation.matches && !header.contains(event.relatedTarget)) closeMenu();
});
mobileNavigation.addEventListener('change', () => closeMenu());

dialog.querySelector('.dialog-close').addEventListener('click', () => closeProject());
dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
});
dialog.addEventListener('close', () => {
  pauseProjectVideos();
  document.body.classList.remove('dialog-open');
});
window.addEventListener('hashchange', syncProjectHash);
window.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  window.requestAnimationFrame(updateScroll);
}, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true });
window.addEventListener('resize', refreshEngineDiagrams, { passive: true });
reducedMotion.addEventListener('change', () => {
  document.documentElement.classList.toggle('motion-ready', !reducedMotion.matches);
  if (reducedMotion.matches) {
    revealObserver?.disconnect();
    document.querySelector('.hero-terrain').style.transform = '';
  } else observeReveals();
});

document.querySelector('#copyright-year').textContent = new Date().getFullYear();
setLanguage(language);
syncProjectHash();
updateScroll();
