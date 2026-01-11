(function () {
  "use strict";

  // ===== VERSION LOG (helps you confirm updates) =====
  console.log("CD Brand loaded", new Date().toISOString());

  // ===== CONFIG (EDIT ONLY THESE WHEN NEEDED) =====
  const CONFIG = {
    logoUrl: "https://i.postimg.cc/9FGkNhQF/Artboard-3-copy-2.png",
    paddingTop: 100,
    maxRuntimeMs: 30000 // stop observing after 30s
  };

  const startTime = Date.now();

  // ===== HELPERS =====
  function removeAll(selector) {
    document.querySelectorAll(selector).forEach(el => el.remove());
  }

  function findLogo() {
    return (
      document.querySelector("#logoContainer img") ||
      document.querySelector(".login-form #logoContainer img") ||
      document.querySelector(".login-form img[src*='logo']") ||
      document.querySelector("img[src*='Five9']")
    );
  }

  function applyBranding() {
    const logo = findLogo();
    if (!logo) return false;

    // Force logo replacement
    if (logo.src !== CONFIG.logoUrl) {
      logo.src = CONFIG.logoUrl;
    }

    logo.style.paddingTop = CONFIG.paddingTop + "px";
    logo.style.maxWidth = "100%";
    logo.style.height = "auto";

    // Cleanup clutter
    removeAll("#headerText");
    removeAll("div.navbar.navbar-fixed-top");
    removeAll("div.regional-links-container");
    removeAll(".footer.text-center");

    return true;
  }

  // ===== OBSERVER (handles late load + re-render) =====
  const observer = new MutationObserver(() => {
    applyBranding();

    // Safety stop
    if (Date.now() - startTime > CONFIG.maxRuntimeMs) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Initial attempt
  applyBranding();
})();
