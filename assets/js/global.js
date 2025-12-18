// ============================================================================
// EINFACHE & FUNKTIONIERENDE DARK MODE IMPLEMENTATION
// ============================================================================

(function() {
    'use strict';
    
    console.log('🌓 Dark Mode wird initialisiert...');
    
    // 1. FUNKTION: Dark Mode umschalten
    function toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        
        // Prüfe ob Dark Mode aktiv ist
        const isDark = html.classList.contains('dark-mode') || 
                      body.classList.contains('dark-mode');
        
        console.log('🔄 Dark Mode umschalten. Aktuell:', isDark ? 'Dark' : 'Light');
        
        if (isDark) {
            // Zu Light Mode wechseln
            html.classList.remove('dark-mode');
            body.classList.remove('dark-mode');
            
            // Inline Styles entfernen
            html.style.backgroundColor = '';
            body.style.backgroundColor = '';
            body.style.color = '';
            
            // Speichern
            localStorage.setItem('ms-theme', 'light');
            console.log('☀️ Light Mode aktiviert');
        } else {
            // Zu Dark Mode wechseln
            html.classList.add('dark-mode');
            body.classList.add('dark-mode');
            
            // Inline Styles für Browser die Klassen ignorieren
            setTimeout(() => {
                html.style.backgroundColor = '#1a1a1a';
                body.style.backgroundColor = '#1a1a1a';
                body.style.color = '#b0b5bc';
            }, 10);
            
            // Speichern
            localStorage.setItem('ms-theme', 'dark');
            console.log('🌙 Dark Mode aktiviert');
        }
        
        // Button Icon aktualisieren
        updateToggleButton();
        
        return !isDark;
    }
    
    // 2. FUNKTION: Toggle Button Icon aktualisieren
    function updateToggleButton() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (!toggleBtn) return;
        
        const isDark = document.documentElement.classList.contains('dark-mode') || 
                      document.body.classList.contains('dark-mode');
        
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
    
    // 3. FUNKTION: Dark Mode beim Laden setzen
    function setInitialTheme() {
        const html = document.documentElement;
        const body = document.body;
        
        try {
            // Prüfe gespeichertes Theme
            const savedTheme = localStorage.getItem('ms-theme');
            console.log('📂 Gespeichertes Theme:', savedTheme);
            
            let isDark = false;
            
            if (savedTheme === 'dark') {
                isDark = true;
            } else if (savedTheme === 'light') {
                isDark = false;
            } else {
                // Kein gespeichertes Theme, prüfe Systemeinstellung
                const prefersDark = window.matchMedia && 
                                   window.matchMedia('(prefers-color-scheme: dark)').matches;
                isDark = prefersDark;
            }
            
            // Theme anwenden
            if (isDark) {
                html.classList.add('dark-mode');
                body.classList.add('dark-mode');
                
                // Inline Styles sofort setzen
                setTimeout(() => {
                    html.style.backgroundColor = '#1a1a1a';
                    body.style.backgroundColor = '#1a1a1a';
                    body.style.color = '#b0b5bc';
                }, 10);
                
                console.log('🌙 Dark Mode initial aktiviert');
            } else {
                html.classList.remove('dark-mode');
                body.classList.remove('dark-mode');
                console.log('☀️ Light Mode initial aktiviert');
            }
            
            // Button aktualisieren
            updateToggleButton();
            
        } catch (error) {
            console.warn('❌ Fehler beim Laden des Themes:', error);
        }
    }
    
    // 4. INITIALISIERUNG
    function initDarkMode() {
        console.log('🚀 Dark Mode initialisiert');
        
        // Initiales Theme setzen
        setInitialTheme();
        
        // Toggle Button finden
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (!toggleBtn) {
            console.error('❌ Dark Mode Toggle Button nicht gefunden!');
            return;
        }
        
        console.log('✅ Dark Mode Toggle Button gefunden');
        
        // Event Listener hinzufügen
        toggleBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleDarkMode();
        });
        
        // Touch Support für Mobile
        toggleBtn.addEventListener('touchstart', function(event) {
            event.preventDefault();
            toggleDarkMode();
        }, { passive: false });
        
        // Keyboard Support
        toggleBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleDarkMode();
            }
        });
        
        console.log('✅ Dark Mode Event Listener registriert');
    }
    
    // 5. STARTPUNKT
    // Theme SOFORT setzen (vor DOMContentLoaded)
    try {
        const savedTheme = localStorage.getItem('ms-theme');
        const prefersDark = window.matchMedia && 
                           window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            
            // Inline Styles sofort setzen
            document.documentElement.style.backgroundColor = '#1a1a1a';
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#b0b5bc';
        }
    } catch (e) {
        // Ignoriere Fehler
    }
    
    // Initialisierung starten
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
        initDarkMode();
    }
    
    // Debugging Helper (optional)
    window.debugDarkMode = {
        toggle: toggleDarkMode,
        getStatus: function() {
            return document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
        },
        forceDark: function() {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('ms-theme', 'dark');
            updateToggleButton();
        },
        forceLight: function() {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('ms-theme', 'light');
            updateToggleButton();
        }
    };
    
})();
