// Gentle scroll reveal for the recipe sections.
// Respects prefers-reduced-motion by doing nothing (CSS handles the fallback).

(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".recipe-section, .details, .rsvp");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();

// Gallery carousel: arrow buttons + dot indicators, synced to native scroll-snap.
(function () {
  var track = document.getElementById("galleryTrack");
  var dotsWrap = document.getElementById("galleryDots");
  if (!track || !dotsWrap) return;

  var slides = Array.prototype.slice.call(track.children);
  if (!slides.length) return;

  slides.forEach(function (_, i) {
    var dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function slideWidth() {
    return slides[0].getBoundingClientRect().width + 16; // width + gap
  }

  function updateDots() {
    var index = Math.round(track.scrollLeft / slideWidth());
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === index);
    });
  }

  var prevBtn = document.querySelector(".carousel-arrow.prev");
  var nextBtn = document.querySelector(".carousel-arrow.next");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      track.scrollBy({ left: -slideWidth(), behavior: "smooth" });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      track.scrollBy({ left: slideWidth(), behavior: "smooth" });
    });
  }

  var scrollTimer;
  track.addEventListener("scroll", function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateDots, 80);
  });

  // Autoplay: advance one slide at a time, looping, pausing while the
  // person interacts (swipe, drag, hover, or the arrow buttons) and
  // resuming a few seconds after they stop. Skipped entirely if the
  // person prefers reduced motion.
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  var AUTOPLAY_DELAY = 4000;
  var RESUME_DELAY = 6000;
  var autoplayTimer = null;
  var resumeTimer = null;

  function currentIndex() {
    return Math.round(track.scrollLeft / slideWidth());
  }

  function goToNext() {
    var next = (currentIndex() + 1) % slides.length;
    track.scrollTo({ left: next * slideWidth(), behavior: "smooth" });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goToNext, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function pauseThenResume() {
    stopAutoplay();
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAutoplay, RESUME_DELAY);
  }

  // Manual swipe/drag/scroll on the track pauses autoplay, then resumes.
  ["pointerdown", "touchstart", "wheel"].forEach(function (evt) {
    track.addEventListener(evt, pauseThenResume, { passive: true });
  });

  // Hovering with a mouse (desktop) pauses for as long as the cursor stays.
  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("mouseleave", startAutoplay);

  if (prevBtn) prevBtn.addEventListener("click", pauseThenResume);
  if (nextBtn) nextBtn.addEventListener("click", pauseThenResume);

  // Pause entirely when the carousel scrolls out of view (e.g. tab in background).
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) startAutoplay();
        else stopAutoplay();
      });
    }, { threshold: 0.4 }).observe(track);
  } else {
    startAutoplay();
  }
})();
