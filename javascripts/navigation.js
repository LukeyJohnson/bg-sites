/* Native disclosures remain usable without JavaScript. */
(function () {
  function wire() {
    var nav = document.querySelector(".bg-top-nav");
    if (!nav || nav.dataset.bgWired) return;
    nav.dataset.bgWired = "1";
    var dropdowns = Array.from(nav.querySelectorAll("[data-bg-dropdown]"));
    function closeExcept(keep) {
      dropdowns.forEach(function (item) {
        if (item !== keep) item.open = false;
      });
    }
    dropdowns.forEach(function (item) {
      var trigger = item.querySelector(":scope > summary");
      item.addEventListener("toggle", function (event) {
        if (event.target === item && item.open) closeExcept(item);
      });
      trigger.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          closeExcept(item);
          item.open = true;
          item.querySelector(".bg-nav-panel a").focus();
        }
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && item.open) {
          event.preventDefault();
          item.open = false;
          trigger.focus();
        }
      });
      item.addEventListener("click", function (event) {
        var link = event.target.closest("a");
        if (link) {
          item.open = false;
          trigger.focus({ preventScroll: true });
        }
      });
    });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) closeExcept(null);
    });
    document.addEventListener("focusin", function (event) {
      dropdowns.forEach(function (item) {
        if (item.open && !item.contains(event.target)) item.open = false;
      });
    });
    window.matchMedia("(min-width: 76.25em)").addEventListener("change", function () {
      closeExcept(null);
    });
  }
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(wire);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
