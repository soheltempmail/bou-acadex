/**
 * BOU ACADEX - MCQ EXAMINATION & PRACTICE ENGINE
 * Question banks are loaded from the TypeScript backend (GET /api/mcq).
 * Includes timer, palette tracking, scoring, grading, and answer review.
 */

let mcqQuestionBanks = {};
let subjectSummaries = [];
let currentSubjectKey = null;
let currentMode = 'exam'; // 'exam' or 'practice'
let currentQuestionIndex = 0;
let userAnswers = {}; // { qIndex: selectedOptionIndex }
let markedReview = new Set();
let timerSeconds = 600;
let timerInterval = null;
let isExamSubmitted = false;

document.addEventListener('DOMContentLoaded', async () => {
  if (!document.getElementById('mcqEnginePage')) return;

  const subjectSelect = document.getElementById('mcqSubjectSelect');
  try {
    const response = await window.BOU_API.get('/mcq');
    subjectSummaries = response.data || [];
  } catch (error) {
    showToast('Could not load MCQ subjects: ' + error.message);
    return;
  }

  if (subjectSelect) {
    subjectSelect.innerHTML = subjectSummaries
      .map((subject) => `<option value="${subject.key}">${subject.title} (${subject.code})</option>`)
      .join('');
  }

  initMCQControls();

  if (subjectSummaries.length) {
    loadSubject(subjectSummaries[0].key);
  }
});

function initMCQControls() {
  const subjectSelect = document.getElementById('mcqSubjectSelect');
  const modeRadios = document.querySelectorAll('input[name="mcqMode"]');
  const prevBtn = document.getElementById('mcqPrevBtn');
  const nextBtn = document.getElementById('mcqNextBtn');
  const markBtn = document.getElementById('mcqMarkReviewBtn');
  const submitBtn = document.getElementById('mcqSubmitExamBtn');

  if (subjectSelect) {
    subjectSelect.addEventListener('change', (e) => {
      loadSubject(e.target.value);
    });
  }

  modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentMode = e.target.value;
      const timerBadge = document.getElementById('examTimerBadge');
      if (timerBadge) {
        timerBadge.style.display = currentMode === 'exam' ? 'inline-flex' : 'none';
      }
      resetExamState();
      renderCurrentQuestion();
      renderPalette();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderCurrentQuestion();
        renderPalette();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const bank = mcqQuestionBanks[currentSubjectKey].questions;
      if (currentQuestionIndex < bank.length - 1) {
        currentQuestionIndex++;
        renderCurrentQuestion();
        renderPalette();
      }
    });
  }

  if (markBtn) {
    markBtn.addEventListener('click', () => {
      if (markedReview.has(currentQuestionIndex)) {
        markedReview.delete(currentQuestionIndex);
        showToast('Removed mark from this question');
      } else {
        markedReview.add(currentQuestionIndex);
        showToast('Marked question for review');
      }
      updateMarkButtonState();
      renderPalette();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitExam();
    });
  }
}

async function loadSubject(key) {
  if (!key) return;
  currentSubjectKey = key;

  if (!mcqQuestionBanks[key]) {
    try {
      const bank = await window.BOU_API.get('/mcq?subject=' + encodeURIComponent(key));
      mcqQuestionBanks[key] = {
        title: bank.title,
        code: bank.code,
        school: bank.school,
        duration: bank.duration,
        questions: bank.questions
      };
    } catch (error) {
      showToast('Could not load subject: ' + error.message);
      return;
    }
  }

  resetExamState();

  const titleEl = document.getElementById('arenaSubjectTitle');
  const codeEl = document.getElementById('arenaSubjectCode');
  if (titleEl) titleEl.textContent = mcqQuestionBanks[key].title;
  if (codeEl) codeEl.textContent = mcqQuestionBanks[key].code;

  renderCurrentQuestion();
  renderPalette();
  startTimer();
}

function resetExamState() {
  clearInterval(timerInterval);
  currentQuestionIndex = 0;
  userAnswers = {};
  markedReview.clear();
  isExamSubmitted = false;
  timerSeconds = (mcqQuestionBanks[currentSubjectKey] && mcqQuestionBanks[currentSubjectKey].duration) || 600;

  const resultContainer = document.getElementById('mcqResultSection');
  const arenaContainer = document.getElementById('mcqMainArena');
  if (resultContainer) resultContainer.style.display = 'none';
  if (arenaContainer) arenaContainer.style.display = 'block';
}

