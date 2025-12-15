// ==========================================================================
// Matthias Silberhain - Haupt JavaScript Datei
// ==========================================================================

// ==========================================================================
// KONFIGURATION
// ==========================================================================
const CONFIG = {
    preloader: {
        typingSpeed: 100, // Geschwindigkeit der Typewriter Animation in ms
        fadeOutDelay: 500, // Verzögerung bevor Preloader verschwindet
        minDisplayTime: 2000 // Minimale Anzeigezeit des Preloaders
    },
    navigation: {
        mobileBreakpoint: 1024, // Breakpoint für Mobile Navigation
        closeOnClickOutside: true, // Menü schließen bei Klick außerhalb
        closeOnEsc: true, // Menü schließen mit ESC Taste
        autoCloseOnResize: true // Automatisch schließen bei Resize zu Desktop
    }
};

// ==========================================================================
// GLOBALE VARIABLEN
// ==========================================================================
let preloaderStartTime = null;
let isNavigationOpen = false;

// ==========================================================================
// DOM ELEMENTE CACHE
// ==========================================================================
const DOM = {
    // Preloader
    preloader: document.getElementById('preloader'),
    typewriterText: document.querySelector('.typewriter-text'),
    typewriterCursor: document.querySelector('.typewriter-cursor'),
    
    // Navigation
    burgerMenu: document.getElementById('burgerMenu'),
    mainNavigation: document.getElementById('mainNavigation'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Footer
    currentYear: document.getElementById('currentYear'),
    
    // Content
    mainContent: document.getElementById('mainContent'),
    
    // Body
    body: document.body
};

// ==========================================================================
// HELPER FUNKTIONEN
// ==========================================================================

/**
 * Debounce Funktion um häufige Events zu begrenzen
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Prüft ob ein Element im Viewport ist
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Fügt eine Klasse hinzu, wenn sie nicht existiert
 */
function addClass(element, className) {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}

/**
 * Entfernt eine Klasse, wenn sie existiert
 */
function removeClass(element, className) {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

/**
 * Toggle eine Klasse
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

// ==========================================================================
// PRELOADER FUNKTIONALITÄT
// ==========================================================================

/**
 * Typewriter Animation für den Preloader
 */
function initTypewriterAnimation() {
    if (!DOM.typewriterText || !DOM.preloader) {
        console.warn('Typewriter Elemente nicht gefunden');
        hidePreloader();
        return;
    }

    const text = 'MATTHIAS SILBERHAIN';
    let index = 0;
    
    // Startzeit speichern
    preloaderStartTime = Date.now();
    
    // Text zurücksetzen
    DOM.typewriterText.textContent = '';
    
    function typeCharacter() {
        if (index < text.length) {
            DOM.typewriterText.textContent += text.charAt(index);
            index++;
            
            // Nächstes Zeichen nach kurzer Verzögerung
            setTimeout(typeCharacter, CONFIG.preloader.typingSpeed);
        } else {
            // Animation abgeschlossen
            onTypewriterComplete();
        }
    }
    
    // Animation starten
    setTimeout(typeCharacter, 300);
}

/**
 * Wird aufgerufen wenn Typewriter Animation abgeschlossen ist
 */
function onTypewriterComplete() {
    // Minimale Anzeigezeit sicherstellen
    const elapsed = Date.now() - preloaderStartTime;
    const remaining = CONFIG.preloader.minDisplayTime - elapsed;
    
    if (remaining > 0) {
        setTimeout(hidePreloader, remaining);
    } else {
        hidePreloader();
    }
}

/**
 * Preloader ausblenden mit Fade-Out Effekt
 */
function hidePreloader() {
    if (!DOM.preloader) return;
    
    // Fade-Out Klasse hinzufügen
    addClass(DOM.preloader, 'fade-out');
    
    // Nach CSS Transition Preloader komplett ausblenden
    setTimeout(() => {
        DOM.preloader.style.display = 'none';
        DOM.body.style.overflow = 'auto';
        
        // Event auslösen
        window.dispatchEvent(new CustomEvent('preloader:hidden'));
    }, CONFIG.preloader.fadeOutDelay);
}

// ==========================================================================
// NAVIGATION FUNKTIONALITÄT
// ==========================================================================

/**
 * Burger Menu Toggle Funktion
 */
function toggleNavigation() {
    if (!DOM.burgerMenu || !DOM.mainNavigation) return;
    
    isNavigationOpen = !isNavigationOpen;
    
    // Burger Menu Animation
    toggleClass(DOM.burgerMenu, 'active');
    
    // Navigation anzeigen/ausblenden
    toggleClass(DOM.mainNavigation, 'active');
    
    // Body Scroll verhindern/erlauben
    DOM.body.style.overflow = isNavigationOpen ? 'hidden' : 'auto';
    
    // ARIA Attribute aktualisieren
    DOM.burgerMenu.setAttribute('aria-expanded', isNavigationOpen);
    
    // Event auslösen
    const eventName = isNavigationOpen ? 'navigation:opened' : 'navigation:closed';
    window.dispatchEvent(new CustomEvent(eventName));
}

/**
 * Navigation schließen
 */
function closeNavigation() {
    if (!isNavigationOpen) return;
    
    isNavigationOpen = false;
    removeClass(DOM.burgerMenu, 'active');
    removeClass(DOM.mainNavigation, 'active');
    DOM.body.style.overflow = 'auto';
    DOM.burgerMenu.setAttribute('aria-expanded', 'false');
    
    window.dispatchEvent(new CustomEvent('navigation:closed'));
}

/**
 * Navigation Event Listener einrichten
 */
function initNavigation() {
    if (!DOM.burgerMenu || !DOM.mainNavigation) {
        console.warn('Navigation Elemente nicht gefunden');
        return;
    }
    
    // Burger Menu Click Event
    DOM.burgerMenu.addEventListener('click', toggleNavigation);
    
    // Navigation Links schließen Menu auf Mobile
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= CONFIG.navigation.mobileBreakpoint) {
                closeNavigation();
            }
            
            // Aktiven Link setzen
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Schließen bei Klick außerhalb
    if (CONFIG.navigation.closeOnClickOutside) {
        document.addEventListener('click', (e) => {
            if (isNavigationOpen && 
                !DOM.mainNavigation.contains(e.target) && 
                !DOM.burgerMenu.contains(e.target)) {
                closeNavigation();
            }
        });
    }
    
    // Schließen mit ESC Taste
    if (CONFIG.navigation.closeOnEsc) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isNavigationOpen) {
                closeNavigation();
            }
        });
    }
    
    // Automatisch schließen bei Resize zu Desktop
    if (CONFIG.navigation.autoCloseOnResize) {
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > CONFIG.navigation.mobileBreakpoint && isNavigationOpen) {
                closeNavigation();
            }
        }, 150));
    }
}

