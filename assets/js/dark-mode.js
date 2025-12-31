/**
 * DARK MODE TOGGLE - Matthias Silberhain Website
 * Theme-Switching für alle Seiten
 * Version 2.1 - Universal
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Dark Mode JS geladen');
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Funktion um Dark Mode zu aktivieren
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('silberhain-theme', 'dark');
        updateToggleIcon(true);
        console.log('Dark Mode aktiviert');
    }
    
    // Funktion um Light Mode zu aktivieren
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('silberhain-theme', 'light');
        updateToggleIcon(false);
        console.log('Light Mode aktiviert');
    }
    
    // Icon aktualisieren
    function updateToggleIcon(isDark) {
        if (!themeToggle) return;
        
        const moonIcon = themeToggle.querySelector('.moon-icon');
        const sunIcon = themeToggle.querySelector('.sun-icon');
        
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                themeToggle.setAttribute('aria-label', 'Zum Hellmodus wechseln');
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                themeToggle.setAttribute('aria-label', 'Zum Dunkelmodus wechseln');
            }
        }
    }
    
    // Theme umschalten
    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
        
        // Visuelles Feedback
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        }
    }
    
    // Event Listener für Toggle Button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Accessibility: Toggle mit Tastatur
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Initialisiere Theme basierend auf Local Storage oder System
    function initTheme() {
        const savedTheme = localStorage.getItem('silberhain-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        console.log('Gespeichertes Theme:', savedTheme);
        console.log('System-Präferenz:', prefersDark ? 'dark' : 'light');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
    
    // System-Präferenzänderung überwachen
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Nur ändern wenn keine manuelle Einstellung
        if (!localStorage.getItem('silberhain-theme')) {
            console.log('System-Theme geändert:', e.matches ? 'dark' : 'light');
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
    
    // Initialisierung
    initTheme();
    
    console.log('✅ Dark Mode für alle Seiten initialisiert');
});
