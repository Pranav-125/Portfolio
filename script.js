// live clock
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

// footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// nav mobile toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// learning log — scrolling ticker of in-progress topics
const logEntries = [
  { tag: 'INFO', text: 'loading module: Spring Boot' },
  { tag: 'INFO', text: 'loading module: deep-learning' },
  { tag: 'INFO', text: 'loading module: generative-ai' },
  { tag: 'INFO', text: 'loading module: llms' },
  { tag: 'INFO', text: 'loading module: ai-agents' },
  { tag: 'INFO', text: 'loading module: mlops' },
  { tag: 'INFO', text: 'loading module: llmops' },
  { tag: 'INFO', text: 'loading module: aws' },
  { tag: 'INFO', text: 'loading module: kubernetes' },
  { tag: 'INFO', text: 'loading module: distributed-systems' },
  { tag: 'INFO', text: 'loading module: system-design' },
  { tag: 'INFO', text: 'loading module: dsa' },
  { tag: 'OK', text: 'progress saved — resuming daily' },
];

const track = document.getElementById('logTrack');
if (track) {
  const renderSet = () =>
    logEntries
      .map(
        e =>
          `<div class="log-line">[<span class="tag-${e.tag.toLowerCase()}">${e.tag}</span>] ${e.text}</div>`
      )
      .join('');
  // duplicate content for seamless loop
  track.innerHTML = renderSet() + renderSet();
}

// active nav link on scroll
const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');
if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color =
              link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sections.forEach(s => observer.observe(s));
}
