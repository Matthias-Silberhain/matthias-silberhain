// assets/js/menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menü JS startet');
    
    const burger = document.querySelector('.burger');
    const hauptnavigation = document.querySelector('.hauptnavigation');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!burger || !hauptnavigation) {
        console.error('Menü-Elemente nicht gefunden');
        return;
    }
    
    // ARIA-Attribute setzen
    burger.setAttribute('aria-label', 'Hauptmenü öffnen oder schließen');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'hauptnavigation');
    
    // Menü öffnen
    function openMenu() {
        console.log('Menü öffnen');
        burger.classList.add('aktiv');
        hauptnavigation.classList.add('aktiv');
        
        // Mobile: Display auf flex setzen
        if (window.innerWidth <= 768) {
            hauptnavigation.style.display = 'flex';
        }
        
        // Overlay aktivieren
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        // Body scrollen sperren
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
    }
    
    // Menü schließen
    function closeMenu() {
        console.log('Menü schließen');
        burger.classList.remove('aktiv');
        hauptnavigation.classList.remove('aktiv');
        
        // Overlay deaktivieren
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        // Body scrollen erlauben
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        // Auf Mobile nach Animation ausblenden
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                if (!hauptnavigation.classList.contains('aktiv')) {
                    hauptnavigation.style.display = 'none';
                }
            }, 300);
        }
    }
    
    // Menü umschalten
    function toggleMenu(event) {
        if (event) event.stopPropagation();
        
        if (hauptnavigation.classList.contains('aktiv')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Event Listener
    burger.addEventListener('click', toggleMenu);
    
    // Overlay schließt Menü
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menü-Links schließen Menü auf Mobile
    const navLinks = hauptnavigation.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(closeMenu, 100);
            }
        });
    });
    
    // ESC-Taste schließt Menü
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hauptnavigation.classList.contains('aktiv')) {
            closeMenu();
        }
    });
    
    // Bei Resize: Menü zurücksetzen wenn auf Desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Auf Desktop: Menü immer sichtbar
            closeMenu();
            hauptnavigation.style.display = 'flex';
        } else {
            // Auf Mobile: Wenn Menü nicht aktiv ist, ausblenden
            if (!hauptnavigation.classList.contains('aktiv')) {
                hauptnavigation.style.display = 'none';
            }
        }
    });
    
    // Initialisiere Menü-Status basierend auf Bildschirmgröße
    function initMenuState() {
        if (window.innerWidth <= 768) {
            hauptnavigation.style.display = 'none';
        } else {
            hauptnavigation.style.display = 'flex';
        }
    }
    
    // Initialisierung
    initMenuState();
    
    console.log('Mobile Menü JS erfolgreich geladen');
});