function startTimer() {
  clearInterval(timerInterval);
  if (currentMode !== 'exam') return;

  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      showToast('Time is up! Exam auto-submitting...');
      submitExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const displayEl = document.getElementById('examTimerDisplay');
  if (!displayEl) return;

  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  displayEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const badge = document.getElementById('examTimerBadge');
  if (badge) {
    if (timerSeconds < 120) {
      badge.style.background = '#fee2e2';
      badge.style.color = '#dc2626';
    } else {
      badge.style.background = '';
      badge.style.color = '';
    }
  }
}

function renderCurrentQuestion() {
  const bank = mcqQuestionBanks[currentSubjectKey].questions;
  const qData = bank[currentQuestionIndex];
  if (!qData) return;

  const numEl = document.getElementById('currentQNum');
  const totalEl = document.getElementById('totalQCount');
  const textEl = document.getElementById('arenaQuestionText');
  const optionsWrap = document.getElementById('arenaOptionsWrap');
  const practiceExpBox = document.getElementById('arenaPracticeExplanation');
  const prevBtn = document.getElementById('mcqPrevBtn');
  const nextBtn = document.getElementById('mcqNextBtn');

  if (numEl) numEl.textContent = currentQuestionIndex + 1;
  if (totalEl) totalEl.textContent = bank.length;
  if (textEl) textEl.textContent = qData.question;
  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
  if (nextBtn) nextBtn.disabled = currentQuestionIndex === bank.length - 1;

  updateMarkButtonState();

  if (practiceExpBox) {
    if (currentMode === 'practice' && userAnswers[currentQuestionIndex] !== undefined) {
      practiceExpBox.style.display = 'block';
      practiceExpBox.innerHTML = `<strong>ব্যাখ্যা:</strong> ${qData.explanation}`;
    } else {
      practiceExpBox.style.display = 'none';
    }
  }

  if (optionsWrap) {
    optionsWrap.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    qData.options.forEach((optText, optIdx) => {
      const optEl = document.createElement('div');
      optEl.className = 'mcq-option';

      const isSelected = userAnswers[currentQuestionIndex] === optIdx;
      if (isSelected) optEl.classList.add('selected');

      // Practice mode direct feedback
      if (currentMode === 'practice' && userAnswers[currentQuestionIndex] !== undefined) {
        if (optIdx === qData.correct) {
          optEl.classList.add('correct');
        } else if (isSelected) {
          optEl.classList.add('incorrect');
        }
      }

      optEl.innerHTML = `
        <span class="mcq-option-letter">${letters[optIdx]}</span>
        <span class="mcq-option-label">${optText}</span>
      `;

      optEl.addEventListener('click', () => {
        if (isExamSubmitted) return;
        userAnswers[currentQuestionIndex] = optIdx;
        renderCurrentQuestion();
        renderPalette();
      });

      optionsWrap.appendChild(optEl);
    });
  }
}

function updateMarkButtonState() {
  const markBtn = document.getElementById('mcqMarkReviewBtn');
  if (!markBtn) return;
  if (markedReview.has(currentQuestionIndex)) {
    markBtn.innerHTML = `<span>★</span> Marked for Review`;
    markBtn.style.color = 'var(--bou-gold)';
  } else {
    markBtn.innerHTML = `<span>☆</span> Mark for Review`;
    markBtn.style.color = '';
  }
}

function renderPalette() {
  const paletteWrap = document.getElementById('mcqPaletteGrid');
  if (!paletteWrap) return;

  const bank = mcqQuestionBanks[currentSubjectKey].questions;
  paletteWrap.innerHTML = '';

  bank.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.className = 'palette-number-btn';
    btn.textContent = idx + 1;

    if (idx === currentQuestionIndex) {
      btn.classList.add('active');
    }
    if (userAnswers[idx] !== undefined) {
      btn.classList.add('answered');
    }
    if (markedReview.has(idx)) {
      btn.classList.add('marked');
    }

    btn.addEventListener('click', () => {
      currentQuestionIndex = idx;
      renderCurrentQuestion();
      renderPalette();
    });

    paletteWrap.appendChild(btn);
  });
}

