============================================================================
// DARK MODE - KORRIGIERT & VOLL FUNKTIONIERT
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌓 Dark Mode Script geladen');
    
    // 1. THEME AUS LOCALSTORAGE LADEN
    function getSavedTheme() {
        try {
            return localStorage.getItem('ms-theme');
        } catch (e) {
            console.log('⚠️ Kein Zugriff auf localStorage');
            return null;
        }
    }
    
    // 2. SYSTEMPREFERENZ PRÜFEN
    function getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // 3. THEME ANWENDEN
    function applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        console.log('🎨 Wende Theme an:', theme);
        
        if (theme === 'dark') {
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            updateToggleIcon(true);
            console.log('🌙 Dark Mode aktiv');
        } else {
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            updateToggleIcon(false);
            console.log('☀️ Light Mode aktiv');
        }
    }
    
    // 4. TOGGLE BUTTON ICON AKTUALISIEREN
    function updateToggleIcon(isDark) {
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (!toggleBtn) {
            console.warn('⚠️ Toggle Button nicht gefunden');
            return;
        }
        
        const moonIcon = toggleBtn.querySelector('.moon-icon');
        const sunIcon = toggleBtn.querySelector('.sun-icon');
        
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                toggleBtn.setAttribute('aria-label', 'Zum Light Mode wechseln');
                toggleBtn.title = 'Zum Light Mode wechseln';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                toggleBtn.setAttribute('aria-label', 'Zum Dark Mode wechseln');
                toggleBtn.title = 'Zum Dark Mode wechseln';
            }
        }
        
        console.log('🔄 Toggle Icon aktualisiert:', isDark ? 'Dark' : 'Light');
    }
    
    // 5. DARK MODE UMSCHALTEN
    function toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        
        console.log('🔄 Toggle Dark Mode. Aktuell:', isDark ? 'Dark' : 'Light');
        
        if (isDark) {
            // Zu Light wechseln
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('ms-theme', 'light');
            updateToggleIcon(false);
            console.log('☀️ Zu Light Mode gewechselt');
        } else {
            // Zu Dark wechseln
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('ms-theme', 'dark');
            updateToggleIcon(true);
            console.log('🌙 Zu Dark Mode gewechselt');
        }
        
        // Animation für Feedback
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // 6. INITIALISIERE DARK MODE
    function initDarkMode() {
        console.log('🚀 Initialisiere Dark Mode...');
        
        // Button finden
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (!toggleBtn) {
            console.error('❌ Dark Mode Toggle Button NICHT GEFUNDEN!');
            console.log('🔍 Suche Button erneut in 500ms...');
            setTimeout(initDarkMode, 500);
            return;
        }
        
        console.log('✅ Dark Mode Toggle Button gefunden');
        
        // Button klickbar machen
        toggleBtn.style.pointerEvents = 'auto';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.setAttribute('tabindex', '0');
        toggleBtn.style.opacity = '1';
        toggleBtn.style.visibility = 'visible';
        
        // Theme bestimmen und anwenden
        const savedTheme = getSavedTheme();
        const systemTheme = getSystemPreference();
        const initialTheme = savedTheme || systemTheme;
        
        applyTheme(initialTheme);
        
        // Click Event hinzufügen
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Dark Mode Button geklickt');
            toggleDarkMode();
        });
        
        // Auch per Enter-Taste aktivierbar
        toggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDarkMode();
            }
        });
        
        // System-Änderungen überwachen
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                if (!getSavedTheme()) { // Nur wenn kein manuelles Theme gesetzt
                    console.log('🖥️ System Theme geändert:', e.matches ? 'dark' : 'light');
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        console.log('✅ Dark Mode initialisiert');
    }
    
    // 7. STARTE INITIALISIERUNG
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initDarkMode, 50);
        });
    } else {
        setTimeout(initDarkMode, 50);
    }
    
    // 8. GLOBALE FUNKTION FÜR EXTERNE ZUGRIFF
    window.toggleDarkMode = toggleDarkMode;
    
    console.log('✅ Dark Mode Script bereit');
    
})();
