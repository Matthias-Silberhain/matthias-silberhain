/**
 * MOBILE MENU - Matthias Silberhain Website
 * Burger Menu für mobile Navigation
 * Version 2.1 - Robust, für alle Seiten
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen');
    
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
    
    // Event Listeners
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
    
    // Menü auf Desktop automatisch schließen
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && burgerButton.classList.contains('aktiv')) {
                closeMenu();
            }
        }, 250);
    });
    
    // ARIA Attribute für Accessibility
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
    
    console.log('✅ Menu.js für alle Seiten initialisiert');
});
/**
 * MOBILE MENU - Matthias Silberhain Website
 * Burger Menu für mobile Navigation
 * Version 2.2 - Mit silbernen Hover-Effekten und verbessertem Design
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
        
        // Silberne Hover-Effekte für Mobile-Links hinzufügen
        navLinks.forEach(link => {
            link.style.transition = 'all 0.3s ease';
            link.style.boxShadow = '0 0 0px rgba(192, 192, 192, 0)';
        });
        
        // Fokus auf ersten Link setzen für Accessibility
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 300);
        
        console.log('Mobile Menu geöffnet - Silbernes Design');
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
                // Entferne alte Event Listener zuerst (falls vorhanden)
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
                
                // Füge neue Event Listener hinzu
                link.addEventListener('mouseenter', handleMouseEnter);
                link.addEventListener('mouseleave', handleMouseLeave);
            });
        }
    }
    
    function handleMouseEnter() {
        if (!this.classList.contains('active')) {
            // Silberner Hover-Effekt
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 
                '0 5px 15px rgba(192, 192, 192, 0.3), ' +
                'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            this.style.background = 'linear-gradient(45deg, rgba(192, 192, 192, 0.1), rgba(192, 192, 192, 0.05))';
            this.style.textShadow = '0 0 10px rgba(192, 192, 192, 0.6)';
            this.style.borderColor = 'rgba(192, 192, 192, 0.4)';
        }
    }
    
    function handleMouseLeave() {
        if (!this.classList.contains('active')) {
            // Zurück zum normalen Zustand
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.background = '';
            this.style.textShadow = '';
            this.style.borderColor = '';
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
            addSilverHoverEffects();
            
            // Auf Mobile: Entferne Hover-Effekte
            if (window.innerWidth <= 768) {
                navLinks.forEach(link => {
                    link.removeEventListener('mouseenter', handleMouseEnter);
                    link.removeEventListener('mouseleave', handleMouseLeave);
                    link.style.transform = '';
                    link.style.boxShadow = '';
                    link.style.background = '';
                    link.style.textShadow = '';
                    link.style.borderColor = '';
                });
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
