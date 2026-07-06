/* Unstuck landing page interactions */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");

  function onNavScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onNavScroll();

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && nav.classList.contains("menu-open")) {
      nav.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("progressBar");
  function onProgress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  }

  /* ---------- Parallax background elements ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  function onParallax() {
    if (prefersReducedMotion) return;
    var y = window.scrollY;
    for (var i = 0; i < parallaxEls.length; i++) {
      var el = parallaxEls[i];
      var rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
      el.style.transform = "translate3d(0," + (y * speed * -0.35).toFixed(1) + "px,0)";
    }
  }

  /* ---------- Timeline fill ---------- */
  var timelineFill = document.getElementById("timelineFill");
  var timeline = document.querySelector(".timeline");
  function onTimeline() {
    if (!timelineFill || !timeline) return;
    var rect = timeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var progress = (vh * 0.75 - rect.top) / rect.height;
    timelineFill.style.height = Math.max(0, Math.min(1, progress)) * 100 + "%";
  }

  /* ---------- rAF-throttled scroll handler ---------- */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onNavScroll();
      onProgress();
      onParallax();
      onTimeline();
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal, .step");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Count-up numbers ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1600;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll(".count");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseInt(el.getAttribute("data-count"), 10).toLocaleString();
    });
  }

  /* ---------- FAQ: close others when one opens ---------- */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Booking CTA ----------
     Point this at the live calendar / funnel step. */
  var BOOKING_URL = "#book"; // e.g. https://api.leadconnectorhq.com/widget/booking/XXXX
  var bookBtn = document.getElementById("bookBtn");
  if (bookBtn && BOOKING_URL !== "#book") {
    bookBtn.setAttribute("href", BOOKING_URL);
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
