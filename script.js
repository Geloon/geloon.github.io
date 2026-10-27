/* ===================================================================
   PABLO CÁNOVAS - LANDING PAGE & CV INTERACTIVITY
   Features: Dark/Light Mode, Mobile Nav, Timeline Tabs, Filter, Form
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- 1. THEME SWITCHER (DARK / LIGHT) ----------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ---------- 2. NAVBAR SCROLL EFFECT & SPY ----------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll Spy: highlight active nav link
    const scrollY = window.pageYOffset;
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
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- 3. MOBILE MENU TOGGLE ----------
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });

  // ---------- 4. TIMELINE TABS (EXPERIENCE / EDUCATION) ----------
  const timelineTabs = document.querySelectorAll('.timeline-tab');
  const tabContainers = {
    experiencia: document.getElementById('tab-experiencia'),
    educacion: document.getElementById('tab-educacion')
  };

  timelineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      if (!targetTab) return;

      timelineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      Object.keys(tabContainers).forEach(key => {
        if (key === targetTab) {
          tabContainers[key]?.classList.add('active');
        } else {
          tabContainers[key]?.classList.remove('active');
        }
      });
    });
  });

  // ---------- 5. PROJECT CATEGORY FILTER ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');
      if (!filterValue) return;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // ---------- 6. CONTACT FORM SUBMISSION ----------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';

    // Create mailto fallback link for seamless message dispatch
    const subject = encodeURIComponent(`Contacto desde Portfolio: ${name}`);
    const body = encodeURIComponent(`Hola Pablo,\n\nSoy ${name} (${email}).\n\nMensaje:\n${message}`);
    
    // Show success message in UI
    if (formStatus) {
      formStatus.textContent = '¡Gracias! Abriendo tu cliente de correo...';
      formStatus.className = 'form-status success';
    }

    setTimeout(() => {
      window.location.href = `mailto:pacadi92@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  });

  // ---------- 7. CURRENT YEAR ----------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
