/**
 * MOBILE MENU - Matthias Silberhain Website
 * Version 2.2 - Mit silbernen Hover-Effekten, korrigiert für Preloader
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen - Silbernes Design');
    
    // Defensive Prüfung aller Elemente
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Warnung wenn Elemente fehlen
    if (!burgerButton) {
        console.warn('Menu.js: Burger Button (id="burgerButton") fehlt auf dieser Seite!');
        return;
    }
    
    if (!mainNav) {
        console.warn('Menu.js: Navigation (id="mainNav") fehlt auf dieser Seite!');
        return;
    }
    
    const navLinks = mainNav.querySelectorAll('a');
    
    // Menü umschalten
    function toggleMenu() {
        const isOpen = burgerButton.classList.contains('aktiv');
        
        // Toggle mit Animation
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    // Menü öffnen
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            setTimeout(() => {
                menuOverlay.style.opacity = '1';
            }, 10);
        }
        
        document.body.classList.add('menu-open');
        
        // Fokus auf ersten Link setzen für Accessibility
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 300);
        
        console.log('Mobile Menu geöffnet');
    }
    
    // Menü schließen
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            menuOverlay.style.opacity = '0';
        }
        
        document.body.classList.remove('menu-open');
        
        console.log('Mobile Menu geschlossen');
    }
    
    // ================= SILBERNE HOVER EFFEKTE FÜR DESKTOP =================
    function addSilverHoverEffects() {
        // Nur auf Desktop (größer als 768px)
        if (window.innerWidth > 768) {
            navLinks.forEach(link => {
                // Entferne alte Event Listener zuerst
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                // Füge neue Event Listener hinzu
                newLink.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('active')) {
                        this.style.transform = 'translateY(-2px)';
                        this.style.boxShadow = 
                            '0 5px 15px rgba(192, 192, 192, 0.3), ' +
                            'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                        this.style.background = 'linear-gradient(45deg, rgba(192, 192, 192, 0.1), rgba(192, 192, 192, 0.05))';
                        this.style.textShadow = '0 0 10px rgba(192, 192, 192, 0.6)';
                    }
                });
                
                newLink.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = 'none';
                        this.style.background = '';
                        this.style.textShadow = '';
                    }
                });
            });
        }
    }
    
    // ================= EVENT LISTENERS =================
    burgerButton.addEventListener('click', toggleMenu);
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü schließen bei Link-Klick (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC Taste zum Schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerButton.classList.contains('aktiv')) {
            closeMenu();
            burgerButton.focus();
        }
    });
    
    // ================= RESPONSIVE HANDLING =================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Menü auf Desktop automatisch schließen
            if (window.innerWidth > 768 && burgerButton.classList.contains('aktiv')) {
                closeMenu();
            }
            
            // Hover-Effekte nur auf Desktop aktivieren
            if (window.innerWidth > 768) {
                addSilverHoverEffects();
            }
        }, 250);
    });
    
    // ================= ACCESSIBILITY =================
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-controls', 'mainNav');
    burgerButton.setAttribute('aria-label', 'Hauptmenü öffnen');
    
    // Update ARIA Attribute bei Zustandsänderung
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isExpanded = burgerButton.classList.contains('aktiv');
                burgerButton.setAttribute('aria-expanded', isExpanded.toString());
                burgerButton.setAttribute('aria-label', 
                    isExpanded ? 'Hauptmenü schließen' : 'Hauptmenü öffnen'
                );
            }
        });
    });
    
    observer.observe(burgerButton, { attributes: true });
    
    // ================= SILBERNE BURGER ANIMATION =================
    burgerButton.addEventListener('mouseenter', function() {
        if (!this.classList.contains('aktiv')) {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 10px rgba(192, 192, 192, 0.5)';
            
            // Burger-Linien silbern färben
            const spans = this.querySelectorAll('span');
            spans.forEach(span => {
                span.style.backgroundColor = 'rgba(192, 192, 192, 0.8)';
                span.style.boxShadow = '0 0 5px rgba(192, 192, 192, 0.6)';
            });
        }
    });
    
    burgerButton.addEventListener('mouseleave', function() {
        if (!this.classList.contains('aktiv')) {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            
            // Burger-Linien zurück zur normalen Farbe
            const spans = this.querySelectorAll('span');
            spans.forEach(span => {
                span.style.backgroundColor = '';
                span.style.boxShadow = '';
            });
        }
    });
    
    // ================= INITIALISIERUNG =================
    // Initialisiere Hover-Effekte basierend auf aktueller Bildschirmgröße
    addSilverHoverEffects();
    
    console.log('✅ Menu.js mit silbernen Hover-Effekten initialisiert');
});
