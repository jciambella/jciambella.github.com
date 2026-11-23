// Filters, search and BibTeX copy for /publications/.
// The list is rendered server-side; without JavaScript it is simply shown in full.
(function () {
  "use strict";
  var tools = document.querySelector(".pub-tools");
  if (!tools) return;

  var items = Array.prototype.slice.call(document.querySelectorAll(".pub"));
  var groups = Array.prototype.slice.call(document.querySelectorAll(".year-group"));
  var buttons = Array.prototype.slice.call(tools.querySelectorAll("[data-type]"));
  var topicSel = document.getElementById("pub-topic");
  var q = document.getElementById("pub-q");
  var count = tools.querySelector(".pub-count");
  var empty = document.querySelector(".no-results");

  var params = new URLSearchParams(window.location.search);
  var state = {
    type: params.get("type") || "all",
    topic: params.get("topic") || "",
    q: params.get("q") || ""
  };
  if (!buttons.some(function (b) { return b.dataset.type === state.type; })) state.type = "all";
  if (!Array.prototype.some.call(topicSel.options, function (o) { return o.value === state.topic; })) state.topic = "";
  topicSel.value = state.topic;
  q.value = state.q;

  function matches(li, term) {
    var d = li.dataset;
    if (state.type === "selected" && d.selected !== "true") return false;
    if (state.type !== "all" && state.type !== "selected" && d.type !== state.type) return false;
    if (state.topic && (" " + d.topics + " ").indexOf(" " + state.topic + " ") === -1) return false;
    if (term) {
      var words = term.split(/\s+/);
      for (var i = 0; i < words.length; i++) if (d.search.indexOf(words[i]) === -1) return false;
    }
    return true;
  }

  function apply() {
    var term = state.q.trim().toLowerCase();
    var n = 0;
    items.forEach(function (li) {
      var show = matches(li, term);
      li.hidden = !show;
      if (show) n++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector(".pub:not([hidden])"); });
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.type === state.type)); });
    count.textContent = n === items.length ? n + " publications" : n + " of " + items.length;
    empty.hidden = n > 0;

    var url = new URL(window.location.href);
    ["type", "topic", "q"].forEach(function (k) {
      var v = k === "q" ? term : state[k];
      if (v && v !== "all") url.searchParams.set(k, v); else url.searchParams.delete(k);
    });
    window.history.replaceState(null, "", url);
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { state.type = b.dataset.type; apply(); });
  });
  topicSel.addEventListener("change", function () { state.topic = topicSel.value; apply(); });
  q.addEventListener("input", function () { state.q = q.value; apply(); });

  // Copy buttons inside the BibTeX panels.
  if (navigator.clipboard) {
    document.querySelectorAll(".bibtex").forEach(function (d) {
      var pre = d.querySelector("pre");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(pre.textContent.trim() + "\n").then(function () {
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = "Copy"; }, 1500);
        });
      });
      d.appendChild(btn);
    });
  }

  tools.hidden = false;
  apply();
})();
