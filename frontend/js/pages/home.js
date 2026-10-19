/**
 * BOU ACADEX - HOME PAGE
 * Loads the notice board from GET /api/notices.
 */
(function () {
  const { escapeHtml, showLoadError } = window.BOU_UTIL;

  function renderNotice(notice) {
    const isExternal = /^https?:\/\//i.test(notice.link);
    const linkAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";

    return [
      '<article class="notice-card">',
      '  <div class="notice-date-badge">',
      '    <span class="notice-day">' + escapeHtml(notice.day) + "</span>",
      '    <span class="notice-month">' + escapeHtml(notice.month) + "</span>",
      "  </div>",
      '  <div class="notice-content">',
      '    <span class="notice-tag">' + escapeHtml(notice.category) + "</span>",
      '    <h3 class="notice-title">' + escapeHtml(notice.title) + "</h3>",
      '    <a href="' + escapeHtml(notice.link) + '"' + linkAttrs + ' class="notice-link">' + escapeHtml(notice.linkText) + "</a>",
      "  </div>",
      "</article>",
    ].join("");
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("noticeCardsGrid");
    if (!container) return;

    try {
      const response = await window.BOU_API.get("/notices");
      container.innerHTML = (response.data || []).map(renderNotice).join("");
    } catch (error) {
      showLoadError(container, "notices", error);
    }
  });
})();
