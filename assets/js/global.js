// ============================================================================
// GLOBAL.JS - KOMPLETTE LÖSUNG FÜR ALLES
// ============================================================================

console.log('🚀 global.js wird geladen...');

// ============================================================================
// 1. PRELOADER ANIMATION - MIT MATTHIAS SILBERHAIN
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌀 Preloader initialisiert');
    
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.querySelector('.preloader-text');
        
        if (!preloader || !typeText) {
            console.warn('⚠️ Preloader Elemente nicht gefunden');
            return;
        }
        
        console.log('✅ Preloader gefunden');
        
        // Preloader sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        // Text für die Typing Animation
        const fullText = "MATTHIAS SILBERHAIN";
        let charIndex = 0;
        const typingSpeed = 100;
        
        function typeCharacter() {
            if (charIndex < fullText.length) {
                const nextChar = fullText.charAt(charIndex);
                typeText.textContent += nextChar;
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                console.log('✅ Typing Animation abgeschlossen');
                
                // Warte kurz und verstecke Preloader
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                        
                        // WICHTIG: Mobile Menu und Dark Mode nach Preloader aktivieren
                        setTimeout(initMobileMenu, 100);
                        setTimeout(initDarkMode, 100);
                    }, 600);
                }, 1000);
            }
        }
        
        // Starte Typing Animation
        setTimeout(() => {
            console.log('⌨️ Starte Typing Animation');
            typeText.textContent = '';
            typeCharacter();
        }, 300);
    }
    
    // Starte Preloader
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initPreloader, 100);
        });
    } else {
        setTimeout(initPreloader, 100);
    }
    
})();

// ============================================================================
// 2. MOBILE MENU - BURGER MENÜ
// ============================================================================

function initMobileMenu() {
    console.log('📱 Initialisiere Mobile Menu...');
    
    const burger = document.querySelector('.burger');
    const hauptnavigation = document.querySelector('.hauptnavigation');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    
    if (!burger || !hauptnavigation) {
        console.warn('⚠️ Mobile Menu Elemente nicht gefunden');
        return;
    }
    
    console.log('✅ Burger Menu Elemente gefunden');
    
    // Overlay erstellen falls nicht vorhanden
    if (!menuOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        console.log('✅ Menu Overlay erstellt');
    }
    
    const overlay = document.querySelector('.menu-overlay');
    
    // Burger Click Event
    burger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        burger.classList.toggle('aktiv');
        hauptnavigation.classList.toggle('aktiv');
        overlay.classList.toggle('active');
        
        // Body Scroll verhindern
        if (hauptnavigation.classList.contains('aktiv')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        console.log('🍔 Burger Menu:', hauptnavigation.classList.contains('aktiv') ? 'geöffnet' : 'geschlossen');
    });
    
    // Overlay Click Event
    overlay.addEventListener('click', function() {
        burger.classList.remove('aktiv');
        hauptnavigation.classList.remove('aktiv');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('🍔 Menu via Overlay geschlossen');
    });
    
    // Navigation Links schließen Menu
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('aktiv');
            hauptnavigation.classList.remove('aktiv');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('🍔 Menu via Link geschlossen');
        });
    });
    
    // ESC Taste schließt Menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hauptnavigation.classList.contains('aktiv')) {
            burger.classList.remove('aktiv');
            hauptnavigation.classList.remove('aktiv');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('🍔 Menu via ESC geschlossen');
        }
    });
    
    // Resize Event - Menu schließen bei größerem Screen
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burger.classList.remove('aktiv');
            hauptnavigation.classList.remove('aktiv');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('✅ Mobile Menu initialisiert');
}

// ============================================================================
// 3. DARK MODE - VOLL FUNKTIONIERT
// ============================================================================

