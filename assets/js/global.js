
// ============================================================================
// GLOBAL DARK MODE - FUNKTIONIERT AUF ALLEN SEITEN UND IN ALLEN BROWSERN
// ============================================================================

(function() {
  'use strict';
  
  // Warte bis DOM vollständig geladen ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalDarkMode);
  } else {
    initGlobalDarkMode();
  }
  
  function initGlobalDarkMode() {
    console.log('🌓 Global Dark Mode wird initialisiert...');
    
    // Elemente finden
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Wenn kein Toggle gefunden wurde, abbrechen
    if (!darkModeToggle) {
      console.warn('⚠️ Dark Mode Toggle nicht gefunden. Stelle sicher, dass der Button in jeder HTML-Datei existiert.');
      return;
    }
    
    // Prüfe ob localStorage verfügbar ist (mit Fallback)
    const localStorageAvailable = isLocalStorageAvailable();
    console.log('💾 LocalStorage verfügbar:', localStorageAvailable);
    
    // Lade gespeichertes Theme oder setze Standard auf "light" (Schwarz)
    let currentTheme = 'light'; // Standard: Schwarz
    
    if (localStorageAvailable) {
      try {
        const savedTheme = localStorage.getItem('ms-theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          currentTheme = savedTheme;
        }
      } catch (error) {
        console.warn('❌ Konnte Theme nicht aus localStorage laden:', error);
      }
    }
    
    console.log('🎨 Aktuelles Theme:', currentTheme);
    
    // Theme sofort anwenden (verhindert Flackern)
    applyTheme(currentTheme, body, darkModeToggle);
    
    // ========================================
    // EVENT LISTENER FÜR ALLE BROWSER
    // ========================================
    
    // 1. CLICK EVENT (Standard für Desktop)
    darkModeToggle.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      toggleDarkMode();
    });
    
    // 2. TOUCH EVENT (für Mobile/Safari)
    darkModeToggle.addEventListener('touchstart', function(event) {
      event.preventDefault();
      toggleDarkMode();
    }, { passive: false });
    
    // 3. KEYBOARD SUPPORT (Accessibility)
    darkModeToggle.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        toggleDarkMode();
      }
    });
    
    // ========================================
    // HAUPTFUNKTIONEN
    // ========================================
    
    function toggleDarkMode() {
      // Bestimme neues Theme
      const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
      
      // Theme anwenden
      applyTheme(newTheme, body, darkModeToggle);
      
      // Theme speichern
      if (localStorageAvailable) {
        try {
          localStorage.setItem('ms-theme', newTheme);
          console.log('💾 Theme gespeichert:', newTheme);
        } catch (error) {
          console.warn('❌ Konnte Theme nicht speichern:', error);
        }
      }
      
      // Visuelles Feedback (optional)
      provideVisualFeedback(newTheme);
    }
    
    function applyTheme(theme, bodyElement, toggleElement) {
      // Theme auf Body anwenden
      if (theme === 'dark') {
        bodyElement.classList.add('dark-mode');
      } else {
        bodyElement.classList.remove('dark-mode');
      }
      
      // Icons aktualisieren
      updateIcons(theme, toggleElement);
      
      // Log für Debugging
      console.log('🔄 Theme angewendet:', theme);
    }
    
    function updateIcons(theme, toggleElement) {
      const moonIcon = toggleElement.querySelector('.moon-icon, .dm-moon');
      const sunIcon = toggleElement.querySelector('.sun-icon, .dm-sun');
      
      if (moonIcon && sunIcon) {
        if (theme === 'dark') {
          // Dark Mode aktiv: Sonne zeigen
          moonIcon.style.display = 'none';
          sunIcon.style.display = 'block';
        } else {
          // Light Mode aktiv: Mond zeigen
          moonIcon.style.display = 'block';
          sunIcon.style.display = 'none';
        }
      }
    }
    
    function provideVisualFeedback(theme) {
      // Optional: kurzes visuelles Feedback
      const toggle = document.getElementById('darkModeToggle');
      if (toggle) {
        toggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
          toggle.style.transform = '';
        }, 150);
      }
      
      // Console Log mit Emoji
      const emoji = theme === 'dark' ? '🌙' : '☀️';
      console.log(`${emoji} Theme geändert: ${theme === 'dark' ? 'Dunkelgrau' : 'Schwarz'}`);
    }
    
    function isLocalStorageAvailable() {
      // Robustere Prüfung für alle Browser
      try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        return retrieved === testKey;
      } catch (error) {
        return false;
      }
    }
    
    // ========================================
    // BROWSER-SPEZIFISCHE FIXES
    // ========================================
    
    // Safari: Touch-Highlight entfernen
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
      darkModeToggle.style.webkitTapHighlightColor = 'transparent';
    }
    
    // Firefox: Outline bei Focus beibehalten für Accessibility
    if (navigator.userAgent.includes('Firefox')) {
      darkModeToggle.style.outline = 'none';
      darkModeToggle.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 2px rgba(200, 205, 215, 0.5)';
      });
      darkModeToggle.addEventListener('blur', function() {
        this.style.boxShadow = '';
      });
    }
    
    // ========================================
    // SEITENWECHSEL-ÜBERWACHUNG (SPA-like)
    // ========================================
    
    // Überwache Links, um Theme bei Seitenwechsel beizubehalten
    document.addEventListener('click', function(event) {
      const link = event.target.closest('a');
      if (link && link.href && !link.href.includes('#')) {
        // Kurze Verzögerung, damit localStorage Zeit hat zu speichern
        setTimeout(() => {
          if (localStorageAvailable) {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            try {
              localStorage.setItem('ms-theme', currentTheme);
            } catch (error) {
              // Ignoriere Fehler bei schnellen Klicks
            }
          }
        }, 10);
      }
    });
    
    // ========================================
    // GLOBALE FUNKTIONEN FÜR DEBUGGING
    // ========================================
    
    // Mach Funktionen global verfügbar (nur für Debugging)
    window.msDarkMode = {
      toggle: toggleDarkMode,
      getTheme: function() {
        return body.classList.contains('dark-mode') ? 'dark' : 'light';
      },
      forceTheme: function(theme) {
        if (theme === 'dark' || theme === 'light') {
          applyTheme(theme, body, darkModeToggle);
          if (localStorageAvailable) {
            localStorage.setItem('ms-theme', theme);
          }
        }
      },
      debug: function() {
        console.log('=== DARK MODE DEBUG INFO ===');
        console.log('Body hat dark-mode Klasse:', body.classList.contains('dark-mode'));
        console.log('Gespeichertes Theme:', localStorageAvailable ? localStorage.getItem('ms-theme') : 'N/A');
        console.log('Toggle gefunden:', !!darkModeToggle);
        console.log('Browser:', navigator.userAgent);
        console.log('============================');
      }
    };
    
    // Initialisierungs-Log
    console.log('✅ Global Dark Mode erfolgreich initialisiert');
    console.log('🔧 Verfügbare Funktionen: window.msDarkMode.toggle(), window.msDarkMode.debug()');
  }
  
  // Fallback: Wenn etwas schief geht
  window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('dark')) {
      console.error('Dark Mode Fehler:', event.error);
    }
  });
  
})();

// ============================================================================
// SOFORTIGE ANWENDUNG BEI VERZÖGERTEM LADEN
// ============================================================================

// Verhindert Flackern beim Laden
(function() {
  'use strict';
  
  // Versuche sofortiges Laden (wenn DOM schon bereit)
  try {
    const savedTheme = localStorage.getItem('ms-theme');
    if (savedTheme === 'dark') {
      document.documentElement.style.setProperty('--initial-bg-color', '#1a1a1a');
      document.body.classList.add('dark-mode');
    }
  } catch (error) {
    // Ignoriere Fehler bei schnellem Laden
  }
})();
