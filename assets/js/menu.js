// ============================================================================
// MATTHIAS SILBERHAIN - MENU & PRELOADER JAVASCRIPT
// ============================================================================

(function() {
  'use strict';
  
  function initMenuAndPreloader() {
    console.log('🚀 Menu & Preloader initialisiert');
    
    // ========================================================================
    // PRELOADER MIT TYPEWRITER-EFFEKT
    // ========================================================================
    const preloader = document.getElementById("preloader");
    const typeText = document.getElementById("type-text");
    const cursor = document.querySelector(".cursor");
    
    if (preloader && typeText && cursor) {
      console.log('⌨️ Preloader gefunden, starte Typewriter...');
      
      const text = "MATTHIAS SILBERHAIN";
      let charIndex = 0;
      const typingSpeed = 90;
      const minDisplayTime = 2000;
      const startTime = Date.now();
      
      function typeWriter() {
        if (charIndex < text.length) {
          typeText.textContent += text.charAt(charIndex);
          charIndex++;
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
            preloader.style.opacity = "0";
            preloader.style.transition = "opacity 0.6s ease";
            
            setTimeout(function() {
              preloader.style.display = "none";
              window.dispatchEvent(new CustomEvent("preloaderComplete"));
              console.log('✅ Preloader ausgeblendet');
            }, 600);
          }, remainingTime + 500);
        }
      }
      
      // Typewriter mit Verzögerung starten
      setTimeout(function() {
        // Preloader für Dark Mode anpassen
        updatePreloaderForDarkMode();
        typeWriter();
      }, 500);
      
    } else {
      console.warn('⚠️ Preloader-Elemente nicht gefunden');
      if (preloader) {
        preloader.style.display = "none";
      }
    }
    
    // ========================================================================
    // BURGER-MENÜ FUNKTIONALITÄT
    // ========================================================================
    const burgerButton = document.getElementById("burger");
    const navigation = document.getElementById("navigation");
    
    if (burgerButton && navigation) {
      let isMenuOpen = false;
      
      burgerButton.addEventListener("click", function(event) {
        event.stopPropagation();
        isMenuOpen = !isMenuOpen;
        navigation.classList.toggle("aktiv");
        
        const spans = burgerButton.querySelectorAll("span");
        if (isMenuOpen) {
          spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
          document.body.style.overflow = "hidden";
        } else {
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
          document.body.style.overflow = "";
        }
        
        burgerButton.setAttribute("aria-expanded", isMenuOpen);
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
      
      // Menü schließen mit ESC
      document.addEventListener("keydown", function(event) {
        if (isMenuOpen && event.key === "Escape") {
          closeMobileMenu();
        }
      });
      
      // Menü schließen bei Resize zu Desktop
      window.addEventListener("resize", function() {
        if (window.innerWidth > 768 && isMenuOpen) {
          closeMobileMenu();
        }
      });
      
      function closeMobileMenu() {
        navigation.classList.remove("aktiv");
        const spans = burgerButton.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
        isMenuOpen = false;
        burgerButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    }
    
    // ========================================================================
    // FOOTER JAHR AKTUALISIEREN
    // ========================================================================
    const yearElement = document.getElementById("jahr");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    
    // ========================================================================
    // SMOOTH SCROLL FÜR INTERNE LINKS
    // ========================================================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function(link) {
      link.addEventListener("click", function(event) {
        const targetId = this.getAttribute("href");
        if (targetId !== "#" && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            event.preventDefault();
            const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: targetPosition - headerHeight - 20,
              behavior: "smooth"
            });
            if (history.pushState) {
              history.pushState(null, null, targetId);
            }
          }
        }
      });
    });
    
    // ========================================================================
    // DARK MODE PRELOADER FIX
    // ========================================================================
    function updatePreloaderForDarkMode() {
      const preloader = document.getElementById("preloader");
      if (preloader && document.body.classList.contains('dark-mode')) {
        preloader.style.backgroundColor = '#1a1a1a';
      } else if (preloader) {
        preloader.style.backgroundColor = '#000000';
      }
    }
    
    // Initial anwenden
    updatePreloaderForDarkMode();
    
    // Überwache Dark Mode Änderungen
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && mutation.target === document.body) {
          updatePreloaderForDarkMode();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Event Listener für Dark Mode Änderungen
    window.addEventListener('themeChanged', updatePreloaderForDarkMode);
    
    console.log('✅ Menu & Preloader Script vollständig geladen');
  }
  
  // ========================================================================
  // INITIALISIERUNG
  // ========================================================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuAndPreloader);
  } else {
    initMenuAndPreloader();
  }
  
  // Fehlerbehandlung
  window.addEventListener("error", function(event) {
    if (event.message && (event.message.includes('preloader') || event.message.includes('menu'))) {
      console.error("Menu/Preloader Fehler:", event.error);
    }
  });
  
})();

// ============================================================================
// WINDOW LOAD EVENT
// ============================================================================
window.addEventListener("load", function() {
  console.log("📦 Alle Ressourcen geladen");
});
