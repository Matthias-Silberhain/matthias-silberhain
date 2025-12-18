// ============================================================================
// GLOBAL DARK MODE - FUNKTIONIERT AUF ALLEN SEITEN UND IN ALLEN BROWSERN
// ============================================================================

(function() {
  'use strict';
  
  // Prüfe ob localStorage verfügbar ist
  function isLocalStorageAvailable() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('⚠️ LocalStorage nicht verfügbar:', e.message);
      return false;
    }
  }
  
  // Theme auf Body anwenden
  function applyTheme(theme) {
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');
    
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      console.log('🌙 Dark Mode aktiviert');
    } else {
      body.classList.remove('dark-mode');
      console.log('☀️ Light Mode aktiviert');
    }
    
    // Toggle Button aktualisieren
    if (toggleButton) {
      const moonIcon = toggleButton.querySelector('.moon-icon');
      const sunIcon = toggleButton.querySelector('.sun-icon');
      
      if (moonIcon && sunIcon) {
        if (theme === 'dark') {
          moonIcon.style.display = 'none';
          sunIcon.style.display = 'block';
          toggleButton.setAttribute('aria-label', 'Zum Light Mode wechseln');
        } else {
          moonIcon.style.display = 'block';
          sunIcon.style.display = 'none';
          toggleButton.setAttribute('aria-label', 'Zum Dark Mode wechseln');
        }
      }
    }
  }
  
  // Dark Mode umschalten
  function toggleDarkMode() {
    const body = document.body;
    let newTheme;
    
    if (body.classList.contains('dark-mode')) {
      newTheme = 'light';
    } else {
      newTheme = 'dark';
    }
    
    // Theme anwenden
    applyTheme(newTheme);
    
    // In localStorage speichern
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem('ms-theme', newTheme);
      } catch (error) {
        console.warn('❌ Konnte Theme nicht speichern:', error);
      }
    }
    
    // Event für andere Scripts
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    
    return newTheme;
  }
  
  // Initialisierung
  function initGlobalDarkMode() {
    console.log('🌓 Global Dark Mode wird initialisiert...');
    
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) {
      console.warn('⚠️ Dark Mode Toggle nicht gefunden.');
      return;
    }
    
    // Lade gespeichertes Theme
    let currentTheme = 'light';
    
    if (isLocalStorageAvailable()) {
      try {
        const savedTheme = localStorage.getItem('ms-theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          currentTheme = savedTheme;
        }
      } catch (error) {
        console.warn('❌ Konnte Theme nicht laden:', error);
      }
    }
    
    console.log('🎨 Aktuelles Theme:', currentTheme);
    
    // Theme sofort anwenden (verhindert Flackern)
    applyTheme(currentTheme);
    
    // Event Listener
    darkModeToggle.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      toggleDarkMode();
    });
    
    // Touch Event für Mobile
    darkModeToggle.addEventListener('touchstart', function(event) {
      event.preventDefault();
      event.stopPropagation();
      toggleDarkMode();
    }, { passive: false });
    
    // Keyboard Event
    darkModeToggle.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDarkMode();
      }
    });
    
    console.log('✅ Dark Mode initialisiert');
  }
  
  // Starte Initialisierung
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalDarkMode);
  } else {
    initGlobalDarkMode();
  }
  
})();
