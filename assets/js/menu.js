// ============================================================================
// MATTHIAS SILBERHAIN - HAUPT JAVASCRIPT
// ============================================================================

// Warten bis DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
  
  // ========================================================================
  // PRELOADER MIT TYPEWRITER-EFFEKT
  // ========================================================================
  initializePreloader();
  
  // ========================================================================
  // BURGER-MENÜ FUNKTIONALITÄT
  // ========================================================================
  initializeNavigation();
  
  // ========================================================================
  // FOOTER JAHR AKTUALISIEREN
  // ========================================================================
  updateFooterYear();
  
  // ========================================================================
  // SMOOTH SCROLL FÜR INTERNE LINKS
  // ========================================================================
  initializeSmoothScroll();
  
  // ========================================================================
  // PERFORMANCE OPTIMIERUNGEN
  // ========================================================================
  initializePerformanceOptimizations();
  
  // ========================================================================
  // INITIALISIERUNGS-LOG
  // ========================================================================
  console.log("Matthias Silberhain Website erfolgreich geladen");
});

// ========================================================================
// HAUPTFUNKTIONEN
// ========================================================================

function initializePreloader() {
  const preloader = document.getElementById("preloader");
  const typeText = document.getElementById("type-text");
  const cursor = document.querySelector(".cursor");
  
  // Prüfen ob Preloader-Elemente existieren
  if (!preloader || !typeText || !cursor) {
    console.warn("Preloader-Elemente nicht gefunden - Preloader übersprungen");
    if (preloader) preloader.style.display = "none";
    return;
  }
  
  const text = "MATTHIAS SILBERHAIN";
  let charIndex = 0;
  const typingSpeed = 90;
  const minDisplayTime = 2000;
  
  // Startzeit speichern für Mindest-Anzeigezeit
  const startTime = Date.now();
  
  // Typewriter-Funktion
  function typeWriter() {
    if (charIndex < text.length) {
      // Zeichen für Zeichen hinzufügen
      typeText.textContent += text.charAt(charIndex);
      charIndex++;
      
      // Nächstes Zeichen mit Verzögerung
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Text vollständig - Cursor stoppen
      cursor.style.animation = "none";
      cursor.style.opacity = "0";
      
      // Mindest-Anzeigezeit berechnen
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      // Preloader nach Mindestzeit ausblenden
      setTimeout(function() {
        // Sanftes Ausblenden
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.6s ease";
        
        // Nach Fade-Out komplett entfernen
        setTimeout(function() {
          preloader.style.display = "none";
          
          // Event für andere Scripts
          window.dispatchEvent(new CustomEvent("preloaderComplete"));
        }, 600);
        
      }, remainingTime + 500); // +500ms Pause nach Textende
    }
  }
  
  // Typewriter mit kurzer Verzögerung starten
  setTimeout(typeWriter, 400);
}

function initializeNavigation() {
  const burgerButton = document.getElementById("burger");
  const navigation = document.getElementById("navigation");
  
  // Prüfen ob Navigationselemente existieren
  if (!burgerButton || !navigation) {
    console.warn("Navigation-Elemente nicht gefunden - Menüfunktion deaktiviert");
    return;
  }
  
  let isMenuOpen = false;
  
  // Burger-Menü Toggle
  burgerButton.addEventListener("click", function(event) {
    event.stopPropagation();
    
    isMenuOpen = !isMenuOpen;
    
    // Navigation ein-/ausblenden
    navigation.classList.toggle("aktiv");
    
    // Burger-Animation
    const spans = burgerButton.querySelectorAll("span");
    if (isMenuOpen) {
      // Menü geöffnet - X-Form
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
      
      // Body-Scroll sperren
      document.body.style.overflow = "hidden";
      
      // ARIA-Attribute aktualisieren
      burgerButton.setAttribute("aria-expanded", "true");
      burgerButton.setAttribute("aria-label", "Menü schließen");
    } else {
      // Menü geschlossen - Burger-Form
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
      
      // Body-Scroll freigeben
      document.body.style.overflow = "";
      
      // ARIA-Attribute aktualisieren
      burgerButton.setAttribute("aria-expanded", "false");
      burgerButton.setAttribute("aria-label", "Menü öffnen");
    }
  });
  
  // Menü schließen bei Klick auf Nav-Link
  const navLinks = navigation.querySelectorAll("a");
  navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      if (window.innerWidth <= 768 && isMenuOpen) {
        closeMobileMenu();
      }
    });
  });
  
  // Menü schließen bei Klick außerhalb
  document.addEventListener("click", function(event) {
    if (isMenuOpen && 
        !navigation.contains(event.target) && 
        !burgerButton.contains(event.target)) {
      closeMobileMenu();
    }
  });
  
  // Menü schließen mit ESC-Taste
  document.addEventListener("keydown", function(event) {
    if (isMenuOpen && event.key === "Escape") {
      closeMobileMenu();
    }
  });
  
  // Menü automatisch schließen bei Resize zu Desktop
  window.addEventListener("resize", function() {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Hilfsfunktion zum Schließen des Mobilmenüs
  function closeMobileMenu() {
    navigation.classList.remove("aktiv");
    
    // Burger zurücksetzen
    const spans = burgerButton.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
    
    isMenuOpen = false;
    burgerButton.setAttribute("aria-expanded", "false");
    burgerButton.setAttribute("aria-label", "Menü öffnen");
    document.body.style.overflow = "";
  }
}

function updateFooterYear() {
  const yearElement = document.getElementById("jahr");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initializeSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      const targetId = this.getAttribute("href");
      
      // Nur interne Links verarbeiten (nicht # allein)
      if (targetId !== "#" && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          event.preventDefault();
          
          // Header-Höhe berücksichtigen
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          // Smooth Scroll
          window.scrollTo({
            top: targetPosition - headerHeight - 20,
            behavior: "smooth"
          });
          
          // URL ohne Seitenwechsel aktualisieren
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      }
    });
  });
}

function initializePerformanceOptimizations() {
  // Font Loading Optimierung
  if ("fonts" in document) {
    document.fonts.ready.then(function() {
      document.documentElement.classList.add("fonts-loaded");
    }).catch(function(error) {
      console.log("Font Loading Optimierung fehlgeschlagen:", error);
    });
  }
  
  // Resize Debounce für Performance
  let resizeTimeout;
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Resize-abhängige Funktionen hier
    }, 250);
  });
  
  // Fehlerbehandlung
  window.addEventListener("error", function(event) {
    console.error("JavaScript Fehler:", event.error);
  });
  
  window.addEventListener("unhandledrejection", function(event) {
    console.error("Unbehandelte Promise-Ablehnung:", event.reason);
  });
}

// ============================================================================
// WINDOW LOAD EVENT (NACH ALLEN RESSOURCEN)
// ============================================================================
window.addEventListener("load", function() {
  console.log("Alle Ressourcen geladen");
  
  // Service Worker Registrierung (optional für PWA)
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    navigator.serviceWorker.register("/service-worker.js")
      .then(function(registration) {
        console.log("ServiceWorker registriert:", registration.scope);
      })
      .catch(function(error) {
        console.log("ServiceWorker Registrierung fehlgeschlagen:", error);
      });
  }
});
