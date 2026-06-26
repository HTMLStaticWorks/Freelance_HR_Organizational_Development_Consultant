/**
 * Antigravity - Freelance HR & Organizational Development Consultant
 * GSAP Animations configuration
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Animations falling back to CSS.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  initFadeUpReveal();
  initStaggerCardReveal();
  initCounters();
  initTimelineProgress();
});

/**
 * Single Element Fade-Up Scroll Reveal
 */
function initFadeUpReveal() {
  const elements = gsap.utils.toArray('.reveal-fade-up');
  elements.forEach(elem => {
    gsap.from(elem, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/**
 * Staggered Card Grid Reveal
 */
function initStaggerCardReveal() {
  const containers = gsap.utils.toArray('.reveal-stagger-container');
  containers.forEach(container => {
    const items = container.querySelectorAll('.reveal-stagger-item');
    if (items.length === 0) return;

    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/**
 * Animated Numerical Counters for Statistics
 */
function initCounters() {
  const counters = gsap.utils.toArray('.counter-val');
  counters.forEach(counter => {
    const targetValue = parseInt(counter.getAttribute('data-target'), 10) || 0;
    const suffix = counter.getAttribute('data-suffix') || '';
    const counterObj = { value: 0 };

    gsap.to(counterObj, {
      value: targetValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        counter.textContent = Math.floor(counterObj.value).toString() + suffix;
      }
    });
  });
}

/**
 * Service Timeline Path Line Drawer
 */
function initTimelineProgress() {
  const timelineLine = document.querySelector('.timeline-progress-line-fill');
  const container = document.querySelector('.timeline-progress-wrapper');
  
  if (!timelineLine || !container) return;

  gsap.fromTo(timelineLine, 
    { height: '0%' },
    {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true
      }
    }
  );

  // Stagger reveal timeline cards
  const steps = document.querySelectorAll('.timeline-step-item');
  steps.forEach(step => {
    gsap.from(step, {
      opacity: 0,
      x: step.classList.contains('left-align') ? -50 : 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: step,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  });
}
