/**
 * DARK MODE TOGGLE - Matthias Silberhain Website
 * Version 2.0 - Komplett überarbeitet
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Dark Mode Skript geladen');
    
    const darkModeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Prüfe gespeicherten Modus oder Systemeinstellung
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Theme setzen
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        console.log('Dark Mode aktiviert (gespeichert oder System)');
    } else {
        body.classList.remove('dark-mode');
        console.log('Light Mode aktiviert');
    }
    
    // Toggle-Funktion
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Speichere Einstellung
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                console.log('Dark Mode aktiviert und gespeichert');
            } else {
                localStorage.setItem('theme', 'light');
                console.log('Light Mode aktiviert und gespeichert');
            }
            
            // Haptic Feedback für Mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        
        // Hover-Effekt für Toggle
        darkModeToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(192, 192, 192, 0.5)';
        });
        
        darkModeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    } else {
        console.warn('Dark Mode Toggle Button nicht gefunden!');
    }
    
    // System-Änderungen überwachen
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                console.log('Dark Mode (Systemänderung)');
            } else {
                body.classList.remove('dark-mode');
                console.log('Light Mode (Systemänderung)');
            }
        }
    });
    
    // Tastatur-Support (Accessibility)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'd') {
            darkModeToggle.click();
            console.log('Dark Mode via Tastatur getoggled');
        }
    });
});
