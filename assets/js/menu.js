/**
 * MOBILE MENU - Matthias Silberhain Website
 * Burger Menu für mobile Navigation
 * Version 2.1 - Defensiv mit Prüfung auf Existenz
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen');
    
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Überprüfe ob Burger und Navigation existieren
    if (!burgerButton || !mainNav) {
        console.warn('Menu.js: Burger Button oder Navigation nicht gefunden. Überprüfen Sie die IDs auf dieser Seite.');
        return;
    }
    
    const navLinks = mainNav.querySelectorAll('a');
    
    // Event Listener für Burger Button
    burgerButton.addEventListener('click', toggleMenu);
    
    // Event Listener für Overlay (schließt Menu)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Event Listener für Navigation Links (schließt Menu nach Klick)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMenu, 100);
        });
    });
    
    // Event Listener für Escape-Taste
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burgerButton.classList.contains('aktiv')) {
            closeMenu();
            burgerButton.focus();
        }
    });
    
    /**
     * Menü umschalten (öffnen/schließen)
     */
    function toggleMenu() {
        const isOpen = burgerButton.classList.contains('aktiv');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    /**
     * Menü öffnen
     */
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
        
        // Accessibility: Setze Fokus auf ersten Navigationslink
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 300);
        
        console.log('Mobile Menu geöffnet');
    }
    
    /**
     * Menü schließen
     */
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
    
    // Accessibility: ARIA Attribute setzen
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-controls', 'mainNav');
    burgerButton.setAttribute('aria-label', 'Hauptmenü öffnen oder schließen');
    
    // Update ARIA Attribut bei Menü-Änderungen
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
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
    
    console.log('✅ Menu.js initialisiert');
});
