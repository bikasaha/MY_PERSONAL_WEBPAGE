/* ── SCROLL PROGRESS ── */
const prog = document.getElementById("prog");
window.addEventListener("scroll", () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  prog.style.transform = `scaleX(${pct})`;
  document.getElementById("btt").classList.toggle("show", window.scrollY > 400);
  updateNav();
}, { passive: true });

/* ── ACTIVE NAV (scroll-based, zero lag) ── */
const sections = Array.from(document.querySelectorAll("section[id], .sec[id]"));
const allSections = document.querySelectorAll("[id]");
const navLinks = document.querySelectorAll(".nav-links a");
function updateNav() {
  let current = "";
  document.querySelectorAll("section[id]").forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("load", updateNav);

/* ── ANIMATED COUNTERS ── */
function countUp(el, target, dur = 1200) {
  const s = performance.now();
  (function step(now) {
    const p = Math.min((now - s) / dur, 1);
    el.textContent = Math.round(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  })(performance.now());
}
let counted = false;
const cObs = new IntersectionObserver(e => {
  if (e[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll(".stat-n[data-n]").forEach(el => countUp(el, +el.dataset.n));
  }
}, { threshold: 0.5 });
const statsEl = document.querySelector(".stats-inner");
if (statsEl) cObs.observe(statsEl);

/* ── REVEAL ON SCROLL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("show"); ro.unobserve(en.target); }
  });
}, { threshold: 0.05 });
document.querySelectorAll(".rv").forEach(el => ro.observe(el));

/* ── PUB FILTER ── */
function filterPubs(type, btn) {
  const pubs = document.querySelectorAll(".pub");
  const buttons = document.querySelectorAll(".pf");

  buttons.forEach(b => b.classList.remove("on"));
  btn.classList.add("on");

  pubs.forEach(pub => {
    const status = pub.dataset.status;
    const category = pub.dataset.category;

    if (
      type === "all" ||
      type === status ||
      type === category
    ) {
      pub.style.display = "grid";
    } else {
      pub.style.display = "none";
    }
  });
}

function updatePubCounts() {
  const pubs = document.querySelectorAll(".pub");

  const counts = {
    all: pubs.length,
    published: 0,
    review: 0,
    preprint: 0,
    conference: 0,
    journal: 0
  };

  pubs.forEach(pub => {
    const status = pub.dataset.status;
    const category = pub.dataset.category;

    if (counts[status] !== undefined) counts[status]++;
    if (counts[category] !== undefined) counts[category]++;
  });

  document.querySelectorAll("[data-count]").forEach(el => {
    const key = el.dataset.count;
    el.textContent = counts[key] ?? 0;
  });
}

function filterPubs(type, btn) {
  const pubs = document.querySelectorAll(".pub");
  const buttons = document.querySelectorAll(".pf");

  buttons.forEach(b => b.classList.remove("on"));
  btn.classList.add("on");

  pubs.forEach(pub => {
    const status = pub.dataset.status;
    const category = pub.dataset.category;

    pub.style.display =
      type === "all" || type === status || type === category
        ? "block"
        : "none";
  });
}

document.addEventListener("DOMContentLoaded", updatePubCounts);

/* ── MOBILE MENU ── */
function mobToggle() {
  document.getElementById("mobMenu").classList.toggle("open");
  document.body.style.overflow = document.getElementById("mobMenu").classList.contains("open") ? "hidden" : "";
}
function mobClose() {
  document.getElementById("mobMenu").classList.remove("open");
  document.body.style.overflow = "";
}
