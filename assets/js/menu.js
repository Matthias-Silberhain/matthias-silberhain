// ============================================================================
// FUNKTIONIERENDE MENU & PRELOADER JAVASCRIPT
// ============================================================================

(function() {
    'use strict';
    
    // ========================================================================
    // 1. PRELOADER MIT TYPEWRITER-EFFEKT
    // ========================================================================
    function initPreloader() {
        const preloader = document.getElementById("preloader");
        const typeText = document.getElementById("type-text");
        
        if (preloader && typeText) {
            console.log('⌨️ Preloader gefunden, starte Typewriter...');
            
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const speed = 90;
            const minTime = 2000;
            const startTime = Date.now();
            
            function typeWriter() {
                if (index < text.length) {
                    typeText.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Text vollständig - Cursor stoppen
                    const cursor = document.querySelector(".cursor");
                    if (cursor) {
                        cursor.style.animation = "none";
                        cursor.style.opacity = "0";
                    }
                    
                    // Mindest-Anzeigezeit berechnen
                    const elapsed = Date.now() - startTime;
                    const remaining = Math.max(0, minTime - elapsed);
                    
                    // Preloader nach Mindestzeit ausblenden
                    setTimeout(() => {
                        preloader.style.opacity = "0";
                        preloader.style.transition = "opacity 0.6s ease";
                        
                        setTimeout(() => {
                            preloader.style.display = "none";
                            console.log('✅ Preloader ausgeblendet');
                        }, 600);
                    }, remaining + 500);
                }
            }
            
            // Typewriter mit Verzögerung starten
            setTimeout(() => {
                typeWriter();
            }, 300);
            
        } else {
            console.warn('⚠️ Preloader-Elemente nicht gefunden');
            if (preloader) {
                preloader.style.display = "none";
            }
        }
    }
    
    // ========================================================================
    // 2. BURGER-MENÜ FUNKTIONALITÄT (KORRIGIERT)
    // ========================================================================
    function initMobileMenu() {
        const burgerButton = document.getElementById("burger");
        const navigation = document.getElementById("navigation");
        const menuOverlay = document.getElementById("menuOverlay");
        
        if (burgerButton && navigation) {
            console.log('🍔 Mobile Menu gefunden');
            
            let isMenuOpen = false;
            
            // Burger Button Click Event
            burgerButton.addEventListener("click", function(event) {
                event.stopPropagation();
                toggleMobileMenu();
            });
            
            // Overlay Click Event
            if (menuOverlay) {
                menuOverlay.addEventListener("click", function() {
                    if (isMenuOpen) {
                        closeMobileMenu();
                    }
                });
            }
            
            // Navigation Links Click Event
            const navLinks = navigation.querySelectorAll("a");
            navLinks.forEach(function(link) {
                link.addEventListener("click", function() {
                    if (window.innerWidth <= 768 && isMenuOpen) {
                        closeMobileMenu();
                    }
                });
            });
            
            // ESC Key Event
            document.addEventListener("keydown", function(event) {
                if (isMenuOpen && event.key === "Escape") {
                    closeMobileMenu();
                }
            });
            
            // Resize Event
            window.addEventListener("resize", function() {
                if (window.innerWidth > 768 && isMenuOpen) {
                    closeMobileMenu();
                }
            });
            
            // Toggle Menu Function
            function toggleMobileMenu() {
                isMenuOpen = !isMenuOpen;
                
                if (isMenuOpen) {
                    openMobileMenu();
                } else {
                    closeMobileMenu();
                }
            }
            
            // Open Menu Function
            function openMobileMenu() {
                navigation.classList.add("aktiv");
                burgerButton.classList.add("aktiv");
                document.body.style.overflow = "hidden";
                
                if (menuOverlay) {
                    menuOverlay.classList.add("active");
                }
                
                burgerButton.setAttribute("aria-expanded", "true");
                console.log('📱 Mobile Menu geöffnet');
            }
            
            // Close Menu Function
            function closeMobileMenu() {
                navigation.classList.remove("aktiv");
                burgerButton.classList.remove("aktiv");
                document.body.style.overflow = "";
                
                if (menuOverlay) {
                    menuOverlay.classList.remove("active");
                }
                
                burgerButton.setAttribute("aria-expanded", "false");
                isMenuOpen = false;
                console.log('📱 Mobile Menu geschlossen');
            }
            
            // Click outside to close
            document.addEventListener("click", function(event) {
                if (isMenuOpen && 
                    !navigation.contains(event.target) && 
                    !burgerButton.contains(event.target)) {
                    closeMobileMenu();
                }
            });
        } else {
            console.warn('⚠️ Mobile Menu Elemente nicht gefunden');
        }
    }
    
    // ========================================================================
    // 3. FOOTER JAHR AKTUALISIEREN
    // ========================================================================
    function updateFooterYear() {
        const yearElement = document.getElementById("jahr");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
            console.log('📅 Footer Jahr aktualisiert:', yearElement.textContent);
        }
    }
    
    // ========================================================================
    // 4. SMOOTH SCROLL FÜR INTERNE LINKS
    // ========================================================================
    function initSmoothScroll() {
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
                        
                        // Update URL
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        }
                    }
                }
            });
        });
    }
    
    // ========================================================================
    // 5. DARK MODE PRELOADER SYNC (EINFACHERE VERSION)
    // ========================================================================
    function initDarkModeSync() {
        const preloader = document.getElementById("preloader");
        
        if (preloader) {
            // Prüfe initialen Dark Mode
            if (document.documentElement.classList.contains('dark-mode')) {
                preloader.style.backgroundColor = '#1a1a1a';
            }
            
            // Beobachte Dark Mode Änderungen (einfache Methode)
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        if (document.documentElement.classList.contains('dark-mode')) {
                            preloader.style.backgroundColor = '#1a1a1a';
                        } else {
                            preloader.style.backgroundColor = '#000000';
                        }
                    }
                });
            });
            
            // Beobachte das html Element
            observer.observe(document.documentElement, { attributes: true });
        }
    }
    
    // ========================================================================
    // 6. HAUPTINITIALISIERUNG
    // ========================================================================
    function initAll() {
        console.log('🚀 Starte Initialisierung...');
        
        // 1. Preloader starten
        initPreloader();
        
        // 2. Mobile Menu initialisieren
        initMobileMenu();
        
        // 3. Footer Jahr aktualisieren
        updateFooterYear();
        
        // 4. Smooth Scroll initialisieren
        initSmoothScroll();
        
        // 5. Dark Mode Sync für Preloader
        initDarkModeSync();
        
        console.log('✅ Alle Funktionen initialisiert');
    }
    
    // ========================================================================
    // 7. INITIALISIERUNG STARTEN
    // ========================================================================
    
    // Warte auf DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        // DOM ist bereits geladen
        setTimeout(initAll, 100);
    }
    
    // ========================================================================
    // 8. WINDOW LOAD EVENT
    // ========================================================================
    window.addEventListener("load", function() {
        console.log("📦 Alle Ressourcen geladen");
    });
    
})();
