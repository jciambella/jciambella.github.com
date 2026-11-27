// Click-to-load LinkedIn posts for /news/.
// Nothing is requested from LinkedIn until the visitor asks for a post, so the
// page sets no third-party cookies by default. Without JavaScript the
// "Open on LinkedIn" link is shown instead.
(function () {
  "use strict";
  var boxes = Array.prototype.slice.call(document.querySelectorAll(".li-embed[data-src]"));
  if (!boxes.length) return;

  function load(box) {
    if (box.classList.contains("loaded")) return;
    var f = document.createElement("iframe");
    f.src = box.getAttribute("data-src");
    f.title = "LinkedIn post";
    f.height = box.getAttribute("data-height") || "560";
    f.setAttribute("frameborder", "0");
    f.setAttribute("allowfullscreen", "");
    box.appendChild(f);
    box.classList.add("loaded");
  }

  boxes.forEach(function (box) {
    var btn = box.querySelector(".li-load");
    if (!btn) return;
    btn.hidden = false;
    btn.addEventListener("click", function () { load(box); });
  });

  var all = document.querySelector(".li-all");
  if (all) {
    all.hidden = false;
    all.addEventListener("click", function () {
      boxes.forEach(load);
      all.hidden = true;
    });
  }
})();
