// ============================================================================
// MODULE: Matthias Silberhain – Main JavaScript
// ============================================================================

/**
 * Configuration object for the application
 */
const CONFIG = {
  preloader: {
    text: 'MATTHIAS SILBERHAIN',
    typingSpeed: 80,
    delayAfterTyping: 400,
    minDisplayTime: 1500 // Minimum time preloader stays visible
  },
  breakpoints: {
    tablet: 768,
    desktop: 1024
  },
  selectors: {
    preloader: '#preloader',
    typeText: '#type-text',
    burger: '#burger',
    navigation: '#navigation',
    year: '#jahr',
    body: 'body',
    skipLink: '.skip-link',
    navLinks: '.nav-link'
  },
  classes: {
    active: 'aktiv',
    fadeOut: 'fade-out',
    navOpen: 'nav-open',
    jsEnabled: 'js-enabled',
    noJs: 'no-js'
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to ensure a function is only called at most once per specified period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Safe element selector with null checking
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} Selected element or null
 */
const $ = selector => document.querySelector(selector);

/**
 * Safe element selector all with null checking
 * @param {string} selector - CSS selector
 * @returns {NodeList} Selected elements
 */
const $$ = selector => document.querySelectorAll(selector);

// ============================================================================
// CORE MODULES
// ============================================================================

/**
 * Preloader module with typewriter effect
 */
class Preloader {
  constructor(config) {
    this.config = config;
    this.preloaderElement = $(config.selectors.preloader);
    this.typeTextElement = $(config.selectors.typeText);
    this.startTime = Date.now();
  }

  /**
   * Typewriter animation
   */
  typeWriter() {
    return new Promise((resolve) => {
      const { text, typingSpeed } = this.config;
      let i = 0;
      
      const type = () => {
        if (i < text.length) {
          // Use textContent for better performance than innerHTML
          this.typeTextElement.textContent += text.charAt(i);
          i++;
          setTimeout(type, typingSpeed);
        } else {
          resolve();
        }
      };
      
      type();
    });
  }

  /**
   * Ensure minimum display time
   */
  ensureMinimumTime() {
    const elapsed = Date.now() - this.startTime;
    const remaining = this.config.minDisplayTime - elapsed;
    
    if (remaining > 0) {
      return new Promise(resolve => setTimeout(resolve, remaining));
    }
    return Promise.resolve();
  }

  /**
   * Hide preloader with fade-out animation
   */
  hidePreloader() {
    return new Promise((resolve) => {
      this.preloaderElement.classList.add(this.config.classes.fadeOut);
      
      // Wait for CSS transition to complete
      setTimeout(() => {
        this.preloaderElement.style.display = 'none';
        document.body.style.overflow = 'visible'; // Restore scrolling
        resolve();
      }, parseFloat(getComputedStyle(this.preloaderElement).transitionDuration) * 1000 || 500);
    });
  }

  /**
   * Initialize preloader
   */
  async init() {
    if (!this.preloaderElement || !this.typeTextElement) {
      console.warn('Preloader elements not found');
      document.body.style.overflow = 'visible';
      return;
    }

    try {
      // Clear any existing text
      this.typeTextElement.textContent = '';
      
      // Start typewriter effect
      await this.typeWriter();
      
      // Ensure minimum display time
      await this.ensureMinimumTime();
      
      // Hide preloader with animation
      await this.hidePreloader();
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('preloader:hidden'));
    } catch (error) {
      console.error('Preloader error:', error);
      // Fallback: hide preloader immediately
      this.preloaderElement.style.display = 'none';
      document.body.style.overflow = 'visible';
    }
  }
}

/**
 * Navigation module for burger menu
 */
class Navigation {
  constructor(config) {
    this.config = config;
    this.burgerButton = $(config.selectors.burger);
    this.navigationElement = $(config.selectors.navigation);
    this.navLinks = $$(config.selectors.navLinks);
    this.body = $(config.selectors.body);
    this.isOpen = false;
    
    // Bind methods
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 100);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  /**
   * Toggle navigation menu
   */
  toggle() {
    this.isOpen = !this.isOpen;
    
    // Update UI state
    this.burgerButton.setAttribute('aria-expanded', this.isOpen);
    this.navigationElement.classList.toggle(this.config.classes.active);
    this.body.classList.toggle(this.config.classes.navOpen);
    
    // Trap focus when menu is open
    if (this.isOpen) {
      this.trapFocus();
      document.addEventListener('keydown', this.handleKeydown);
    } else {
      document.removeEventListener('keydown', this.handleKeydown);
      this.burgerButton.focus();
    }
  }

  /**
   * Close navigation menu
   */
  close() {
    this.isOpen = false;
    this.burgerButton.setAttribute('aria-expanded', 'false');
    this.navigationElement.classList.remove(this.config.classes.active);
    this.body.classList.remove(this.config.classes.navOpen);
    document.removeEventListener('keydown', this.handleKeydown);
  }

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
    
