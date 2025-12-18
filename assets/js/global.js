// ============================================================================
// EINFACHE DARK MODE IMPLEMENTATION
// ============================================================================

(function() {
    'use strict';

    // 1. Funktion zum Umschalten des Dark Mode
    function toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        
        // Prüfen, ob Dark Mode aktiv ist
        const isDark = html.classList.contains('dark-mode');
        
        if (isDark) {
            // Deaktiviere Dark Mode
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            localStorage.setItem('ms-theme', 'light');
            console.log('Dark Mode deaktiviert');
        } else {
            // Aktiviere Dark Mode
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('ms-theme', 'dark');
            console.log('Dark Mode aktiviert');
        }
        
        // Aktualisiere das Icon des Buttons
        updateToggleButton();
    }

    // 2. Funktion zum Aktualisieren des Toggle-Buttons
    function updateToggleButton() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) return;
        
        const isDark = document.documentElement.classList.contains('dark-mode');
        const moonIcon = toggleButton.querySelector('.moon-icon');
        const sunIcon = toggleButton.querySelector('.sun-icon');
        
        if (isDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            toggleButton.setAttribute('aria-label', 'Zum Light Mode wechseln');
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            toggleButton.setAttribute('aria-label', 'Zum Dark Mode wechseln');
        }
    }

    // 3. Initialisierung des Dark Mode beim Laden der Seite
    function initDarkMode() {
        // Prüfen, ob ein Theme in localStorage gespeichert ist
        const savedTheme = localStorage.getItem('ms-theme');
        
        // Falls kein Theme gespeichert ist, das System-Theme verwenden
        if (savedTheme === null) {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
            }
        } else if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        }
        
        // Toggle-Button aktualisieren
        updateToggleButton();
        
        // Event-Listener für den Toggle-Button hinzufügen
        const toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleDarkMode);
        } else {
            console.error('Dark Mode Toggle Button nicht gefunden!');
        }
    }

    // 4. Initialisierung starten, sobald das DOM vollständig geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        // DOMContentLoaded wurde bereits ausgelöst
        initDarkMode();
    }

})();
