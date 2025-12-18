// ============================================================================
// EINFACHER DARK MODE - KEINE KOMPLEXITÄT
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌓 Dark Mode Script geladen');
    
    // 1. Funktion zum Umschalten
    function toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        
        // Prüfe ob Dark Mode aktiv
        const isDark = html.classList.contains('dark-mode');
        
        console.log('🔄 Toggle Dark Mode. Aktuell:', isDark ? 'Dark' : 'Light');
        
        if (isDark) {
            // Zu Light wechseln
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('ms-theme', 'light');
            updateToggleIcon(false);
            console.log('☀️ Light Mode aktiviert');
        } else {
            // Zu Dark wechseln
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('ms-theme', 'dark');
            updateToggleIcon(true);
            console.log('🌙 Dark Mode aktiviert');
        }
    }
    
    // 2. Button Icon aktualisieren
    function updateToggleIcon(isDark) {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (!toggleBtn) return;
        
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
    
    // 3. Initialisiere
    function init() {
        console.log('🚀 Initialisiere Dark Mode...');
        
        // Setze initiales Icon
        const isDark = document.documentElement.classList.contains('dark-mode');
        updateToggleIcon(isDark);
        
        // Finde Toggle Button
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (toggleBtn) {
            console.log('✅ Dark Mode Toggle Button gefunden');
            
            // EINFACHER CLICK EVENT
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDarkMode();
            });
            
        } else {
            console.error('❌ Dark Mode Toggle Button NICHT GEFUNDEN!');
        }
    }
    
    // 4. Starte wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
