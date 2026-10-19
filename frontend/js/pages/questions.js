/**
 * BOU ACADEX - OLD QUESTIONS PAGE
 * Loads solved papers from GET /api/questions, renders the archive,
 * and builds the expandable model-answer panels.
 */
(function () {
  const { escapeHtml, nl2br, semesterLabel, showLoadError } = window.BOU_UTIL;

  function solutionStep(question) {
    const keyPoints = (question.keyPoints || [])
      .map(function (point) {
        return "<li>" + escapeHtml(point) + "</li>";
      })
      .join("");

    return (
      '<div class="solution-step">' +
      '<div class="solution-step-title">প্রশ্ন ' +
      escapeHtml(question.qNumber) +
      ": " +
      escapeHtml(question.questionText) +
      " <em>(" +
      question.marks +
      " marks)</em></div>" +
      '<p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.6;"><strong>আদর্শ উত্তর:</strong> ' +
      nl2br(question.modelAnswer) +
      "</p>" +
      (keyPoints
        ? '<div style="font-size:0.8125rem; color:var(--text-muted); margin-top:8px;"><strong>Key Points:</strong><ul style="margin:6px 0 0 20px;">' +
          keyPoints +
          "</ul></div>"
        : "") +
      "</div>"
    );
  }

  function renderPaper(paper) {
    const panelId = "sol-" + paper.id;
    const tags = [
      escapeHtml(paper.program + " • " + semesterLabel(paper.semester) + " " + paper.term),
      paper.isSolved ? "✓ Verified Model Answers" : "Model Answers Pending",
      "Full Marks: " + paper.fullMarks + " • " + escapeHtml(paper.duration),
    ];

    const tagHtml = tags
      .map(function (tag, index) {
        return '<span class="tag-badge' + (index === 1 && paper.isSolved ? " solved" : "") + '">' + tag + "</span>";
      })
      .join("");

    return [
      '<article class="question-paper-card" data-year="' + escapeHtml(paper.year) + '" data-program="' + escapeHtml(paper.program) + '">',
      '  <div class="question-summary-row">',
      '    <div class="question-meta-col">',
      '      <div class="year-stamp">' + escapeHtml(paper.year) + "</div>",
      '      <div class="question-title-wrap">',
      "        <h4>" + escapeHtml(paper.subjectName + " (" + paper.subjectCode + ")") + "</h4>",
      '        <div class="question-tags">' + tagHtml + "</div>",
      "      </div>",
      "    </div>",
      '    <div class="question-actions-col">',
      '      <button class="btn btn-secondary btn-sm" data-toggle="' + panelId + '">👁 Toggle Model Answers</button>',
      '      <button class="btn btn-primary btn-sm" data-download="' + escapeHtml(escapeAttr(paper)) + '">⬇ PDF</button>',
      "    </div>",
      "  </div>",
      '  <div class="question-solution-panel" id="' + panelId + '">' + paper.questions.map(solutionStep).join("") + "</div>",
      "</article>",
    ].join("");
  }

  function escapeAttr(paper) {
    return paper.year + " " + paper.subjectName + " Solved Paper";
  }

  function toggleSolution(panelId, button) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const isOpen = panel.classList.toggle("open");
    button.textContent = isOpen ? "▲ Hide Model Answers" : "👁 Toggle Model Answers";
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("questionsContainer");
    if (!container) return;

    const yearFilter = document.getElementById("qYearFilter");
    const programFilter = document.getElementById("qProgramFilter");
    const searchInput = document.getElementById("qSearchInput");

    let papers;
    try {
      const response = await window.BOU_API.get("/questions");
      papers = response.data || [];
    } catch (error) {
      showLoadError(container, "question papers", error);
      return;
    }

    container.innerHTML = papers.map(renderPaper).join("");

    function applyFilters() {
      const year = yearFilter.value;
      const program = programFilter.value;
      const query = searchInput.value.toLowerCase().trim();

      container.querySelectorAll(".question-paper-card").forEach(function (card) {
        const matches =
          (year === "all" || card.dataset.year === year) &&
          (program === "all" || card.dataset.program === program) &&
          (!query || card.textContent.toLowerCase().indexOf(query) !== -1);
        card.style.display = matches ? "block" : "none";
      });
    }

    yearFilter.addEventListener("change", applyFilters);
    programFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    container.addEventListener("click", function (event) {
      const toggleBtn = event.target.closest("[data-toggle]");
      if (toggleBtn) {
        toggleSolution(toggleBtn.dataset.toggle, toggleBtn);
        return;
      }
      const downloadBtn = event.target.closest("[data-download]");
      if (downloadBtn) {
        showToast("Downloading " + downloadBtn.dataset.download + "...");
      }
    });

    const params = new URLSearchParams(window.location.search);
    const urlYear = params.get("year");
    const urlProgram = params.get("program");
    if (urlYear) yearFilter.value = urlYear;
    if (urlProgram) programFilter.value = urlProgram;
    applyFilters();
  });
})();
