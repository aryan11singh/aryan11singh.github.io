// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFilters();
  initCopyEmail();
  initYear();
});

// Theme Toggle (Dark / Light mode)
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    if (sunIcon && moonIcon) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  } else {
    document.documentElement.classList.remove('light');
    if (sunIcon && moonIcon) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle('hidden', !isLight);
      moonIcon.classList.toggle('hidden', isLight);
    }
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

// Mobile Hamburger Menu & Scrollspy
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active section indicator on scroll
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Project Category Filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active filter button
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/25');
        b.classList.add('text-slate-400', 'hover:text-slate-200');
      });

      btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/25');
      btn.classList.remove('text-slate-400', 'hover:text-slate-200');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// Copy Email with Toast Popup
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const email = '111aryansingh2004@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
}

// Dynamic Year in Footer
function initYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