function initDarkMode() {
    console.log('🌓 Initialisiere Dark Mode...');
    
    const toggleBtn = document.getElementById('darkModeToggle');
    
    if (!toggleBtn) {
        console.error('❌ Dark Mode Toggle Button NICHT GEFUNDEN!');
        return;
    }
    
    console.log('✅ Dark Mode Toggle Button gefunden');
    
    // Button sichtbar und klickbar machen
    toggleBtn.style.pointerEvents = 'auto';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.opacity = '1';
    toggleBtn.style.visibility = 'visible';
    
    // Theme aus LocalStorage laden
    function getSavedTheme() {
        try {
            return localStorage.getItem('ms-theme');
        } catch (e) {
            return null;
        }
    }
    
    // Systempräferenz prüfen
    function getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Theme anwenden
    function applyTheme(theme) {
        const body = document.body;
        
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            updateToggleIcon(true);
            console.log('🌙 Dark Mode aktiv');
        } else {
            body.classList.remove('dark-mode');
            updateToggleIcon(false);
            console.log('☀️ Light Mode aktiv');
        }
    }
    
    // Toggle Icon aktualisieren
    function updateToggleIcon(isDark) {
        const moonIcon = toggleBtn.querySelector('.moon-icon');
        const sunIcon = toggleBtn.querySelector('.sun-icon');
        
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                toggleBtn.setAttribute('aria-label', 'Zum Light Mode wechseln');
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                toggleBtn.setAttribute('aria-label', 'Zum Dark Mode wechseln');
            }
        }
    }
    
    // Dark Mode umschalten
    function toggleDarkMode() {
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        
        console.log('🔄 Toggle Dark Mode:', isDark ? 'Dark → Light' : 'Light → Dark');
        
        if (isDark) {
            // Zu Light wechseln
            body.classList.remove('dark-mode');
            localStorage.setItem('ms-theme', 'light');
            updateToggleIcon(false);
        } else {
            // Zu Dark wechseln
            body.classList.add('dark-mode');
            localStorage.setItem('ms-theme', 'dark');
            updateToggleIcon(true);
        }
        
        // Animation für Feedback
        toggleBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            toggleBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Initiales Theme setzen
    const savedTheme = getSavedTheme();
    const systemTheme = getSystemPreference();
    const initialTheme = savedTheme || systemTheme;
    
    applyTheme(initialTheme);
    
    // Click Event
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkMode();
    });
    
    // Enter-Taste Event
    toggleBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
    
    // System-Änderungen überwachen
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!getSavedTheme()) {
                console.log('🖥️ System Theme geändert');
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    console.log('✅ Dark Mode initialisiert');
}

// ============================================================================
// 4. ALLGEMEINE INITIALISIERUNG
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM vollständig geladen');
    
    // WICHTIG: Init Mobile Menu und Dark Mode SOFORT
    // (Falls Preloader schnell fertig ist)
    initMobileMenu();
    initDarkMode();
    
    // Jahreszahl im Footer aktualisieren
    const yearElement = document.getElementById('jahr');
    if (yearElement && !yearElement.textContent) {
        yearElement.textContent = new Date().getFullYear();
        console.log('📅 Jahreszahl aktualisiert');
    }
    
    // Alle interaktiven Elemente klickbar machen
    setTimeout(function() {
        console.log('🖱️ Aktiviere interaktive Elemente...');
        
        const selectors = ['button', 'a', '.burger', '.dark-mode-toggle', '.silber-button', '.social-link'];
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
            });
        });
        
        console.log('✅ Alle Elemente sind jetzt klickbar');
    }, 1000);
});

// ============================================================================
// 5. FALLBACKS FÜR ZUVERLÄSSIGKEIT
// ============================================================================

// Fallback 1: Preloader nach 8 Sekunden erzwingen
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        console.log('⚠️ Preloader-Fallback aktiviert');
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            initMobileMenu();
            initDarkMode();
        }, 600);
    }
}, 8000);

// Fallback 2: Mobile Menu nach 3 Sekunden erneut versuchen
setTimeout(function() {
    if (!document.querySelector('.burger').hasEventListener) {
        console.log('🔄 Versuche Mobile Menu erneut zu initialisieren');
        initMobileMenu();
    }
}, 3000);

// Fallback 3: Dark Mode nach 3 Sekunden erneut versuchen
setTimeout(function() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn && !toggleBtn.hasEventListener) {
        console.log('🔄 Versuche Dark Mode erneut zu initialisieren');
        initDarkMode();
    }
}, 3000);

// ============================================================================
// 6. GLOBALE FUNKTIONEN FÜR EXTERNE NUTZUNG
// ============================================================================

window.toggleDarkMode = function() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.click();
    }
};

window.toggleMobileMenu = function() {
    const burger = document.querySelector('.burger');
    if (burger) {
        burger.click();
    }
};

console.log('✅ global.js vollständig geladen');
