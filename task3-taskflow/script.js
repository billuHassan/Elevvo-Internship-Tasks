/**
 * Task 3: TaskFlow One-Page Website Interactions
 * Features:
 * - Intersection Observer scroll reveal animation (Bonus)
 * - Monthly vs. Annual pricing plan toggle with real-time recalculation
 * - Mobile responsive navigation menu drawer
 * - Smooth anchor scroll handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations (Bonus)
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // 2. Billing Duration Toggle (Monthly / Annual)
  const billingToggle = document.getElementById('billingToggle');
  const priceValues = document.querySelectorAll('.price-val');
  let isAnnual = false;

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      billingToggle.classList.toggle('active', isAnnual);
      billingToggle.setAttribute('aria-pressed', isAnnual.toString());

      priceValues.forEach((elem) => {
        const monthly = elem.getAttribute('data-monthly');
        const annual = elem.getAttribute('data-annual');
        elem.textContent = isAnnual ? annual : monthly;
      });
    });
  }

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu when clicking navigation link
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
});

