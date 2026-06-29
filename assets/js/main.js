/**
 * Antigravity - Freelance HR & Organizational Development Consultant
 * Main JavaScript File (ThemeForest Ready, Vanilla JS, Zero Console Errors)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initAccordions();
  initTabSystem();
  initProjectInquiryWizard();
  initContactForm();
  initActiveNavigation();
  initScrollToTop();
});

/**
 * Sticky Header Scroll Behavior
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once on load
}

/**
 * Mobile Navigation Menu Toggles
 */
function initMobileMenu() {
  const burger = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu-wrapper');
  const navOverlay = document.querySelector('.nav-overlay');

  if (!burger || !navMenu) return;

  // Create overlay if it doesn't exist
  let overlay = navOverlay;
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const toggleMenu = () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  };

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Close menu when clicking links
  const links = navMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
}

/**
 * Custom Accordion Logic (No Bootstrap JS Dependency)
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.custom-accordion-item');
  if (accordions.length === 0) return;

  accordions.forEach(item => {
    const header = item.querySelector('.custom-accordion-header');

    header.addEventListener('click', () => {
      const parent = item.parentElement;
      const isActive = item.classList.contains('active');

      // Close other accordion items in the same container
      const siblingItems = parent.querySelectorAll('.custom-accordion-item');
      siblingItems.forEach(sibling => {
        sibling.classList.remove('active');
        const body = sibling.querySelector('.custom-accordion-body');
        if (body) body.style.maxHeight = null;
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.custom-accordion-body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });

    // Set initial active state if marked
    if (item.classList.contains('active')) {
      const body = item.querySelector('.custom-accordion-body');
      if (body) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    }
  });
}

/**
 * Custom Tabs System (Used in Services & Portfolios)
 */
function initTabSystem() {
  const tabContainers = document.querySelectorAll('.tab-container');
  if (tabContainers.length === 0) return;

  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePanel = container.querySelector(`.tab-panel[data-panel="${target}"]`);
        if (activePanel) activePanel.classList.add('active');
      });
    });
  });
}

/**
 * Project Inquiry Step Wizard (UI only)
 */
function initProjectInquiryWizard() {
  const wizard = document.getElementById('project-inquiry-wizard');
  if (!wizard) return;

  const steps = wizard.querySelectorAll('.wizard-step');
  const progressLine = wizard.querySelector('.progress-bar-fill');
  const progressStepIndicators = wizard.querySelectorAll('.step-indicator-item');
  const nextBtns = wizard.querySelectorAll('.next-step-btn');
  const prevBtns = wizard.querySelectorAll('.prev-step-btn');
  const form = wizard.querySelector('form');
  const successMessage = wizard.querySelector('.wizard-success-message');

  let currentStep = 0;

  const updateWizard = () => {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update steps visual indicators
    progressStepIndicators.forEach((ind, idx) => {
      if (idx <= currentStep) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });

    // Progress bar fill percentage
    if (progressLine) {
      const percentage = (currentStep / (steps.length - 1)) * 100;
      progressLine.style.width = `${percentage}%`;
    }
  };

  const validateStep = (stepIdx) => {
    const activeStep = steps[stepIdx];
    const requiredInputs = activeStep.querySelectorAll('[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
      // Clear old error messages
      const errorMsg = input.parentNode.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
      input.classList.remove('input-error');

      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('input-error');
        const err = document.createElement('span');
        err.className = 'error-message';
        err.innerText = 'This field is required.';
        input.parentNode.appendChild(err);
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        input.classList.add('input-error');
        const err = document.createElement('span');
        err.className = 'error-message';
        err.innerText = 'Please enter a valid email address.';
        input.parentNode.appendChild(err);
      }
    });

    return isValid;
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          updateWizard();
        }
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateWizard();
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateStep(currentStep)) {
        // Mock submission success transition
        form.style.display = 'none';
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  updateWizard();
}

/**
 * Standard Contact Form validation
 */
function initContactForm() {
  const form = document.getElementById('consultant-contact-form');
  const successAlert = document.getElementById('contact-success-alert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const errorMsg = input.parentNode.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
      input.classList.remove('input-error');

      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('input-error');
        const err = document.createElement('span');
        err.className = 'error-message';
        err.innerText = 'This field is required.';
        input.parentNode.appendChild(err);
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        input.classList.add('input-error');
        const err = document.createElement('span');
        err.className = 'error-message';
        err.innerText = 'Please enter a valid email address.';
        input.parentNode.appendChild(err);
      }
    });

    if (isValid) {
      // Mock submit
      form.reset();
      if (successAlert) {
        successAlert.style.display = 'block';
        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 5000);
      }
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Handle Active Navigation & Dropdown caret insertion
 */
function initActiveNavigation() {
  const path = window.location.pathname;
  let page = path.split("/").pop() || "index.html";

  // Highlight dropdown items based on current page
  const dropdownLinks = document.querySelectorAll('.dropdown-link');
  dropdownLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });

  // Add dropdown indicator symbol (downward chevron) to dropdown parent link
  const dropdownParents = document.querySelectorAll('.nav-item-dropdown > a');
  dropdownParents.forEach(parent => {
    if (!parent.querySelector('.dropdown-caret')) {
      const caret = document.createElement('span');
      caret.className = 'dropdown-caret';
      caret.innerHTML = '&#9662;'; // Downward-facing triangle: ▾
      caret.style.marginLeft = '6px';
      caret.style.fontSize = '0.75rem';
      caret.style.display = 'inline-block';
      caret.style.transition = 'transform 0.3s ease';
      parent.appendChild(caret);
    }
  });
}

/**
 * Dynamic Scroll-to-Top Button Generation & Logic
 */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.className = 'scroll-to-top-btn';
  btn.setAttribute('aria-label', 'Scroll to Top');
  
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.8; stroke-linecap: round; stroke-linejoin: round;">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  `;
  
  document.body.appendChild(btn);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}
