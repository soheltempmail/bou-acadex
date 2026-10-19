/**
 * BOU ACADEX - API CLIENT
 * Single place that talks to the Next.js TypeScript backend.
 * Override the endpoint by setting window.BOU_API_BASE before this file loads.
 */
(function () {
  const isHosted = typeof window !== 'undefined' && window.location.protocol.startsWith('http') && window.location.port !== '5500' && window.location.port !== '8080';
  const DEFAULT_BASE = isHosted ? "/api" : "http://localhost:3000/api";
  const base = (window.BOU_API_BASE || DEFAULT_BASE).replace(/\/+$/, "");

  async function request(path, options) {
    let response;
    try {
      response = await fetch(base + path, options);
    } catch (networkError) {
      throw new Error(
        "Cannot reach the API at " + base + ". Start the backend (cd backend && npm run dev)."
      );
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload || payload.success === false) {
      const message = (payload && payload.error) || "Request failed (" + response.status + ")";
      throw new Error(message);
    }

    return payload;
  }

  window.BOU_API = {
    base: base,
    get: function (path) {
      return request(path);
    },
    post: function (path, body) {
      return request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
      });
    },
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function nl2br(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function semesterLabel(value) {
    const map = { "1": "1st", "2": "2nd", "3": "3rd", "4": "4th", "5": "5th", "6": "6th" };
    return map[String(value)] || value + "th";
  }

  function showLoadError(container, label, error) {
    if (!container) return;
    container.innerHTML =
      '<p style="color:var(--text-muted); padding:24px; text-align:center;">' +
      "Could not load " +
      escapeHtml(label) +
      ": " +
      escapeHtml(error.message) +
      "</p>";
  }

  window.BOU_UTIL = {
    escapeHtml: escapeHtml,
    nl2br: nl2br,
    semesterLabel: semesterLabel,
    showLoadError: showLoadError,
  };
})();
