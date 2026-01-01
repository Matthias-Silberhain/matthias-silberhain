(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        
        // Theme aus LocalStorage oder aktueller Klasse
        const currentTheme = localStorage.getItem('theme') || 
                            (document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        
        // Initial setzen
        if (currentTheme === 'dark' && !document.body.classList.contains('dark-mode')) {
            document.body.classList.add('dark-mode');
        } else if (currentTheme === 'light' && document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
        }
        
        // Theme Toggle Event
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const isDarkMode = document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                
                // Toggle Animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // Initialen Toggle-Status setzen
            themeToggle.setAttribute('data-theme', 
                document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        }
        
        // System Theme Change Listener
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    });
})();
