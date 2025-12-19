// ============================================================================
// MODERNES MENU & UTILITIES
// ============================================================================

(function() {
    'use strict';
    
    console.log('🚀 Modern Menu & Utilities initialisiert');
    
    // Konfiguration
    const CONFIG = {
        preloadDuration: 1500,
        animationSpeed: 300,
        localStorageKey: 'ms-theme'
    };
    
    // ============================================================================
    // MODULE: DARK MODE MANAGER
    // ============================================================================
    const DarkMode = {
        init() {
            this.toggleBtn = document.getElementById('darkModeToggle');
            if (!this.toggleBtn) return;
            
            this.applySavedTheme();
            this.bindEvents();
            console.log('🌓 Dark Mode Manager aktiv');
        },
        
        applySavedTheme() {
            const savedTheme = localStorage.getItem(CONFIG.localStorageKey);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                this.enableDarkMode();
            }
        },
        
        enableDarkMode() {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem(CONFIG.localStorageKey, 'dark');
        },
        
        disableDarkMode() {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem(CONFIG.localStorageKey, 'light');
        },
        
        toggle() {
            if (document.body.classList.contains('dark-mode')) {
                this.disableDarkMode();
            } else {
                this.enableDarkMode();
            }
        },
        
        bindEvents() {
            this.toggleBtn.addEventListener('click', () => this.toggle());
            
            // Media Query Listener für System-Änderungen
            window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
                if (!localStorage.getItem(CONFIG.localStorageKey)) {
                    if (e.matches) {
                        this.enableDarkMode();
                    } else {
                        this.disableDarkMode();
                    }
                }
            });
        }
    };
    
    // ============================================================================
    // MODULE: PRELOADER MANAGER
    // ============================================================================
    const Preloader = {
        init() {
            this.preloader = document.getElementById('preloader');
            this.typeText = document.getElementById('type-text');
            
            if (!this.preloader || !this.typeText) {
                console.warn('Preloader Elemente nicht gefunden');
                return;
            }
            
            this.text = 'MATTHIAS SILBERHAIN';
            this.typeSpeed = 90;
            this.minDisplayTime = CONFIG.preloadDuration;
            this.startTime = Date.now();
            
            this.startTyping();
            console.log('⌨️ Preloader aktiv');
        },
        
        startTyping() {
            let index = 0;
            
            const typeNextChar = () => {
                if (index < this.text.length) {
                    this.typeText.textContent += this.text.charAt(index);
                    index++;
                    setTimeout(typeNextChar, this.typeSpeed);
                } else {
                    this.hideCursor();
                    this.scheduleHide();
                }
            };
            
            setTimeout(() => typeNextChar(), 300);
        },
        
        hideCursor() {
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
            }
        },
        
        scheduleHide() {
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.minDisplayTime - elapsed);
            
            setTimeout(() => {
                this.hide();
            }, remaining);
        },
        
        hide() {
            this.preloader.classList.add('hidden');
            
            setTimeout(() => {
                this.preloader.style.display = 'none';
                console.log('✅ Preloader ausgeblendet');
                this.dispatchLoadedEvent();
            }, 600);
        },
        
        dispatchLoadedEvent() {
            document.dispatchEvent(new CustomEvent('preloaderComplete'));
        }
    };
    
    // ============================================================================
    // MODULE: MOBILE MENU MANAGER
    // ============================================================================
    const MobileMenu = {
        init() {
            this.burger = document.getElementById('burger');
            this.nav = document.getElementById('navigation');
            this.overlay = document.getElementById('menuOverlay');
            
            if (!this.burger || !this.nav) {
                console.warn('Menu Elemente nicht gefunden');
                return;
            }
            
            this.isOpen = false;
            this.bindEvents();
            this.enhanceAccessibility();
            console.log('📱 Mobile Menu aktiv');
        },
        
        bindEvents() {
            // Burger Click
            this.burger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });
            
            // Overlay Click
            if (this.overlay) {
                this.overlay.addEventListener('click', () => {
                    if (this.isOpen) this.close();
                });
            }
            
            // Navigation Links
            this.nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isOpen) this.close();
                });
            });
            
            // ESC Key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) this.close();
            });
            
            // Click Outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.nav.contains(e.target) && e.target !== this.burger) {
                    this.close();
                }
            });
            
            // Resize Listener
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && this.isOpen) {
                    this.close();
                }
            });
        },
        
        open() {
            this.nav.classList.add('aktiv');
            this.burger.classList.add('aktiv');
            if (this.overlay) this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
            console.log('✅ Menu geöffnet');
        },
        
        close() {
            this.nav.classList.remove('aktiv');
            this.burger.classList.remove('aktiv');
            if (this.overlay) this.overlay.classList.remove('active');
            document.body.style.overflow = '';
            this.isOpen = false;
            console.log('✅ Menu geschlossen');
        },
        
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        },
        
        enhanceAccessibility() {
            this.burger.setAttribute('aria-label', 'Navigation ein- oder ausblenden');
            this.burger.setAttribute('aria-expanded', 'false');
            this.burger.setAttribute('aria-controls', 'navigation');
            
            this.nav.setAttribute('aria-hidden', 'true');
        },
        
        updateAccessibility() {
            this.burger.setAttribute('aria-expanded', this.isOpen.toString());
            this.nav.setAttribute('aria-hidden', (!this.isOpen).toString());
        }
    };
    
    // ============================================================================
    // MODULE: UTILITY FUNCTIONS
    // ============================================================================
    const Utilities = {
        init() {
            this.updateFooterYear();
            this.ensureClickability();
            console.log('🔧 Utilities aktiv');
        },
        
        updateFooterYear() {
            const yearElement = document.getElementById('jahr');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        },
        
        ensureClickability() {
            const interactiveSelectors = [
                'button', 'a', '.burger', '.dark-mode-toggle',
                '.silber-button', '.social-link', '.seriöser-button'
            ];
            
            interactiveSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    el.style.pointerEvents = 'auto';
                    el.style.cursor = 'pointer';
                });
            });
        },
        
        smoothScrollTo(target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };
    
    // ============================================================================
    // MODULE: PERFORMANCE OPTIMIERUNGEN
    // ============================================================================
    const Performance = {
        init() {
            this.debounceScroll();
            this.preventMultipleClicks();
            this.lazyLoadImages();
            console.log('⚡ Performance Optimierungen aktiv');
        },
        
        debounceScroll() {
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        this.handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        },
        
        handleScroll() {
            // Kann für Parallax oder Sticky Header erweitert werden
        },
        
        preventMultipleClicks() {
            document.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains('silber-button') || 
                    target.classList.contains('seriöser-button')) {
                    target.style.pointerEvents = 'none';
                    setTimeout(() => {
                        target.style.pointerEvents = 'auto';
                    }, 1000);
                }
            });
        },
        
        lazyLoadImages() {
            if ('IntersectionObserver' in window) {
                const lazyImages = document.querySelectorAll('img[data-src]');
                
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => imageObserver.observe(img));
            }
        }
    };
    
    // ============================================================================
    // MODULE: ERROR HANDLING
    // ============================================================================
    const ErrorHandler = {
        init() {
            window.addEventListener('error', this.handleError.bind(this));
            window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
            console.log('🚨 Error Handler aktiv');
        },
        
        handleError(event) {
            console.error('❌ JavaScript Fehler:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
            return true; // Verhindert Standard-Fehleranzeige
        },
        
        handlePromiseRejection(event) {
            console.error('❌ Unbehandelte Promise Ablehnung:', event.reason);
        }
    };
    
    // ============================================================================
    // HAUPTAUSFÜHRUNG
    // ============================================================================
    function initializeApp() {
        try {
            // Reihenfolge der Initialisierung
            DarkMode.init();
            Utilities.init();
            MobileMenu.init();
            Performance.init();
            ErrorHandler.init();
            
            // Preloader zuletzt (kann im Hintergrund laufen)
            setTimeout(() => Preloader.init(), 100);
            
            console.log('✅ Alle Module erfolgreich initialisiert');
            
            // Custom Event für abhängige Skripte
            document.dispatchEvent(new CustomEvent('appInitialized'));
            
        } catch (error) {
            console.error('❌ Fehler bei der Initialisierung:', error);
            // Stelle sicher, dass Preloader auf jeden Fall verschwindet
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }
        }
    }
    
    // Starte Initialisierung basierend auf DOM-Status
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeApp, 50);
        });
    } else {
        setTimeout(initializeApp, 100);
    }
    
    // ============================================================================
    // GLOBALE EXPORTE (für externe Nutzung)
    // ============================================================================
    window.SilberhainApp = {
        toggleMenu: () => MobileMenu.toggle(),
        toggleDarkMode: () => DarkMode.toggle(),
        scrollTo: (target) => Utilities.smoothScrollTo(target),
        getVersion: () => '1.0.0'
    };
    
})();
