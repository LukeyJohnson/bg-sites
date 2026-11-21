/* Changelog: "Copy link" button on every entry (works with Material's instant navigation). */
(function () {
  function entryUrl(anchor) {
    return location.origin + location.pathname + "#" + anchor;
  }
  function wire(root) {
    root.querySelectorAll("button.cl-copy:not([data-wired])").forEach(function (btn) {
      btn.dataset.wired = "1";
      btn.addEventListener("click", function () {
        var url = entryUrl(btn.dataset.anchor);
        var done = function () {
          var label = btn.textContent;
          btn.textContent = "Copied";
          btn.classList.add("cl-copy--done");
          history.replaceState(null, "", "#" + btn.dataset.anchor);
          setTimeout(function () { btn.textContent = label; btn.classList.remove("cl-copy--done"); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link:", url); });
        } else {
          window.prompt("Copy this link:", url);
        }
      });
    });
  }
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () { wire(document); });
  } else {
    document.addEventListener("DOMContentLoaded", function () { wire(document); });
  }
})();
