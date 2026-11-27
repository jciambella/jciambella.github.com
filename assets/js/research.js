// Research page: simulation clips play (muted, looped) only while visible and
// only if the visitor has not asked the system to reduce motion; otherwise they
// wait on their poster frame with the usual controls.
(function () {
  "use strict";
  var vids = Array.prototype.slice.call(document.querySelectorAll("video[data-autoplay]"));
  if (!vids.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
      else e.target.pause();
    });
  }, { threshold: 0.35 });
  vids.forEach(function (v) { io.observe(v); });
})();
