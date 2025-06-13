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

// Sidebar dashboard switching (mouse and keyboard)
sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active state and aria-current from all links
        sidebarLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });

        // Add active state and aria-current to current link
        this.classList.add('active');
        this.setAttribute('aria-current', 'page');

        // Hide all dashboards
        dashboards.forEach(dash => dash.classList.add('hidden'));

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

    // Accessibility: Keyboard navigation (Enter, Space)
    link.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ====== Skip Link Focus Support ======
const skipLink = document.querySelector('.skip-link');
if (skipLink && mainContent) {
    skipLink.addEventListener('click', function(e) {
        // Timeout ensures focus after browser jump
        setTimeout(() => mainContent.focus(), 10);
    });
}

// ====== Search Bar Demo (Ready for i18n) ======
const searchForm = document.querySelector('.search-bar');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Placeholder: Replace with real search logic or i18n
        alert('Search not implemented in this demo.');
    });
}

// ====== Focus Management for Dashboard Headings ======
// Make dashboard headings focusable for accessibility
document.querySelectorAll('.dashboard-title').forEach(title => {
    title.setAttribute('tabindex', '-1');
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
