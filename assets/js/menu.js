/**
 * MOBILE MENU - FÜR ALLE SEITEN
 * Universelle Version für konsistentes Verhalten
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Menu.js - Für alle Seiten geladen');
    
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
        isOpen ? closeMenu() : openMenu();
    }
    
    // Menü öffnen
    function openMenu() {
        burgerButton.classList.add('aktiv');
        mainNav.classList.add('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            setTimeout(() => menuOverlay.style.opacity = '1', 10);
        }
        
        document.body.classList.add('menu-open');
        
        // Fokus auf ersten Link setzen
        setTimeout(() => {
            if (navLinks.length > 0) {
                navLinks[0].focus();
            }
        }, 300);
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
    }
    
    // Event Listeners
    burgerButton.addEventListener('click', toggleMenu);
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
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
    
    // Menü auf Desktop schließen
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && burgerButton.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // ARIA Attribute setzen
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-controls', 'mainNav');
    burgerButton.setAttribute('aria-label', 'Hauptmenü öffnen');
    
    console.log('✅ Menu.js für alle Seiten initialisiert');
});
