/**
 * MOBILE MENU - Matthias Silberhain Website
 * Version 2.3 - Vollständig optimiert für alle Geräte
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js geladen - Touch-optimiert');
    
    // Defensive Prüfung aller Elemente
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Warnung wenn Elemente fehlen
    if (!burgerButton) {
        console.warn('Menu.js: Burger Button fehlt!');
        return;
    }
    
    if (!mainNav) {
        console.warn('Menu.js: Navigation fehlt!');
        return;
    }
    
    const navLinks = mainNav.querySelectorAll('a');
    
    // ================= MENÜ FUNKTIONEN =================
    function toggleMenu() {
        const isOpen = burgerButton.classList.contains('aktiv');
        
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        document.body.classList.add('menu-open');
        
        // Fokus für Accessibility
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 100);
        
        console.log('📱 Menü geöffnet');
    }
    
    function closeMenu() {
        burgerButton.classList.remove('aktiv');
        mainNav.classList.remove('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        document.body.classList.remove('menu-open');
        
        console.log('📱 Menü geschlossen');
    }
    
    // ================= EVENT LISTENERS =================
    burgerButton.addEventListener('click', toggleMenu);
    burgerButton.addEventListener('touchstart', toggleMenu, { passive: true });
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('touchstart', closeMenu, { passive: true });
    }
    
    // Menü schließen bei Link-Klick (nur mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 50);
            }
        });
        link.addEventListener('touchstart', () => {
            if (window.innerWidth < 768) {
                setTimeout(closeMenu, 50);
            }
        }, { passive: true });
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
            if (window.innerWidth > 768 && burgerButton.classList.contains('aktiv')) {
                closeMenu();
            }
        }, 150);
    });
    
    // ================= ACCESSIBILITY =================
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-controls', 'mainNav');
    burgerButton.setAttribute('aria-label', 'Hauptmenü öffnen');
    
    // Update ARIA Attribute
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
    
    console.log('✅ Menu.js erfolgreich initialisiert');
});
