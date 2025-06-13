// ====== Sidebar Navigation and Dashboard Switching ======
const sidebarLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-industry]');
const dashboards = document.querySelectorAll('.dashboard-content');
const mainContent = document.getElementById('main-content');

// Helper: Announce dashboard changes for screen readers
function announceDashboardChange(message) {
    let liveRegion = document.getElementById('dashboard-announcement');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'dashboard-announcement';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.className = 'visually-hidden';
        document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
}

// Dashboard switching logic
document.querySelectorAll('.nav-link[data-industry]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-industry');
    document.querySelectorAll('.dashboard-content').forEach(section => {
      if (section.id === 'dashboard-' + target) {
        section.classList.remove('hidden');
        section.focus();
      } else {
        section.classList.add('hidden');
      }
    });
    setActiveNavLink();
  });
});

        // Show the selected dashboard
        const industry = this.getAttribute('data-industry');
        const dashboard = document.getElementById('dashboard-' + industry);
        if (dashboard) {
            dashboard.classList.remove('hidden');
            // Move focus to the dashboard heading for screen readers
            const heading = dashboard.querySelector('.dashboard-title');
            if (heading) heading.focus();
            announceDashboardChange(heading ? heading.textContent : '');
        }
    });

// Accessibility: Dynamic aria-current for navigation/menu links
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link[data-industry]');
  navLinks.forEach(link => {
    link.setAttribute('aria-current', 'false');
    link.classList.remove('active');
  });
  // Find the visible dashboard section
  const dashboards = document.querySelectorAll('.dashboard-content');
  dashboards.forEach((section, idx) => {
    if (!section.classList.contains('hidden')) {
      navLinks[idx].setAttribute('aria-current', 'page');
      navLinks[idx].classList.add('active');
    }
  });
}
// Skip link focus fix for accessibility
document.querySelector('.skip-link').addEventListener('click', function(e) {
  const main = document.getElementById('main-content');
  main.setAttribute('tabindex', '-1');
  main.focus();
});

// Search input sanitization (basic XSS prevention)
document.getElementById('main-search').addEventListener('input', function (e) {
  this.value = this.value.replace(/[<>]/g, '');
});

// Dark mode toggle
const darkModeBtn = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(mode) {
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkModeBtn.textContent = '☀️';
    darkModeBtn.setAttribute('aria-label', 'Switch to light mode');
    darkModeBtn.setAttribute('title', 'Switch to light mode');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    darkModeBtn.textContent = '🌙';
    darkModeBtn.setAttribute('aria-label', 'Switch to dark mode');
    darkModeBtn.setAttribute('title', 'Switch to dark mode');
  }
}

(function () {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = prefersDark ? 'dark' : 'light';
  }
  setTheme(theme);
})();

darkModeBtn.addEventListener('click', function () {
  let currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});e: dark)').matches;

// ====== Focus Management for Dashboard Headings ======
// Make dashboard headings focusable for accessibility
document.querySelectorAll('.dashboard-title').forEach(title => {
    title.setAttribute('tabindex', '-1');
});

// Keyboard navigation for dashboard cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.click();
    }
  });
});

// Ensure ARIA and focus states are correct on load
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavLink();
});

// ====== Internationalization Readiness (Sample) ======
// To localize, replace UI text via this function and update document.lang
// function setLanguage(lang) {
//     document.documentElement.lang = lang;
//     // Replace UI text content here as needed for your language files
//     // Example: document.querySelector('.logo-text').textContent = translations[lang].logo;
// }

// ====== Initial ARIA live region setup ======
announceDashboardChange(document.querySelector('.dashboard-title')?.textContent || '');

// ====== Optional: Persist Dashboard State Across Reloads ======
// You can use localStorage to remember the last selected dashboard
// Example (uncomment to enable):
// window.addEventListener('DOMContentLoaded', () => {
//     const lastIndustry = localStorage.getItem('activeIndustry');
//     if (lastIndustry) {
//         const link = document.querySelector(`.sidebar-nav .nav-link[data-industry="${lastIndustry}"]`);
//         if (link) link.click();
//     }
// });
// sidebarLinks.forEach(link => {
//     link.addEventListener('click', function () {
//         localStorage.setItem('activeIndustry', this.getAttribute('data-industry'));
//     });
// });
