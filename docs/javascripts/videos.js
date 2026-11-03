/* Progressive enhancement: ordinary YouTube links work even without JavaScript. */
(function () {
  function wire(root) {
    root.querySelectorAll("a.bg-video-load:not([data-wired])").forEach(function (link) {
      link.dataset.wired = "1";
      link.setAttribute("role", "button");
      link.setAttribute("aria-label", "Load video: " + link.dataset.videoTitle);
      link.addEventListener("keydown", function (event) {
        if (event.key === " ") {
          event.preventDefault();
          link.click();
        }
      });
      link.addEventListener("click", function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        var id = link.dataset.videoId;
        if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
        event.preventDefault();
        var frame = document.createElement("iframe");
        frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=0&rel=0";
        frame.title = link.dataset.videoTitle;
        frame.allow = "encrypted-media; picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.tabIndex = 0;
        link.replaceWith(frame);
        frame.focus();
        var status = root.querySelector(".bg-video-status");
        if (status) status.textContent = "Player loaded for " + frame.title + ". Press play to begin.";
      });
    });
  }
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () { wire(document); });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { wire(document); });
  } else {
    wire(document);
  }
})();
