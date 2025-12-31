// menu.js - BURGER MENU FIX für KLASSE "burger"
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM geladen - Menu JS startet');
    
    // Elemente aus DEINEM HTML
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Log zur Kontrolle
    console.log('Burger gefunden:', burger);
    console.log('Navigation gefunden:', navigation);
    console.log('MenuOverlay gefunden:', menuOverlay);
    
    // 1. BURGER KLICK - Menü öffnen/schließen
    if (burger) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('🍔 Burger Button geklickt!');
            
            // Menü umschalten
            navigation.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // Burger-Animation
            if (navigation.classList.contains('active')) {
                // Menü geöffnet - Burger zu X
                burger.style.background = 'rgba(255, 255, 255, 0.9)';
                burger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                burger.querySelectorAll('span')[1].style.opacity = '0';
                burger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                document.body.style.overflow = 'hidden'; // Scrollen blockieren
            } else {
                // Menü geschlossen - X zu Burger
                burger.style.background = 'rgba(0, 0, 0, 0.8)';
                burger.querySelectorAll('span')[0].style.transform = 'none';
                burger.querySelectorAll('span')[1].style.opacity = '1';
                burger.querySelectorAll('span')[2].style.transform = 'none';
                document.body.style.overflow = 'auto'; // Scrollen erlauben
            }
        });
    } else {
        console.error('❌ Burger Button nicht gefunden!');
    }
    
    // 2. OVERLAY KLICK - Menü schließen
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            console.log('Overlay geklickt - Menü schließen');
            closeMenu();
        });
    }
    
    // 3. MENÜ-LINKS - Klick schließt Menü
    if (navigation) {
        navigation.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                console.log('Menü-Link geklickt:', e.target.href);
                closeMenu();
            }
        });
    }
    
    // 4. ESCAPE-TASTE - Menü schließen
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // 5. DARK MODE TOGGLE (falls vorhanden)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            console.log('Dark Mode Toggle geklickt');
            // Deine Dark Mode Logik hier
        });
    }
    
    // Funktion zum Menü schließen
    function closeMenu() {
        navigation.classList.remove('active');
        menuOverlay.classList.remove('active');
        burger.style.background = 'rgba(0, 0, 0, 0.8)';
        burger.querySelectorAll('span')[0].style.transform = 'none';
        burger.querySelectorAll('span')[1].style.opacity = '1';
        burger.querySelectorAll('span')[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // 6. TOUCH-EVENTS für Mobile optimieren
    burger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
    }, { passive: false });
    
    burger.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
    
    console.log('✅ Menu JS erfolgreich initialisiert');
});
