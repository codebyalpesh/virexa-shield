/* =========================================
   APP INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initRevealOnScroll();
  initScrollTopButton();
  initHeroScore();
  initReportCard();
});


/* =========================================
   UTILS
========================================= */

/* Throttle for scroll performance */
function throttle(fn, limit = 100) {
  let waiting = false;

  return function () {
    if (!waiting) {
      fn.apply(this, arguments);
      waiting = true;

      setTimeout(() => (waiting = false), limit);
    }
  };
}

/* Reusable counter animation */
function animateCounter(el, target, duration = 1200) {
  let current = 0;
  const increment = target / (duration / 16);

  function update() {
    current += increment;

    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  update();
}


/* =========================================
   SCROLL REVEAL
========================================= */

function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const reveal = () => {
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      el.classList.toggle("active", top < windowHeight - 120);
    });
  };

  window.addEventListener("scroll", throttle(reveal, 100));
  reveal();
}


/* =========================================
   SCROLL TOP BUTTON
========================================= */

function initScrollTopButton() {
  const btn = document.createElement("button");
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Scroll to top");
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';

  document.body.appendChild(btn);

  const toggleVisibility = () => {
    btn.classList.toggle("show", window.scrollY > 400);
  };

  window.addEventListener("scroll", throttle(toggleVisibility, 100));

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* =========================================
   HERO SCORE (RING + COUNTER)
========================================= */

function initHeroScore() {
  const circle = document.querySelector(".progress-ring-fill");
  const scoreEl = document.querySelector(".score-value");

  if (!circle || !scoreEl) return;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const score = 82; // dynamic later

  /* Score class */
  const scoreClass =
    score < 40 ? "score-low" :
    score < 70 ? "score-medium" :
    "score-high";

  circle.classList.add(scoreClass);
  scoreEl.classList.add(scoreClass);

  /* Ring animation */
  const offset = circumference - (score / 100) * circumference;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 300);

  /* Counter */
  animateCounter(scoreEl, score);
}


/* =========================================
   REPORT CARD
========================================= */

function initReportCard() {
  const scoreEl = document.querySelector(".report-score-value");
  const bar = document.querySelector(".report-bar-fill");

  if (!scoreEl || !bar) return;

  const target = parseInt(scoreEl.dataset.score, 10) || 0;

  /* Counter */
  animateCounter(scoreEl, target);

  /* Progress bar */
  setTimeout(() => {
    bar.style.width = `${target}%`;
  }, 200);
}