(function () {
  "use strict";

  var THEME_KEY = "bou_acadex_theme";
  var LETTERS = ["ক", "খ", "গ", "ঘ"];
  var BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function toBn(value) {
    return String(value).replace(/[0-9]/g, function (digit) {
      return BANGLA_DIGITS[Number(digit)];
    });
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toast(message) {
    var host = document.getElementById("toastHost");
    if (!host) return;
    var item = document.createElement("div");
    item.style.cssText =
      "background:var(--tms-slate-900);color:#fff;padding:12px 22px;border-radius:var(--radius-full);box-shadow:0 12px 30px rgba(0,0,0,.3);border:1px solid rgba(20,147,83,.4);font-size:.875rem;font-weight:600;display:flex;align-items:center;gap:10px;pointer-events:auto;transition:all .3s ease;animation:toastSlideUp .25s cubic-bezier(.16,1,.3,1)";
    item.innerHTML = '<span style="color:var(--tms-green);font-size:1rem">●</span>' + esc(message);
    host.appendChild(item);
    window.setTimeout(function () {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";
      window.setTimeout(function () {
        item.remove();
      }, 300);
    }, 3200);
  }

  function initTheme() {
    var toggle = document.getElementById("themeToggleBtn");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var next =
        document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* ignore */
      }
      toast((next === "dark" ? "Dark" : "Light") + " mode enabled");
    });
  }

  function initHeader() {
    var toggle = document.getElementById("mobileNavToggle");
    var nav = document.getElementById("mainNavMenu");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("open")) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    $$(".nav-link", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    var onScroll = function () {
      var header = document.getElementById("mainHeader");
      if (header) header.classList.toggle("header-scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initHeroSearch() {
    var input = document.getElementById("heroSearchInput");
    var button = document.getElementById("heroSearchBtn");
    if (!input || !button) return;

    var search = function () {
      var value = input.value.trim();
      if (!value) {
        toast("অনুগ্রহ করে বিষয়, কোড বা কি-ওয়ার্ড লিখুন");
        return;
      }
      window.location.href = "/books/?q=" + encodeURIComponent(value);
    };

    button.addEventListener("click", search);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") search();
    });
  }

  function initSchoolTabs() {
    var tabs = $$(".school-tab-btn");
    var cards = $$(".program-card[data-school]");
    if (!tabs.length || !cards.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (other) {
          other.classList.toggle("active", other === tab);
        });
        var school = tab.getAttribute("data-school");
        cards.forEach(function (card) {
          card.style.display =
            school === "all" || card.getAttribute("data-school") === school ? "flex" : "none";
        });
      });
    });
  }

  function initDisabledActions() {
    $$("[data-soon]").forEach(function (button) {
      button.addEventListener("click", function () {
        toast(button.getAttribute("data-soon"));
      });
    });
  }

  function initMiniQuiz() {
    var stage = document.getElementById("homeQuizStage");
    if (!stage) return;

    var items = $$(".home-quiz-item", stage);
    var counter = document.getElementById("homeQuizCounter");
    var next = document.getElementById("homeQuizNext");
    var footer = document.getElementById("homeQuizFooter");
    var result = document.getElementById("homeQuizResult");
    var scoreEl = document.getElementById("homeQuizScore");
    var restart = document.getElementById("homeQuizRestart");
    var current = 0;
    var score = 0;

    function showItem(index) {
      items.forEach(function (item, itemIndex) {
        item.hidden = itemIndex !== index;
      });
      current = index;
      if (counter) counter.textContent = "প্রশ্ন " + toBn(index + 1) + " / " + toBn(items.length);
      if (next) {
        next.disabled = true;
        next.textContent =
          index === items.length - 1 ? "ফলাফল দেখুন →" : "পরবর্তী প্রশ্ন →";
      }
    }

    items.forEach(function (item, itemIndex) {
      var options = $$(".mcq-option", item);
      var explanation = $(".mcq-explanation-box", item);
      var answered = false;
      var correct = Number(item.getAttribute("data-correct"));

      options.forEach(function (option, optionIndex) {
        option.addEventListener("click", function () {
          if (answered) return;
          answered = true;
          options.forEach(function (entry, entryIndex) {
            entry.style.pointerEvents = "none";
            if (entryIndex === correct) entry.classList.add("correct");
            else if (entryIndex === optionIndex) entry.classList.add("incorrect");
          });
          if (explanation) explanation.hidden = false;
          if (optionIndex === correct) score += 1;
          if (next) next.disabled = false;
        });
      });

      if (itemIndex === 0) showItem(0);
    });

    if (next) {
      next.addEventListener("click", function () {
        if (current < items.length - 1) {
          showItem(current + 1);
        } else {
          if (stage) stage.hidden = true;
          if (footer) footer.hidden = true;
          if (result) result.hidden = false;
          if (scoreEl) scoreEl.textContent = toBn(score);
        }
      });
    }

    if (restart) {
      restart.addEventListener("click", function () {
        score = 0;
        items.forEach(function (item) {
          item.hidden = true;
          $$(".mcq-option", item).forEach(function (option) {
            option.classList.remove("correct", "incorrect");
            option.style.pointerEvents = "";
          });
          var explanation = $(".mcq-explanation-box", item);
          if (explanation) explanation.hidden = true;
        });
        if (stage) stage.hidden = false;
        if (footer) footer.hidden = false;
        if (result) result.hidden = true;
        if (scoreEl) scoreEl.textContent = "0";
        bindItemsAgain();
        showItem(0);
      });
    }

    // Re-bind option clicks after a restart by reloading the page state is simpler:
    // the blocks above keep their original listeners, so only the answered flags need reset.
    function bindItemsAgain() {
      items.forEach(function (item) {
        var options = $$(".mcq-option", item);
        var explanation = $(".mcq-explanation-box", item);
        var correct = Number(item.getAttribute("data-correct"));
        var answered = false;
        options.forEach(function (option, optionIndex) {
          option.onclick = function () {
            if (answered) return;
            answered = true;
            options.forEach(function (entry, entryIndex) {
              entry.style.pointerEvents = "none";
              if (entryIndex === correct) entry.classList.add("correct");
              else if (entryIndex === optionIndex) entry.classList.add("incorrect");
            });
            if (explanation) explanation.hidden = false;
            if (optionIndex === correct) score += 1;
            if (next) next.disabled = false;
          };
        });
      });
    }
  }

  function initBooks() {
    var container = document.getElementById("booksContainer");
    if (!container) return;

    var level = document.getElementById("bookLevelFilter");
    var year = document.getElementById("bookYearFilter");
    var semester = document.getElementById("bookSemesterFilter");
    var group = document.getElementById("bookGroupFilter");
    var search = document.getElementById("bookSearchInput");
    var empty = document.getElementById("booksEmptyState");
    var emptyTitle = empty ? $(".books-empty-title", empty) : null;
    var cards = $$(".book-card", container);
    var params = new URLSearchParams(window.location.search);

    if (params.get("level")) level.value = params.get("level");
    if (params.get("year")) year.value = params.get("year");
    if (params.get("semester")) semester.value = params.get("semester");
    if (params.get("q")) search.value = params.get("q");

    function apply() {
      var needle = search.value.toLowerCase().trim();
      var normalized = needle.replace(/\s+/g, "");
      var visible = 0;

      cards.forEach(function (card) {
        var show = true;
        if (level.value !== "all" && card.getAttribute("data-level") !== level.value) show = false;

        if (show && year.value === "1st") {
          show = (card.getAttribute("data-year") || "").indexOf("১ম") !== -1;
        } else if (show && year.value === "2nd") {
          show = (card.getAttribute("data-year") || "").indexOf("২য়") !== -1;
        }

        if (show && semester.value !== "all") {
          show = card.getAttribute("data-semester") === semester.value;
        }

        if (show && group && group.value !== "all") {
          show = card.getAttribute("data-group") === group.value;
        }

        if (show && needle) {
          var haystack = (card.getAttribute("data-search") || "").toLowerCase();
          show =
            haystack.indexOf(needle) !== -1 ||
            (normalized.length > 2 && haystack.replace(/\s+/g, "").indexOf(normalized) !== -1);
        }

        card.classList.toggle("is-filtered-out", !show);
        if (show) visible += 1;
      });

      $$(".books-semester-row", container).forEach(function (heading) {
        var sibling = heading.nextElementSibling;
        var groupVisible = false;
        while (sibling && !sibling.classList.contains("books-semester-row")) {
          if (sibling.classList.contains("book-card") && !sibling.classList.contains("is-filtered-out")) {
            groupVisible = true;
          }
          sibling = sibling.nextElementSibling;
        }
        heading.classList.toggle("is-filtered-out", !groupVisible);
      });

      if (empty) {
        empty.hidden = visible !== 0;
        if (emptyTitle) {
          emptyTitle.textContent = needle
            ? '"' + search.value.trim() + '" বিষয়ে কোনো ই-বুক পাওয়া যায়নি'
            : "এই ফিল্টারে কোনো ই-বুক পাওয়া যায়নি";
        }
      }

      var next = new URLSearchParams();
      if (level.value !== "all") next.set("level", level.value);
      if (year.value !== "all") next.set("year", year.value);
      if (semester.value !== "all") next.set("semester", semester.value);
      if (search.value.trim()) next.set("q", search.value.trim());
      var qs = next.toString();
      window.history.replaceState(null, "", qs ? "/books/?" + qs : "/books/");
    }

    var debounce;
    function schedule() {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(apply, 200);
    }

    [level, year, semester, group].forEach(function (select) {
      if (select) select.addEventListener("change", apply);
    });
    search.addEventListener("input", schedule);

    level.addEventListener("change", function () {
      year.value = "all";
      semester.value = "all";
      if (group) group.value = "all";
      apply();
    });

    apply();
  }

  function initQuestionFilters() {
    var year = document.getElementById("qYearFilter");
    if (!year) return;
    var program = document.getElementById("qProgramFilter");
    var search = document.getElementById("qSearchInput");
    var params = new URLSearchParams(window.location.search);

    if (params.get("year")) year.value = params.get("year");
    if (params.get("program")) program.value = params.get("program");
    if (params.get("q")) search.value = params.get("q");

    function update() {
      var next = new URLSearchParams();
      if (year.value !== "all") next.set("year", year.value);
      if (program.value !== "all") next.set("program", program.value);
      if (search.value.trim()) next.set("q", search.value.trim());
      var qs = next.toString();
      window.history.replaceState(null, "", qs ? "/questions/?" + qs : "/questions/");
    }

    year.addEventListener("change", update);
    program.addEventListener("change", update);
    search.addEventListener("input", update);
  }

  function pad(value) {
    return value < 10 ? "0" + value : String(value);
  }

  function formatTime(seconds) {
    return pad(Math.floor(seconds / 60)) + ":" + pad(seconds % 60);
  }

  function gradeFor(percentage) {
    if (percentage >= 80) return "A+ (Outstanding)";
    if (percentage >= 70) return "A (Excellent)";
    if (percentage >= 60) return "A- (Very Good)";
    if (percentage >= 50) return "B (Good)";
    if (percentage >= 40) return "C (Pass)";
    return "F";
  }

  function initMcqEngine() {
    var dataRoot = document.getElementById("mcqQuestionData");
    var arena = document.getElementById("mcqMainArena");
    if (!dataRoot || !arena) return;

    var questions = $$(".mcq-source-question", dataRoot).map(function (node) {
      return {
        text: $(".mcq-source-text", node).textContent.trim(),
        options: $$(".mcq-source-options li", node).map(function (item) {
          return item.textContent.trim();
        }),
        correct: Number(node.getAttribute("data-correct")),
        unit: node.getAttribute("data-unit") || "",
        lesson: node.getAttribute("data-lesson") || "",
        explanation: $(".mcq-source-explanation", node).textContent.trim(),
      };
    });

    if (!questions.length) return;

    var duration = Number(dataRoot.getAttribute("data-duration")) || 600;
    var code = $("#arenaSubjectCode").textContent.trim();
    var title = $("#arenaSubjectTitle").textContent.trim();
    var questionText = $("#arenaQuestionText");
    var optionsWrap = $("#arenaOptionsWrap");
    var sourceBox = $("#arenaQuestionSource");
    var counter = $("#currentQNum");
    var totalEl = $("#totalQCount");
    var timerBadge = $("#examTimerBadge");
    var timerDisplay = $("#examTimerDisplay");
    var explanationBox = $("#arenaPracticeExplanation");
    var revealRow = $("#mcqRevealRow");
    var revealBtn = $("#mcqRevealAnswerBtn");
    var prevBtn = $("#mcqPrevBtn");
    var nextBtn = $("#mcqNextBtn");
    var markBtn = $("#mcqMarkReviewBtn");
    var submitBtn = $("#mcqSubmitExamBtn");
    var paletteWrap = $("#mcqPaletteGrid");
    var palette = $$("[data-palette]", paletteWrap);
    var resultSection = $("#mcqResultSection");
    var modeInputs = $$('input[name="mcqMode"]');

    var index = 0;
    var answers = {};
    var marked = new Set();
    var revealed = new Set();
    var mode = "exam";
    var submitted = false;
    var seconds = duration;
    var timerId = null;

    totalEl.textContent = questions.length;

    function startTimer() {
      stopTimer();
      if (mode !== "exam" || submitted) return;
      timerId = window.setInterval(function () {
        seconds -= 1;
        if (seconds <= 0) {
          seconds = 0;
          renderTimer();
          stopTimer();
          toast("Time is up! Exam auto-submitting...");
          submit();
          return;
        }
        renderTimer();
      }, 1000);
    }

    function stopTimer() {
      if (timerId) window.clearInterval(timerId);
      timerId = null;
    }

    function renderTimer() {
      if (!timerBadge || !timerDisplay) return;
      timerBadge.style.display = mode === "exam" ? "inline-flex" : "none";
      timerDisplay.textContent = formatTime(seconds);
      if (mode === "exam" && seconds < 120) {
        timerBadge.style.background = "#fee2e2";
        timerBadge.style.color = "#dc2626";
      } else {
        timerBadge.style.background = "";
        timerBadge.style.color = "";
      }
    }

    function answerFor(i) {
      return answers[i];
    }

    function isRevealed(i) {
      return mode === "practice" && (answerFor(i) !== undefined || revealed.has(i));
    }

    function renderOptions() {
      var question = questions[index];
      var answer = answerFor(index);
      var show = isRevealed(index);
      optionsWrap.innerHTML = "";
      question.options.forEach(function (option, optionIndex) {
        var div = document.createElement("div");
        div.className = "mcq-option";
        if (answer === optionIndex) div.classList.add("selected");
        if (show) {
          if (optionIndex === question.correct) div.classList.add("correct");
          else if (optionIndex === answer) div.classList.add("incorrect");
        }
        div.innerHTML =
          '<span class="mcq-option-letter">' +
          LETTERS[optionIndex] +
          '</span><span class="mcq-option-label">' +
          esc(option) +
          "</span>";
        div.addEventListener("click", function () {
          if (submitted) return;
          answers[index] = optionIndex;
          render();
        });
        optionsWrap.appendChild(div);
      });
    }

    function renderPalette() {
      palette.forEach(function (button, i) {
        button.classList.toggle("active", i === index);
        button.classList.toggle("answered", answers[i] !== undefined);
        button.classList.toggle("marked", marked.has(i));
      });
    }

    function render() {
      var question = questions[index];
      counter.textContent = index + 1;
      questionText.textContent = question.text;

      if (sourceBox) {
        sourceBox.style.display = question.unit || question.lesson ? "flex" : "none";
        sourceBox.innerHTML =
          (question.unit ? '<span class="mcq-question-unit">' + esc(question.unit) + "</span>" : "") +
          (question.lesson
            ? '<span class="mcq-question-lesson">' + esc(question.lesson) + "</span>"
            : "");
      }

      renderOptions();

      var show = isRevealed(index);
      if (revealRow) revealRow.style.display = mode === "practice" ? "flex" : "none";
      if (revealBtn) {
        revealBtn.disabled = show;
        revealBtn.textContent = show ? "✅ সঠিক উত্তর দেখানো হয়েছে" : "👁 সঠিক উত্তর দেখুন";
      }
      if (explanationBox) {
        explanationBox.style.display = show ? "block" : "none";
        explanationBox.innerHTML = show
          ? "<strong>ব্যাখ্যা:</strong> " + esc(question.explanation)
          : "";
      }

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= questions.length - 1;
      if (markBtn) {
        var isMarked = marked.has(index);
        markBtn.innerHTML =
          '<span style="color:' +
          (isMarked ? "var(--bou-gold)" : "") +
          '">' +
          (isMarked ? "★" : "☆") +
          "</span> " +
          (isMarked ? "Marked for Review" : "Mark for Review");
      }

      renderPalette();
      renderTimer();
    }

    function resetState() {
      index = 0;
      answers = {};
      marked = new Set();
      revealed = new Set();
      submitted = false;
      seconds = duration;
      if (resultSection) {
        resultSection.hidden = true;
        resultSection.innerHTML = "";
      }
      arena.hidden = false;
      render();
      startTimer();
    }

    function submit() {
      if (submitted) return;
      submitted = true;
      stopTimer();
      showResult();
    }

    function showResult() {
      var total = questions.length;
      var correct = 0;
      var incorrect = 0;
      var review = "";

      questions.forEach(function (question, i) {
        var answer = answers[i];
        var isCorrect = answer === question.correct;
        if (answer === undefined) {
          // skipped
        } else if (isCorrect) {
          correct += 1;
        } else {
          incorrect += 1;
        }

        var status = isCorrect ? "Correct" : answer === undefined ? "Skipped" : "Incorrect";
        var options = question.options
          .map(function (option, optionIndex) {
            var isCorrectOption = optionIndex === question.correct;
            var isUserOption = optionIndex === answer;
            var style = isCorrectOption
              ? "background:var(--bou-emerald-light);font-weight:700;color:#065f46;border:1px solid var(--bou-emerald)"
              : isUserOption
                ? "background:var(--bou-red-light);color:#991b1b;border:1px solid var(--bou-red)"
                : "background:var(--bg-surface-muted)";
            var label = isCorrectOption
              ? " ✓ (Correct)"
              : isUserOption
                ? " ✗ (Your Answer)"
                : "";
            return (
              '<div style="padding:8px 12px;border-radius:6px;' +
              style +
              '">' +
              LETTERS[optionIndex] +
              ". " +
              esc(option) +
              label +
              "</div>"
            );
          })
          .join("");

        review +=
          '<div style="border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:20px;background:var(--bg-surface)">' +
          (question.unit || question.lesson
            ? '<div class="mcq-question-source" style="margin-bottom:8px">' +
              (question.unit
                ? '<span class="mcq-question-unit">' + esc(question.unit) + "</span>"
                : "") +
              (question.lesson
                ? '<span class="mcq-question-lesson">' + esc(question.lesson) + "</span>"
                : "") +
              "</div>"
            : "") +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">' +
          '<strong style="font-size:1rem">Q' +
          (i + 1) +
          ": " +
          esc(question.text) +
          "</strong>" +
          '<span class="badge-live" style="background:' +
          (isCorrect
            ? "var(--bou-emerald)"
            : answer === undefined
              ? "var(--text-muted)"
              : "var(--bou-red)") +
          ';font-size:.6875rem">' +
          status +
          "</span></div>" +
          '<div style="display:flex;flex-direction:column;gap:6px;font-size:.875rem;margin-bottom:12px">' +
          options +
          "</div>" +
          '<div style="background:#f0fdf4;border-left:3px solid var(--bou-emerald);padding:10px 14px;border-radius:4px;font-size:.8125rem;color:#166534"><strong>ব্যাখ্যা:</strong> ' +
          esc(question.explanation) +
          "</div></div>";
      });

      var percentage = Math.round((correct / total) * 100);
      var grade = gradeFor(percentage);

      resultSection.hidden = false;
      arena.hidden = true;
      resultSection.innerHTML =
        '<div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:40px;box-shadow:var(--shadow-lg)">' +
        '<div style="text-align:center;margin-bottom:32px">' +
        '<div style="font-size:3.5rem;margin-bottom:12px">' +
        (percentage >= 50 ? "🎓" : "📚") +
        "</div>" +
        '<h2 style="font-size:2rem;margin-bottom:6px">Examination Result</h2>' +
        '<p style="color:var(--text-muted);font-size:.9375rem">' +
        esc(title) +
        " (" +
        esc(code) +
        ")</p></div>" +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:36px;text-align:center">' +
        '<div style="background:var(--bg-surface-muted);padding:18px;border-radius:var(--radius-lg)"><div style="font-size:1.875rem;font-weight:800;color:var(--bou-navy)">' +
        total +
        '</div><div style="font-size:.75rem;color:var(--text-muted);text-transform:uppercase">Total Questions</div></div>' +
        '<div style="background:var(--bou-emerald-light);padding:18px;border-radius:var(--radius-lg)"><div style="font-size:1.875rem;font-weight:800;color:var(--bou-emerald)">' +
        correct +
        '</div><div style="font-size:.75rem;color:#065f46;text-transform:uppercase">Correct Answers</div></div>' +
        '<div style="background:var(--bou-red-light);padding:18px;border-radius:var(--radius-lg)"><div style="font-size:1.875rem;font-weight:800;color:var(--bou-red)">' +
        incorrect +
        '</div><div style="font-size:.75rem;color:#991b1b;text-transform:uppercase">Incorrect Answers</div></div>' +
        '<div style="background:var(--bou-gold-light);padding:18px;border-radius:var(--radius-lg)"><div style="font-size:1.875rem;font-weight:800;color:#b45309">' +
        percentage +
        '%</div><div style="font-size:.75rem;color:#78350f;text-transform:uppercase">Grade: ' +
        grade +
        "</div></div></div>" +
        '<h3 style="font-size:1.25rem;font-weight:700;margin-bottom:20px;border-bottom:1px solid var(--border-subtle);padding-bottom:10px">Detailed Question Review &amp; Explanations (উত্তরপত্র বিশ্লেষণ)</h3>' +
        '<div style="display:flex;flex-direction:column;gap:20px;margin-bottom:36px">' +
        review +
        "</div>" +
        '<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="mcqRetakeBtn">🔄 Retake Test</button>' +
        '<a href="/home/" class="btn btn-secondary">Back to Home</a></div></div>';

      var retake = document.getElementById("mcqRetakeBtn");
      if (retake) {
        retake.addEventListener("click", function () {
          resetState();
        });
      }
    }

    optionsWrap.addEventListener("click", function () {});
    prevBtn.addEventListener("click", function () {
      if (index > 0) {
        index -= 1;
        render();
      }
    });
    nextBtn.addEventListener("click", function () {
      if (index < questions.length - 1) {
        index += 1;
        render();
      }
    });
    if (markBtn) {
      markBtn.addEventListener("click", function () {
        if (marked.has(index)) {
          marked.delete(index);
          toast("Removed mark from this question");
        } else {
          marked.add(index);
          toast("Marked question for review");
        }
        render();
      });
    }
    if (revealBtn) {
      revealBtn.addEventListener("click", function () {
        if (mode !== "practice") return;
        revealed.add(index);
        render();
      });
    }
    submitBtn.addEventListener("click", submit);

    palette.forEach(function (button, i) {
      button.addEventListener("click", function () {
        index = i;
        render();
      });
    });

    modeInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        if (!input.checked) return;
        mode = input.value;
        resetState();
      });
    });

    render();
    startTimer();
  }

  // PDF reader
  var pdfModulePromise = null;

  function loadPdfModule() {
    if (!pdfModulePromise) {
      pdfModulePromise = import("/assets/js/pdf.min.mjs").then(function (module) {
        module.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.mjs";
        return module;
      });
    }
    return pdfModulePromise;
  }

  var pdfStates = new WeakMap();

  function initPdf(viewer) {
    if (pdfStates.has(viewer) || viewer.getAttribute("data-pdf-loading") === "1") return;
    viewer.setAttribute("data-pdf-loading", "1");

    var src = viewer.getAttribute("data-pdf-src");
    var title = viewer.getAttribute("data-pdf-title") || "";
    var state = $(".pdf-reader-state", viewer);
    var scroll = $(".pdf-reader-scroll", viewer);
    var canvas = $(".pdf-reader-canvas", viewer);
    var controls = $(".pdf-reader-controls", viewer);
    var pageInfo = $("[data-pdf-page]", viewer);
    var zoomInfo = $("[data-pdf-zoom]", viewer);
    var prev = $("[data-pdf-prev]", viewer);
    var next = $("[data-pdf-next]", viewer);
    var zoomOut = $("[data-pdf-zoom-out]", viewer);
    var zoomIn = $("[data-pdf-zoom-in]", viewer);
    var fullscreen = $("[data-pdf-fullscreen]", viewer);

    var pdfDocument = null;
    var pageNum = 1;
    var pageCount = 0;
    var zoom = 1;
    var renderTask = null;
    var destroyed = false;

    var store = {
      destroy: function () {
        destroyed = true;
        if (renderTask) renderTask.cancel();
        if (pdfDocument) pdfDocument.cleanup().catch(function () {});
      },
    };
    pdfStates.set(viewer, store);

    function fail(error) {
      if (state) {
        state.hidden = false;
        state.className = "pdf-reader-state pdf-reader-error";
        state.textContent =
          "PDF লোড করা যায়নি: " + (error && error.message ? error.message : error);
      }
    }

    function setControls() {
      if (pageInfo) pageInfo.textContent = pageNum + " / " + pageCount;
      if (zoomInfo) zoomInfo.textContent = Math.round(zoom * 100) + "%";
      if (prev) prev.disabled = pageNum <= 1;
      if (next) next.disabled = pageNum >= pageCount;
      if (zoomOut) zoomOut.disabled = zoom <= 0.5;
      if (zoomIn) zoomIn.disabled = zoom >= 2.5;
    }

    async function renderPage() {
      if (!pdfDocument || !canvas || !scroll) return;
      try {
        if (renderTask) renderTask.cancel();
        var page = await pdfDocument.getPage(pageNum);
        if (destroyed) return;
        var availableWidth = Math.max(240, scroll.clientWidth - 24);
        var baseViewport = page.getViewport({ scale: 1 });
        var fitScale = availableWidth / baseViewport.width;
        var viewport = page.getViewport({ scale: fitScale * zoom });
        var ratio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";
        var context = canvas.getContext("2d");
        if (!context) return;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        renderTask = page.render({ canvasContext: context, canvas: canvas, viewport: viewport });
        await renderTask.promise;
        renderTask = null;
      } catch (error) {
        if (!destroyed && error && error.name !== "RenderingCancelledException") fail(error);
      }
    }

    async function load() {
      try {
        var pdfjs = await loadPdfModule();
        var response = await fetch(src);
        if (!response.ok) throw new Error("ফাইল পাওয়া যায়নি (" + response.status + ")");
        var data = new Uint8Array(await response.arrayBuffer());
        if (destroyed) return;
        var loadingTask = pdfjs.getDocument({
          data: data,
          cMapUrl: "/assets/pdfjs/cmaps/",
          cMapPacked: true,
          standardFontDataUrl: "/assets/pdfjs/standard_fonts/",
        });
        pdfDocument = await loadingTask.promise;
        if (destroyed) {
          pdfDocument.cleanup().catch(function () {});
          return;
        }
        pageCount = pdfDocument.numPages;
        if (state) state.hidden = true;
        if (scroll) scroll.hidden = false;
        if (controls) controls.hidden = false;
        setControls();
        await renderPage();
      } catch (error) {
        fail(error);
      }
    }

    function go(delta) {
      var target = Math.min(pageCount, Math.max(1, pageNum + delta));
      if (target === pageNum) return;
      pageNum = target;
      setControls();
      if (scroll) scroll.scrollTo({ top: 0, behavior: "smooth" });
      renderPage();
    }

    function changeZoom(delta) {
      zoom = Math.min(2.5, Math.max(0.5, Math.round((zoom + delta) * 100) / 100));
      setControls();
      renderPage();
    }

    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    if (zoomOut) zoomOut.addEventListener("click", function () { changeZoom(-0.2); });
    if (zoomIn) zoomIn.addEventListener("click", function () { changeZoom(0.2); });
    if (fullscreen) {
      fullscreen.addEventListener("click", function () {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(function () {});
        } else if (viewer.requestFullscreen) {
          viewer.requestFullscreen().catch(function () {
            viewer.classList.toggle("pdf-reader-focus");
          });
        } else {
          viewer.classList.toggle("pdf-reader-focus");
        }
      });
    }
    window.addEventListener("resize", function () {
      if (pdfDocument && !destroyed) renderPage();
    });

    load();
  }

  function initUnitAccordions() {
    $$(".subject-reader-unit").forEach(function (unit) {
      var toggle = $(".subject-overview-unit-toggle", unit);
      var body = $(".subject-overview-unit-body", unit);
      var caret = $(".subject-overview-unit-caret", unit);
      if (!toggle || !body) return;
      toggle.addEventListener("click", function () {
        var open = body.hidden;
        body.hidden = !open;
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (caret) caret.textContent = open ? "▲" : "▼";
        if (open) {
          var viewer = $(".pdf-reader", body);
          if (viewer) initPdf(viewer);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initHeader();
    initHeroSearch();
    initSchoolTabs();
    initDisabledActions();
    initMiniQuiz();
    initBooks();
    initQuestionFilters();
    initMcqEngine();
    initUnitAccordions();
  });
})();