// ==========================================================================
// FOOTER FUNKTIONALITÄT
// ==========================================================================

/**
 * Aktuelles Jahr im Footer setzen
 */
function initFooterYear() {
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }
}

// ==========================================================================
// SMOOTH SCROLL FUNKTIONALITÄT
// ==========================================================================

/**
 * Smooth Scroll zu Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Nur interne Anchor Links verarbeiten
            if (href === '#' || href.length <= 1) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight - 20,
                behavior: 'smooth'
            });
            
            // URL ohne Seitenwechsel aktualisieren
            history.pushState(null, null, href);
        });
    });
}

// ==========================================================================
 SILBER HOVER EFFECTS
// ==========================================================================

/**
 * Silberne Hover Effects für Links und interaktive Elemente
 */
function initSilverEffects() {
    // Alle Links
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--silber-bright)';
            this.style.textShadow = '0 0 15px var(--silber-glow)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
                this.style.textShadow = '';
            }
        });
    });
    
    // Cards mit Glow Effect
    const cards = document.querySelectorAll('.highlight-card, .work-item, .philosophy-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px var(--silber-glow)';
            this.style.borderColor = 'var(--silber-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
    
    // Buttons (außer Burger Menu)
    const buttons = document.querySelectorAll('button:not(.burger-menu)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px var(--silber-glow)';
            this.style.borderColor = 'var(--silber-primary)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
}

// ==========================================================================
// RESPONSIVE IMAGE HANDLING
// ==========================================================================

/**
 * Responsive Image Handling
 */
function initResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Max Width für responsive Bilder setzen
        if (!img.classList.contains('preloader-logo') && 
            !img.classList.contains('header-logo')) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
        
        // Lazy Loading für Bilder mit data-src
        if (img.dataset.src) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// ==========================================================================
// PERFORMANCE OPTIMIERUNGEN
// ==========================================================================

/**
 * Performance Optimierungen für Scroll Events
 */
function initPerformanceOptimizations() {
    // Passive Scroll Events für bessere Performance
    const supportsPassive = (() => {
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener('test', null, opts);
        } catch (e) {}
        return supportsPassive;
    })();
    
    const eventOptions = supportsPassive ? { passive: true } : false;
    
    // Optimiertes Scroll Handling
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', debounce(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header bei Scroll nach unten ausblenden, nach oben einblenden
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 100), eventOptions);
    }
}

