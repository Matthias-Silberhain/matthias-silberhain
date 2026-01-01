(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        
        // Aktuelles Theme prüfen
        const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
        
        // Theme Toggle Event
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const isDark = document.documentElement.classList.toggle('dark-theme');
                document.documentElement.classList.toggle('light-theme', !isDark);
                
                // Speichern für alle Seiten und nächsten Besuch
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                
                // Toggle Animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // Initialen Toggle-Status setzen
            themeToggle.setAttribute('data-theme', currentTheme);
        }
        
        // System Theme Change Listener
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark-theme');
                    document.documentElement.classList.remove('light-theme');
                } else {
                    document.documentElement.classList.add('light-theme');
                    document.documentElement.classList.remove('dark-theme');
                }
            }
        });
    });
})();
