/**
 * Task 5: Tech Product Landing Page (AuraMetrics)
 * Features:
 * - Theme toggle (Light / Dark mode) with localStorage sync (Bonus)
 * - Auto-detect OS system color scheme preference
 * - Mobile responsive drawer toggle
 * - Smooth scroll anchor navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  const mobileHamburger = document.getElementById('mobileHamburger');
  const navLinks = document.getElementById('navLinks');

  const THEME_STORAGE_KEY = 'aurametrics_theme_preference';

  // 1. Initialize Theme Preference
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Check OS preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Listen for OS scheme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Mobile Hamburger Toggle
  if (mobileHamburger && navLinks) {
    mobileHamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileHamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu when clicking nav item
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  initTheme();
});

