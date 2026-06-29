// Immediate execution to prevent flash of theme and layout direction
(function () {
  // Theme sync
  const savedTheme = localStorage.getItem('consultant-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // RTL sync
  const savedDir = localStorage.getItem('consultant-dir');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
})();

// Bind action buttons on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Dynamically wrap and clone controls for mobile responsiveness
  const headerToggles = document.querySelectorAll('.site-header .theme-toggle, .site-header .nav-cta-btn');
  if (headerToggles.length > 0) {
    const parentContainer = headerToggles[0].parentElement;
    
    // Create desktop wrapper
    const desktopContainer = document.createElement('div');
    desktopContainer.className = 'header-controls-desktop';
    
    // Move header theme/RTL buttons into the desktop wrapper
    headerToggles.forEach(toggle => {
      desktopContainer.appendChild(toggle);
    });
    
    // Insert desktop wrapper before the mobile menu burger button
    const burgerToggle = parentContainer.querySelector('.mobile-menu-toggle');
    if (burgerToggle) {
      parentContainer.insertBefore(desktopContainer, burgerToggle);
    } else {
      parentContainer.appendChild(desktopContainer);
    }
    
    // Create mobile wrapper inside .nav-menu-wrapper (drawer)
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
    if (navMenuWrapper) {
      const mobileContainer = document.createElement('div');
      mobileContainer.className = 'mobile-menu-controls';
      
      headerToggles.forEach(toggle => {
        const cloned = toggle.cloneNode(true);
        mobileContainer.appendChild(cloned);
      });
      
      navMenuWrapper.appendChild(mobileContainer);
    }
  }

  // Theme Toggles (now selects both desktop and mobile clones)
  const themeToggles = document.querySelectorAll('.theme-toggle:not(.rtl-toggle)');
  
  const updateToggleUI = (isDark) => {
    themeToggles.forEach(toggle => {
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      const sunIcon = toggle.querySelector('.sun-icon');
      const moonIcon = toggle.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'block' : 'none';
        moonIcon.style.display = isDark ? 'none' : 'block';
      }
    });
  };

  const isDark = document.documentElement.classList.contains('dark');
  updateToggleUI(isDark);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('consultant-theme', currentDark ? 'dark' : 'light');
      updateToggleUI(currentDark);
    });
  });

  // RTL Toggles
  const rtlToggles = document.querySelectorAll('.rtl-toggle');

  const updateRtlUI = (isRtl) => {
    rtlToggles.forEach(toggle => {
      toggle.textContent = isRtl ? 'LTR' : 'RTL';
      toggle.setAttribute('aria-label', isRtl ? 'Switch to LTR layout' : 'Switch to RTL layout');
    });
  };

  const isRtlInitial = document.documentElement.getAttribute('dir') === 'rtl';
  updateRtlUI(isRtlInitial);

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const newRtl = !currentRtl;
      document.documentElement.setAttribute('dir', newRtl ? 'rtl' : 'ltr');
      localStorage.setItem('consultant-dir', newRtl ? 'rtl' : 'ltr');
      updateRtlUI(newRtl);
    });
  });
});