    if (event.key === 'Tab' && this.isOpen) {
      this.handleTabKey(event);
    }
  }

  /**
   * Handle tab key for focus trapping
   * @param {KeyboardEvent} event
   */
  handleTabKey(event) {
    const focusableElements = this.navigationElement.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Trap focus within navigation when open
   */
  trapFocus() {
    // Focus first focusable element in nav
    const firstFocusable = this.navigationElement.querySelector(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    if (window.innerWidth >= this.config.breakpoints.tablet && this.isOpen) {
      this.close();
    }
  }

  /**
   * Handle navigation link clicks
   */
  handleLinkClick(event) {
    // Close mobile menu when clicking a link (except if it's an anchor link on the same page)
    const href = event.currentTarget.getAttribute('href');
    if (href && !href.startsWith('#') && window.innerWidth < this.config.breakpoints.tablet) {
      this.close();
    }
  }

  /**
   * Initialize navigation
   */
  init() {
    if (!this.burgerButton || !this.navigationElement) {
      console.warn('Navigation elements not found');
      return;
    }

    // Add click event to burger button
    this.burgerButton.addEventListener('click', this.toggle);
    
    // Add click events to nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (this.isOpen && 
          !this.navigationElement.contains(event.target) && 
          !this.burgerButton.contains(event.target)) {
        this.close();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('navigation:ready'));
  }
}

/**
 * Footer module
 */
class Footer {
  constructor(config) {
    this.config = config;
    this.yearElement = $(config.selectors.year);
  }

  /**
   * Update copyright year
   */
  updateYear() {
    if (this.yearElement) {
      this.yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Initialize footer
   */
  init() {
    this.updateYear();
    window.dispatchEvent(new CustomEvent('footer:ready'));
  }
}

/**
 * Smooth scrolling for anchor links
 */
class SmoothScroll {
  constructor() {
    this.scrollSpeed = 800;
    this.scrollOffset = 80; // Offset for fixed header
    
    // Throttle scroll events
    this.handleAnchorClick = throttle(this.handleAnchorClick.bind(this), 1000);
  }

  /**
   * Smooth scroll to element
   * @param {string} target - CSS selector or ID
   */
  scrollTo(target) {
    const element = $(target);
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - this.scrollOffset;
    const duration = this.scrollSpeed;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }

  /**
   * Handle anchor link clicks
   * @param {Event} event
   */
  handleAnchorClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    // Only process internal anchor links
    if (href && href.startsWith('#') && href.length > 1) {
      event.preventDefault();
      this.scrollTo(href);
      
      // Update URL without page jump
      history.pushState(null, null, href);
    }
  }

  /**
   * Initialize smooth scrolling
   */
  init() {
    // Add smooth scrolling to all anchor links
    document.addEventListener('click', (event) => {
      if (event.target.matches('a[href^="#"]') && 
          event.target.getAttribute('href').length > 1) {
        this.handleAnchorClick(event);
      }
    });
  }
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

/**
 * Main application class
 */
class App {
  constructor() {
    this.config = CONFIG;
    this.modules = {
      preloader: null,
      navigation: null,
      footer: null,
      smoothScroll: null
    };
    
    // Initialize modules
    this.initModules();
  }

  /**
   * Initialize all modules
   */
  initModules() {
    // Remove no-js class
    document.body.classList.remove(this.config.classes.noJs);
    document.body.classList.add(this.config.classes.jsEnabled);
    
    // Initialize modules
    this.modules.preloader = new Preloader(this.config);
    this.modules.navigation = new Navigation(this.config);
    this.modules.footer = new Footer(this.config);
    this.modules.smoothScroll = new SmoothScroll();
    
    // Start preloader immediately
    this.modules.preloader.init();
    
    // Initialize other modules after preloader
    window.addEventListener('preloader:hidden', () => {
      this.modules.navigation.init();
      this.modules.footer.init();
      this.modules.smoothScroll.init();
      this.initObservers();
    }, { once: true });
    
    // Fallback: if preloader event doesn't fire, initialize after 3 seconds
    setTimeout(() => {
      if (!this.modules.navigation?.initialized) {
        this.modules.navigation?.init();
        this.modules.footer?.init();
        this.modules.smoothScroll?.init();
        this.initObservers();
      }
    }, 3000);
  }

  /**
   * Initialize Intersection Observers for lazy loading
   */
  initObservers() {
    // Lazy load images
    const lazyImages = $$('img[data-src]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Here you could send errors to analytics service
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// ============================================================================
// APP START
// ============================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize application
  window.app = new App();
  
  // Dispatch ready event
  window.dispatchEvent(new CustomEvent('app:ready'));
});

// ============================================================================
// SERVICE WORKER REGISTRATION (Optional)
// ============================================================================

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(error => {
      console.log('ServiceWorker registration failed:', error);
    });
  });
}
