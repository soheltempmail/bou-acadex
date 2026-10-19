/**
 * BOU ACADEX - E-BOOKS PAGE
 * Loads the book catalogue from GET /api/books and renders the cards,
 * filters, and the online reader modal.
 */
(function () {
  const { escapeHtml, nl2br, showLoadError } = window.BOU_UTIL;

  const SCHOOL_META = {
    SOB: { label: "School of Business", gradient: "linear-gradient(135deg, #173b55 0%, #0c2340 100%)" },
    SSHL: { label: "School of SSHL", gradient: "linear-gradient(135deg, #9a1b24 0%, #601016 100%)" },
    OS: { label: "Open School", gradient: "linear-gradient(135deg, #0b6623 0%, #073814 100%)" },
    SST: { label: "Science & Technology", gradient: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)" },
    SOE: { label: "School of Education", gradient: "linear-gradient(135deg, #155e75 0%, #0e7490 100%)" },
  };

  const BOOK_GRADIENTS = {
    "BBA-1101": "linear-gradient(135deg, #173b55 0%, #0c2340 100%)",
    "BBA-1102": "linear-gradient(135deg, #225c9e 0%, #173b55 100%)",
    "BSS-2101": "linear-gradient(135deg, #9a1b24 0%, #601016 100%)",
    "HSC-1801": "linear-gradient(135deg, #0b6623 0%, #073814 100%)",
    "CSE-2101": "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
    "ENG-1301": "linear-gradient(135deg, #7c2d12 0%, #451a03 100%)",
    "BED-1104": "linear-gradient(135deg, #155e75 0%, #0e7490 100%)",
    "BBA-2101": "linear-gradient(135deg, #831843 0%, #500724 100%)",
  };

  let booksByCode = {};

  function renderCard(book) {
    const meta = SCHOOL_META[book.school] || { label: book.school, gradient: "#173b55" };
    const gradient = BOOK_GRADIENTS[book.subjectCode] || meta.gradient;
    const codeLabel = book.subjectCode + " • Units 1\u2013" + book.unitsCount;
    const schoolLine = book.program + " Program • " + book.edition;

    return [
      '<article class="book-card" data-school="' + escapeHtml(book.school) + '" data-level="' + escapeHtml(book.level) + '">',
      '  <div class="book-cover-mock" style="background:' + gradient + ';">',
      '    <span class="book-cover-tag">' + escapeHtml(meta.label) + "</span>",
      '    <h3 class="book-cover-title">' + escapeHtml(book.title) + "</h3>",
      '    <span class="book-cover-code">' + escapeHtml(codeLabel) + "</span>",
      "  </div>",
      '  <div class="book-info-body">',
      '    <div class="book-school">' + escapeHtml(schoolLine) + "</div>",
      '    <div class="book-meta-row">',
      "      <span>📄 " + book.pages + " Pages</span>",
      "      <span>📦 PDF (" + escapeHtml(book.fileSize) + ")</span>",
      "      <span>⭐ " + book.rating + "/5</span>",
      "    </div>",
      '    <div class="book-actions">',
      '      <button class="btn btn-primary btn-sm" style="flex:1;" data-read="' + escapeHtml(book.subjectCode) + '">📖 Read Online</button>',
      '      <button class="btn btn-secondary btn-sm" data-download="' + escapeHtml(book.title) + '">⬇ PDF</button>',
      "    </div>",
      "  </div>",
      "</article>",
    ].join("");
  }

  function openReader(book) {
    const units = (book.units || [])
      .map(function (unit) {
        return (
          '<div style="padding:10px 14px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; display:flex; justify-content:space-between; align-items:center; gap:12px;">' +
          "<div><strong>Unit " + unit.unitNum + ":</strong> " + escapeHtml(unit.title) + "</div>" +
          '<button class="btn btn-secondary btn-sm" onclick="showToast(\'Loading Unit ' + unit.unitNum + " interactive text...')\">Open Unit</button>" +
          "</div>"
        );
      })
      .join("");

    const content =
      '<div style="line-height:1.65;">' +
      '<div style="background:var(--bou-navy); color:#fff; padding:16px; border-radius:8px; margin-bottom:16px;">' +
      '<div style="font-size:0.75rem; text-transform:uppercase; color:var(--bou-gold); font-weight:700;">Bangladesh Open University Textbook Reader</div>' +
      '<h2 style="font-size:1.35rem; font-weight:800; color:#fff; margin-top:4px;">' + escapeHtml(book.title) + "</h2>" +
      '<div style="font-size:0.85rem; opacity:0.85;">Course Code: ' + escapeHtml(book.subjectCode) + " • Total Units: " + book.unitsCount + "</div>" +
      "</div>" +
      '<div style="background:var(--bg-surface-muted); padding:14px; border-radius:8px; margin-bottom:18px;">' +
      '<strong style="color:var(--text-main);">Module Overview:</strong>' +
      '<p style="font-size:0.9rem; color:var(--text-secondary); margin-top:4px;">' + nl2br(book.summary) + "</p>" +
      "</div>" +
      '<h4 style="font-size:1rem; margin-bottom:10px; border-bottom:1px solid var(--border-subtle); padding-bottom:6px;">Table of Contents (ইউনিট সূচিপত্র):</h4>' +
      '<div style="display:flex; flex-direction:column; gap:8px; max-height:260px; overflow-y:auto; padding-right:6px;">' + units + "</div>" +
      "</div>";

    const footer =
      '<button class="btn btn-primary" onclick="showToast(\'Full offline eBook saved to local library cache!\'); closeModal();">⬇ Save Complete PDF</button>' +
      '<button class="btn btn-secondary" onclick="closeModal()">Close Reader</button>';

    openModal("BOU E-Reader: " + book.title, content, footer);
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("booksContainer");
    if (!container) return;

    const schoolFilter = document.getElementById("bookSchoolFilter");
    const levelFilter = document.getElementById("bookLevelFilter");
    const searchInput = document.getElementById("bookSearchInput");

    let books;
    try {
      const response = await window.BOU_API.get("/books");
      books = response.data || [];
    } catch (error) {
      showLoadError(container, "e-books", error);
      return;
    }

    books.forEach(function (book) {
      booksByCode[book.subjectCode] = book;
    });
    container.innerHTML = books.map(renderCard).join("");

    function applyFilters() {
      const school = schoolFilter.value;
      const level = levelFilter.value;
      const query = searchInput.value.toLowerCase().trim();

      container.querySelectorAll(".book-card").forEach(function (card) {
        const matches =
          (school === "all" || card.dataset.school === school) &&
          (level === "all" || card.dataset.level === level) &&
          (!query || card.textContent.toLowerCase().indexOf(query) !== -1);
        card.style.display = matches ? "flex" : "none";
      });
    }

    schoolFilter.addEventListener("change", applyFilters);
    levelFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    container.addEventListener("click", function (event) {
      const readBtn = event.target.closest("[data-read]");
      if (readBtn) {
        const book = booksByCode[readBtn.dataset.read];
        if (book) openReader(book);
        return;
      }
      const downloadBtn = event.target.closest("[data-download]");
      if (downloadBtn) {
        showToast("Downloading " + downloadBtn.dataset.download + " PDF...");
      }
    });

    const params = new URLSearchParams(window.location.search);
    const urlSchool = params.get("school");
    const urlProgram = params.get("program");
    if (urlSchool) schoolFilter.value = urlSchool;
    if (urlProgram && !urlSchool) searchInput.value = urlProgram;
    applyFilters();
  });
})();
