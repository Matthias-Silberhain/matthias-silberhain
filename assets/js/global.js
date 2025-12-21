// ============================================================================
// DARK MODE - OPTIMIERT & KONFLIKTFREI
// ============================================================================

(function() {
    'use strict';
    
    // 1. ONLY DECLARE GLOBAL FUNCTION
    window.initDarkMode = function() {
        console.log('🌓 Dark Mode initialisieren...');
        
        const toggleBtn = document.getElementById('darkModeToggle');
        if (!toggleBtn) {
            console.warn('⚠️ Dark Mode Toggle nicht gefunden (nicht auf dieser Seite)');
            return false;
        }
        
        // 2. THEME AUS LOCALSTORAGE
        function getSavedTheme() {
            try {
                return localStorage.getItem('ms-theme');
            } catch (e) {
                return null;
            }
        }
        
        // 3. SYSTEMPREFERENZ
        function getSystemPreference() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
        }
        
        // 4. THEME ANWENDEN
        function applyTheme(theme) {
            const isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark-mode', isDark);
            document.body.classList.toggle('dark-mode', isDark);
            
            // Icon aktualisieren
            const moonIcon = toggleBtn.querySelector('.moon-icon');
            const sunIcon = toggleBtn.querySelector('.sun-icon');
            
            if (moonIcon && sunIcon) {
                moonIcon.style.display = isDark ? 'none' : 'block';
                sunIcon.style.display = isDark ? 'block' : 'none';
                toggleBtn.setAttribute('aria-label', isDark ? 'Zum Light Mode wechseln' : 'Zum Dark Mode wechseln');
            }
        }
        
        // 5. TOGGLE FUNKTION
        function toggleTheme() {
            const isCurrentlyDark = document.body.classList.contains('dark-mode');
            const newTheme = isCurrentlyDark ? 'light' : 'dark';
            
            applyTheme(newTheme);
            try {
                localStorage.setItem('ms-theme', newTheme);
            } catch (e) {}
            
            // Haptic Feedback
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => toggleBtn.style.transform = '', 200);
        }
        
        // 6. INITIALISIERUNG
        const savedTheme = getSavedTheme();
        const systemTheme = getSystemPreference();
        const initialTheme = savedTheme || systemTheme;
        
        applyTheme(initialTheme);
        
        // 7. EVENT LISTENER
        toggleBtn.addEventListener('click', toggleTheme);
        toggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // 8. SYSTEM-ÄNDERUNGEN ÜBERWACHEN
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!getSavedTheme()) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        console.log('✅ Dark Mode initialisiert');
        return true;
    };
    
})();
