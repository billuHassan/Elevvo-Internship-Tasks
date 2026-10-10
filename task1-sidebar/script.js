/**
 * Task 1: Collapsible Sidebar Component
 * Features:
 * - Desktop collapse / expand toggle with transition
 * - Mobile off-canvas drawer with backdrop blur (Bonus)
 * - LocalStorage persistence for user state
 * - Keyboard shortcut (Ctrl/Cmd + B)
 * - Active link indicator switching
 */

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const headerToggleAction = document.getElementById('headerToggleAction');
  const navLinks = document.querySelectorAll('.nav-link');

  const STORAGE_KEY = 'nexus_sidebar_collapsed';

  // Restore saved state on desktop
  const isMobile = () => window.innerWidth <= 768;

  function initSidebarState() {
    if (!isMobile()) {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState === 'true') {
        sidebar.classList.add('collapsed');
        sidebarToggle.setAttribute('aria-expanded', 'false');
      } else {
        sidebar.classList.remove('collapsed');
        sidebarToggle.setAttribute('aria-expanded', 'true');
      }
    }
  }

  // Toggle Sidebar on Desktop
  function toggleDesktopSidebar() {
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    sidebarToggle.setAttribute('aria-expanded', (!isCollapsed).toString());
    localStorage.setItem(STORAGE_KEY, isCollapsed.toString());
  }

  // Toggle Mobile Drawer
  function toggleMobileSidebar() {
    const isOpen = sidebar.classList.toggle('mobile-open');
    sidebarBackdrop.classList.toggle('active', isOpen);
    sidebarBackdrop.setAttribute('aria-hidden', (!isOpen).toString());
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('mobile-open');
    sidebarBackdrop.classList.remove('active');
    sidebarBackdrop.setAttribute('aria-hidden', 'true');
  }

  // Unified Toggle Handler
  function handleSidebarToggle() {
    if (isMobile()) {
      toggleMobileSidebar();
    } else {
      toggleDesktopSidebar();
    }
  }

  // Event Listeners
  sidebarToggle.addEventListener('click', handleSidebarToggle);
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
  }
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }
  if (headerToggleAction) {
    headerToggleAction.addEventListener('click', handleSidebarToggle);
  }

  // Active Link Switcher
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      if (isMobile()) {
        closeMobileSidebar();
      }
    });
  });

  // Keyboard shortcut: Ctrl + B (or Cmd + B on Mac)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      handleSidebarToggle();
    }
  });

  // Handle window resize dynamically
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      closeMobileSidebar();
      initSidebarState();
    }
  });

  // Initialize
  initSidebarState();
});

