/* ================================================
   HENDERSON COUNTRY CLUB — SCRIPT
   ================================================ */

const navbarBtn   = document.querySelector('.navbar-btn');
const navbarMobile = document.getElementById('navbar-mobile');
const allNavLinks  = document.querySelectorAll('.nav-link');

// ── Current page highlighting ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

allNavLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

// ── Mobile nav toggle ──
if (navbarBtn && navbarMobile) {
  navbarBtn.addEventListener('click', () => {
    const isOpen = navbarMobile.classList.toggle('active');
    navbarBtn.classList.toggle('active', isOpen);
    navbarBtn.setAttribute('aria-expanded', String(isOpen));

    // Prevent body scroll when nav is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navbarMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbarMobile.classList.remove('active');
      navbarBtn.classList.remove('active');
      navbarBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (
      navbarMobile.classList.contains('active') &&
      !navbarMobile.contains(e.target) &&
      !navbarBtn.contains(e.target)
    ) {
      navbarMobile.classList.remove('active');
      navbarBtn.classList.remove('active');
      navbarBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── Smooth fade-in on scroll (Intersection Observer) ──
const fadeEls = document.querySelectorAll('.welcome-inner, .features-inner, .stat-bar-inner, .address-inner');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}
