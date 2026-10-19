/**
 * BOU ACADEX - SUGGESTIONS PAGE
 * Loads exam suggestions from GET /api/suggestions, renders the grid,
 * filters, and the full suggestion-sheet modal.
 */
(function () {
  const { escapeHtml, nl2br, semesterLabel, showLoadError } = window.BOU_UTIL;

  function priorityLabel(priority) {
    return priority === "high" ? "★★★ 99% Common" : "★★ Moderate Priority";
  }

  function renderCard(item) {
    const points = (item.highlights || [])
      .map(function (highlight) {
        return "<li>📌 " + escapeHtml(highlight) + "</li>";
      })
      .join("");

    return [
      '<article class="suggestion-card" data-program="' + escapeHtml(item.program) + '" data-semester="' + escapeHtml(item.semester) + '" data-priority="' + escapeHtml(item.priority) + '">',
      '  <div class="suggestion-top">',
      '    <span class="priority-badge priority-' + escapeHtml(item.priority) + '">' + priorityLabel(item.priority) + "</span>",
      '    <span class="semester-badge">' + escapeHtml(item.program + " • " + semesterLabel(item.semester) + " Sem") + "</span>",
      "  </div>",
      '  <h3 class="suggestion-subject">' + escapeHtml(item.subjectName) + "</h3>",
      '  <div class="suggestion-meta">Course Code: <strong>' + escapeHtml(item.subjectCode) + "</strong> | Credits: " + item.credits + "</div>",
      '  <ul class="suggestion-preview-points">' + points + "</ul>",
      '  <div style="display:flex; gap:10px; margin-top:auto;">',
      '    <button class="btn btn-primary btn-sm" style="flex:1;" data-detail="' + escapeHtml(item.subjectCode) + '">View Full PDF</button>',
      '    <button class="btn btn-secondary btn-sm" data-download="1">⬇ Download</button>',
      "  </div>",
      "</article>",
    ].join("");
  }

  function openDetail(item) {
    const sections = item.sections || {};
    const broadQuestions = (sections.broadQuestions || [])
      .map(function (question) {
        return "<li>" + escapeHtml(question) + "</li>";
      })
      .join("");
    const shortNotes = (sections.shortNotes || [])
      .map(function (note) {
        return "<li>" + escapeHtml(note) + "</li>";
      })
      .join("");

    const content =
      '<div style="line-height:1.7;">' +
      '<div style="background:var(--bou-blue-light); padding:12px 16px; border-radius:8px; margin-bottom:18px; border-left:4px solid var(--bou-blue);">' +
      '<strong style="color:var(--bou-navy); font-size:1.1rem;">' + escapeHtml(item.subjectName) + " (" + escapeHtml(item.subjectCode) + ")</strong>" +
      '<div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">BOU Term Final Special Examination Preparation Sheet</div>' +
      "</div>" +
      '<h4 style="font-size:1rem; margin-bottom:8px; color:var(--bou-red);">বিভাগ ক: রচনামূলক / ব্রড প্রশ্নাবলি</h4>' +
      '<ol style="margin-left:20px; font-size:0.9rem; margin-bottom:16px;">' + broadQuestions + "</ol>" +
      '<h4 style="font-size:1rem; margin-bottom:8px; color:var(--bou-navy);">বিভাগ খ: সংক্ষিপ্ত টিকা ও ধারণা</h4>' +
      '<ul style="margin-left:20px; font-size:0.9rem; margin-bottom:16px;">' + shortNotes + "</ul>" +
      '<div style="background:#fef3c7; border:1px solid #fde68a; padding:12px; border-radius:6px; font-size:0.85rem; color:#92400e;">💡 <strong>পরামর্শ:</strong> ' +
      nl2br(sections.examTips || "") +
      "</div>" +
      "</div>";

    const footer =
      '<button class="btn btn-primary" onclick="showToast(\'Starting high-resolution PDF download...\'); closeModal();">Print / Save PDF</button>' +
      '<button class="btn btn-secondary" onclick="closeModal()">Close</button>';

    openModal("Suggestion Sheet: " + item.subjectCode, content, footer);
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("suggestionsContainer");
    if (!container) return;

    const programFilter = document.getElementById("programFilter");
    const semesterFilter = document.getElementById("semesterFilter");
    const priorityFilter = document.getElementById("priorityFilter");
    const searchInput = document.getElementById("suggestionSearchInput");

    let suggestions;
    try {
      const response = await window.BOU_API.get("/suggestions");
      suggestions = response.data || [];
    } catch (error) {
      showLoadError(container, "suggestions", error);
      return;
    }

    const byCode = {};
    suggestions.forEach(function (item) {
      byCode[item.subjectCode] = item;
    });
    container.innerHTML = suggestions.map(renderCard).join("");

    function applyFilters() {
      const program = programFilter.value;
      const semester = semesterFilter.value;
      const priority = priorityFilter.value;
      const query = searchInput.value.toLowerCase().trim();

      container.querySelectorAll(".suggestion-card").forEach(function (card) {
        const matches =
          (program === "all" || card.dataset.program === program) &&
          (semester === "all" || card.dataset.semester === semester) &&
          (priority === "all" || card.dataset.priority === priority) &&
          (!query || card.textContent.toLowerCase().indexOf(query) !== -1);
        card.style.display = matches ? "flex" : "none";
      });
    }

    programFilter.addEventListener("change", applyFilters);
    semesterFilter.addEventListener("change", applyFilters);
    priorityFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    container.addEventListener("click", function (event) {
      const detailBtn = event.target.closest("[data-detail]");
      if (detailBtn) {
        const item = byCode[detailBtn.dataset.detail];
        if (item) openDetail(item);
        return;
      }
      if (event.target.closest("[data-download]")) {
        showToast("Suggestion PDF downloaded to your device!");
      }
    });

    const params = new URLSearchParams(window.location.search);
    const urlProgram = params.get("program") || params.get("tag");
    const urlSearch = params.get("search");
    if (urlProgram) programFilter.value = urlProgram;
    if (urlSearch) searchInput.value = urlSearch;
    applyFilters();
  });
})();