// ==========================================================================
// FONT LOADING OPTIMIERUNG
// ==========================================================================

/**
 * Font Loading Optimierung
 */
function initFontLoading() {
    // Font Loading Status überwachen
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    } else {
        // Fallback für ältere Browser
        setTimeout(() => {
            document.body.classList.add('fonts-loaded');
        }, 1000);
    }
}

// ==========================================================================
// ERROR HANDLING
// ==========================================================================

/**
 * Globale Error Handler
 */
function initErrorHandling() {
    // Globaler Error Handler
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        // Hier könnte man Fehler an Analytics senden
    });
    
    // Unhandled Promise Rejection Handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
    });
}

// ==========================================================================
// INITIALISIERUNG
// ==========================================================================

/**
 * Haupt Initialisierungsfunktion
 */
function init() {
    console.log('Matthias Silberhain Website initialisiert');
    
    // Font Loading
    initFontLoading();
    
    // Preloader starten
    initTypewriterAnimation();
    
    // Navigation initialisieren
    initNavigation();
    
    // Footer initialisieren
    initFooterYear();
    
    // Smooth Scroll initialisieren
    initSmoothScroll();
    
    // Silber Effects initialisieren
    initSilverEffects();
    
    // Responsive Images
    initResponsiveImages();
    
    // Performance Optimierungen
    initPerformanceOptimizations();
    
    // Error Handling
    initErrorHandling();
    
    // Event Listener für Resize
    window.addEventListener('resize', debounce(() => {
        initResponsiveImages();
    }, 250));
    
    // Event: Preloader versteckt
    window.addEventListener('preloader:hidden', () => {
        console.log('Preloader versteckt - Hauptinhalt sichtbar');
    });
    
    // Event: Navigation geöffnet
    window.addEventListener('navigation:opened', () => {
        console.log('Navigation geöffnet');
    });
    
    // Event: Navigation geschlossen
    window.addEventListener('navigation:closed', () => {
        console.log('Navigation geschlossen');
    });
}

// ==========================================================================
// DOM READY EVENT
// ==========================================================================

/**
 * Warten bis DOM vollständig geladen ist
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==========================================================================
// WINDOW LOAD EVENT
// ==========================================================================

/**
 * Zusätzliche Initialisierung nach vollständigem Laden
 */
window.addEventListener('load', () => {
    // Lazy Loading für weitere Ressourcen
    console.log('Seite vollständig geladen');
    
    // Service Worker Registrierung (optional)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        navigator.serviceWorker.register('/service-worker.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    }
});

// ==========================================================================
// GLOBALE FUNKTIONEN FÜR EXTERNE NUTZUNG
// ==========================================================================

/**
 * Globale API für externe Nutzung
 */
window.MSApp = {
    // Navigation steuern
    openNavigation: () => {
        if (!isNavigationOpen) toggleNavigation();
    },
    closeNavigation: () => closeNavigation(),
    toggleNavigation: () => toggleNavigation(),
    
    // Preloader steuern
    hidePreloader: () => hidePreloader(),
    
    // Aktuellen Status abfragen
    getStatus: () => ({
        isNavigationOpen,
        preloaderVisible: DOM.preloader ? DOM.preloader.style.display !== 'none' : false,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    }),
    
    // Zurück zum Anfang scrollen
    scrollToTop: () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    // Zu Abschnitt scrollen
    scrollToSection: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight || 0;
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    }
};

// ==========================================================================
// EXPORT FÜR MODULE (falls benötigt)
// ==========================================================================

// CommonJS Export (für Node.js/Webpack)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        DOM,
        init,
        MSApp: window.MSApp
    };
}
