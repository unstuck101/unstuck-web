/* Steward Sober Living — landing page interactions */
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
      if (rect.bottom < -300 || rect.top > window.innerHeight + 300) continue;
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
      el.style.transform = "translate3d(0," + (y * speed * -0.3).toFixed(1) + "px,0)";
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
  var revealEls = document.querySelectorAll(".reveal, .step, .map, .flourish");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Count-up numbers (supports decimals) ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    var duration = 1800;
    var start = null;
    function format(v) {
      return decimals > 0
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString();
    }
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
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
      var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
      var v = parseFloat(el.getAttribute("data-count")) || 0;
      el.textContent = decimals > 0 ? v.toFixed(decimals) : v.toLocaleString();
    });
  }

  /* ---------- Gold dust particles ---------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll("[data-particles]").forEach(function (host) {
      var n = parseInt(host.getAttribute("data-particles"), 10) || 10;
      for (var i = 0; i < n; i++) {
        var p = document.createElement("span");
        var size = 2 + Math.random() * 3;
        p.className = "particle";
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = (Math.random() * 100).toFixed(1) + "%";
        p.style.top = (55 + Math.random() * 45).toFixed(1) + "%";
        p.style.setProperty("--dur", (11 + Math.random() * 12).toFixed(1) + "s");
        p.style.setProperty("--del", (Math.random() * 12).toFixed(1) + "s");
        p.style.setProperty("--op", (0.25 + Math.random() * 0.4).toFixed(2));
        host.appendChild(p);
      }
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

  /* ---------- Buyer's list CTA ----------
     Point this at the live GoHighLevel form / calendar. */
  var BUYERS_LIST_URL = ""; // e.g. https://api.leadconnectorhq.com/widget/form/XXXX
  document.querySelectorAll("#buyersListBtn, [data-buyers-list]").forEach(function (btn) {
    if (BUYERS_LIST_URL) {
      btn.setAttribute("href", BUYERS_LIST_URL);
    } else {
      btn.setAttribute("href", "#join");
    }
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