function submitExam() {
  clearInterval(timerInterval);
  isExamSubmitted = true;

  const bank = mcqQuestionBanks[currentSubjectKey].questions;
  const total = bank.length;
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;

  bank.forEach((q, idx) => {
    const ans = userAnswers[idx];
    if (ans === undefined) {
      skipped++;
    } else if (ans === q.correct) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const percentage = Math.round((correct / total) * 100);
  let grade = 'F';
  if (percentage >= 80) grade = 'A+ (Outstanding)';
  else if (percentage >= 70) grade = 'A (Excellent)';
  else if (percentage >= 60) grade = 'A- (Very Good)';
  else if (percentage >= 50) grade = 'B (Good)';
  else if (percentage >= 40) grade = 'C (Pass)';

  const resultContainer = document.getElementById('mcqResultSection');
  const arenaContainer = document.getElementById('mcqMainArena');

  if (arenaContainer) arenaContainer.style.display = 'none';
  if (resultContainer) {
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
      <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 40px; box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">${percentage >= 50 ? '🎓' : '📚'}</div>
          <h2 style="font-size: 2rem; margin-bottom: 6px;">Examination Result</h2>
          <p style="color: var(--text-muted); font-size: 0.9375rem;">${mcqQuestionBanks[currentSubjectKey].title} (${mcqQuestionBanks[currentSubjectKey].code})</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; text-align: center;">
          <div style="background: var(--bg-surface-muted); padding: 18px; border-radius: var(--radius-lg);">
            <div style="font-size: 1.875rem; font-weight: 800; color: var(--bou-navy);">${total}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Questions</div>
          </div>
          <div style="background: var(--bou-emerald-light); padding: 18px; border-radius: var(--radius-lg);">
            <div style="font-size: 1.875rem; font-weight: 800; color: var(--bou-emerald);">${correct}</div>
            <div style="font-size: 0.75rem; color: #065f46; text-transform: uppercase;">Correct Answers</div>
          </div>
          <div style="background: var(--bou-red-light); padding: 18px; border-radius: var(--radius-lg);">
            <div style="font-size: 1.875rem; font-weight: 800; color: var(--bou-red);">${incorrect}</div>
            <div style="font-size: 0.75rem; color: #991b1b; text-transform: uppercase;">Incorrect Answers</div>
          </div>
          <div style="background: var(--bou-gold-light); padding: 18px; border-radius: var(--radius-lg);">
            <div style="font-size: 1.875rem; font-weight: 800; color: #b45309;">${percentage}%</div>
            <div style="font-size: 0.75rem; color: #78350f; text-transform: uppercase;">Grade: ${grade}</div>
          </div>
        </div>

        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
          Detailed Question Review & Explanations (উত্তরপত্র বিশ্লেষণ)
        </h3>

        <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 36px;">
          ${bank.map((q, idx) => {
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.correct;
            const letters = ['A', 'B', 'C', 'D'];
            return `
              <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; background: var(--bg-surface);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                  <strong style="font-size: 1rem;">Q${idx + 1}: ${q.question}</strong>
                  <span class="badge-live" style="background: ${isCorrect ? 'var(--bou-emerald)' : userAns === undefined ? 'var(--text-muted)' : 'var(--bou-red)'}; font-size: 0.6875rem;">
                    ${isCorrect ? 'Correct' : userAns === undefined ? 'Skipped' : 'Incorrect'}
                  </span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.875rem; margin-bottom: 12px;">
                  ${q.options.map((opt, oIdx) => {
                    let optStyle = "padding: 8px 12px; border-radius: 6px; background: var(--bg-surface-muted);";
                    if (oIdx === q.correct) {
                      optStyle += " background: var(--bou-emerald-light); font-weight: 700; color: #065f46; border: 1px solid var(--bou-emerald);";
                    } else if (oIdx === userAns) {
                      optStyle += " background: var(--bou-red-light); color: #991b1b; border: 1px solid var(--bou-red);";
                    }
                    return `<div style="${optStyle}">${letters[oIdx]}. ${opt} ${oIdx === q.correct ? ' ✓ (Correct)' : oIdx === userAns ? ' ✗ (Your Answer)' : ''}</div>`;
                  }).join('')}
                </div>
                <div style="background: #f0fdf4; border-left: 3px solid var(--bou-emerald); padding: 10px 14px; border-radius: 4px; font-size: 0.8125rem; color: #166534;">
                  <strong>ব্যাখ্যা:</strong> ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="loadSubject('${currentSubjectKey}')">
            🔄 Retake Test
          </button>
          <a href="index.html" class="btn btn-secondary">Back to Home</a>
        </div>
      </div>
    `;
  }
}

window.loadSubject = loadSubject;
window.submitExam = submitExam;
