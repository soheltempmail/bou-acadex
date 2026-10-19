/**
 * BOU ACADEX - MAIN APPLICATION JAVASCRIPT
 * Handles Theme Toggling, Mobile Navigation, Search Filtering,
 * School Tabs, Modal Windows, and Interactive Mini-Quiz.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initHeaderScroll();
  initSchoolTabs();
  initHomeMiniQuiz();
  initGlobalSearch();
  initModalHandlers();
});

/* ==========================================================================
   THEME TOGGLING (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('bou_acadex_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('bou_acadex_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn svg');
  if (!icon) return;
  if (theme === 'dark') {
    // Sun icon
    icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  } else {
    // Moon icon
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  }
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('mainNavMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }
}

/* ==========================================================================
   HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

/* ==========================================================================
   SCHOOL TABS SWITCHER
   ========================================================================== */
function initSchoolTabs() {
  const tabBtns = document.querySelectorAll('.school-tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const schoolFilter = btn.getAttribute('data-school');

      programCards.forEach(card => {
        const cardSchool = card.getAttribute('data-school');
        if (schoolFilter === 'all' || cardSchool === schoolFilter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   HOME INTERACTIVE MINI-QUIZ (DEMO ENGINE)
   ========================================================================== */
const homeMiniQuestions = [
  {
    question: "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) কত সালে প্রতিষ্ঠিত হয়?",
    options: [
      "১৯৮৮ সালে",
      "১৯৯২ সালে",
      "১৯৯৫ সালে",
      "১৯৯৯ সালে"
    ],
    correctIndex: 1,
    explanation: "বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় আইন ১৯৯২ (১৯৯২ সনের ৩৮ নং আইন) অনুযায়ী ২০ অক্টোবর ১৯৯২ সালে প্রতিষ্ঠিত হয়।"
  },
  {
    question: "BBA প্রোগ্রামের মৌলিক নীতি অনুযায়ী 'Double Entry System' এর জনক কে?",
    options: [
      "এডাম স্মিথ",
      "লুকা প্যাসিওলি",
      "এফ ডব্লিউ টেলর",
      "হেনরি ফেয়ল"
    ],
    correctIndex: 1,
    explanation: "১৪৯৪ সালে ইতালীয় গণিতবিদ লুকা প্যাসিওলি (Luca Pacioli) দুতরফা দাখিলা পদ্ধতির মূলনীতি ব্যাখ্যা করেন।"
  },
  {
    question: "কম্পিউটার ও তথ্যপ্রযুক্তিতে (ICT) IPv4 অ্যাড্রেস কত বিটের হয়ে থাকে?",
    options: [
      "১৬ বিট",
      "৩২ বিট",
      "৬৪ বিট",
      "১২৮ বিট"
    ],
    correctIndex: 1,
    explanation: "IPv4 অ্যাড্রেস হলো ৩২ বিটের সংখ্যা যা ৪টি অক্টেটে বিভক্ত থাকে (যেমন 192.168.1.1)।"
  }
];

let currentHomeQIdx = 0;
let homeQuizScore = 0;

function initHomeMiniQuiz() {
  const container = document.getElementById('homeMiniQuiz');
  if (!container) return;

  renderHomeMiniQuiz(0);
}

function renderHomeMiniQuiz(index) {
  const qData = homeMiniQuestions[index];
  const qTextEl = document.getElementById('homeQuizQuestion');
  const optionsWrap = document.getElementById('homeQuizOptions');
  const feedbackEl = document.getElementById('homeQuizExplanation');
  const qCounterEl = document.getElementById('homeQuizCounter');
  const nextBtn = document.getElementById('homeQuizNextBtn');

  if (!qTextEl || !optionsWrap) return;

  qTextEl.textContent = `${index + 1}. ${qData.question}`;
  if (qCounterEl) qCounterEl.textContent = `Question ${index + 1} of ${homeMiniQuestions.length}`;
  if (feedbackEl) feedbackEl.style.display = 'none';
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = index === homeMiniQuestions.length - 1 ? 'Finish Demo' : 'Next Question';
  }

  optionsWrap.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  qData.options.forEach((optText, optIdx) => {
    const optEl = document.createElement('div');
    optEl.className = 'mcq-option';
    optEl.innerHTML = `
      <span class="mcq-option-letter">${letters[optIdx]}</span>
      <span class="mcq-option-label">${optText}</span>
    `;

    optEl.addEventListener('click', () => {
      // Prevent re-selection
      const allOpts = optionsWrap.querySelectorAll('.mcq-option');
      allOpts.forEach(o => o.style.pointerEvents = 'none');

      if (optIdx === qData.correctIndex) {
        optEl.classList.add('correct');
        homeQuizScore++;
      } else {
        optEl.classList.add('incorrect');
        // highlight correct one
        allOpts[qData.correctIndex].classList.add('correct');
      }

      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.innerHTML = `<strong>ব্যাখ্যা:</strong> ${qData.explanation}`;
      }

      if (nextBtn) nextBtn.disabled = false;
    });

    optionsWrap.appendChild(optEl);
  });

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (index < homeMiniQuestions.length - 1) {
        renderHomeMiniQuiz(index + 1);
      } else {
        showHomeQuizResult();
      }
    };
  }
}

function showHomeQuizResult() {
  const box = document.getElementById('homeMiniQuiz');
  if (!box) return;

  box.innerHTML = `
    <div style="text-align: center; padding: 30px 10px;">
      <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
      <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Demo Quiz Completed!</h3>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">
        You scored <strong>${homeQuizScore}</strong> out of <strong>${homeMiniQuestions.length}</strong>!
      </p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <a href="mcq-test.html" class="btn btn-primary">Take Full MCQ Mock Test</a>
        <button onclick="location.reload()" class="btn btn-secondary">Retry Demo</button>
      </div>
    </div>
  `;
}

/* ==========================================================================
   GLOBAL SEARCH BAR (Hero & Filters)
   ========================================================================== */
function initGlobalSearch() {
  const heroSearchInput = document.getElementById('heroSearchInput');
  const heroSearchBtn = document.getElementById('heroSearchBtn');

  if (heroSearchInput && heroSearchBtn) {
    const handleSearch = () => {
      const query = heroSearchInput.value.trim();
      if (!query) {
        showToast('Please type a subject, course code, or topic to search.');
        return;
      }
      // Redirect to suggestions page with search parameter
      window.location.href = `suggestions.html?search=${encodeURIComponent(query)}`;
    };

    heroSearchBtn.addEventListener('click', handleSearch);
    heroSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
}

/* ==========================================================================
   MODAL HANDLERS
   ========================================================================== */
function initModalHandlers() {
  const modalOverlay = document.getElementById('globalModalOverlay');
  const modalCloseBtn = document.getElementById('globalModalClose');

  if (modalOverlay && modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }
}

function openModal(title, contentHtml, footerActionHtml = '') {
  const modalOverlay = document.getElementById('globalModalOverlay');
  const modalTitle = document.getElementById('globalModalTitle');
  const modalBody = document.getElementById('globalModalBody');
  const modalFooter = document.getElementById('globalModalFooter');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalBody.innerHTML = contentHtml;
  if (modalFooter) {
    modalFooter.innerHTML = footerActionHtml || `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`;
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('globalModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: var(--bou-navy);
    color: #ffffff;
    padding: 12px 20px;
    border-radius: var(--radius-md);
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
    border-left: 4px solid var(--bou-gold);
    font-size: 0.875rem;
    font-weight: 600;
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = `<span>⚡</span> ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Global exposure for inline HTML events
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
