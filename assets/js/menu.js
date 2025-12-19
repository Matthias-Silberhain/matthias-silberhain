// ============================================================================
// EINFACHES MENU & PRELOADER - KORRIGIERT & FUNKTIONIERT
// ============================================================================

(function() {
    'use strict';
    
    console.log('📱 Menu & Preloader Script geladen');
    
    // 1. PRELOADER - KORRIGIERT (blockiert nichts)
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        console.log('⌨️ Initialisiere Preloader...');
        
        // Sofort sicherstellen, dass Preloader nicht blockiert
        if (preloader) {
            preloader.style.pointerEvents = 'none';
            preloader.style.zIndex = '9990';
        }
        
        if (!preloader || !typeText) {
            if (preloader) {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 600);
                }, 500);
            }
            console.log('⚠️ Preloader Elemente nicht vollständig gefunden');
            return;
        }
        
        const text = 'MATTHIAS SILBERHAIN';
        let index = 0;
        const speed = 90;
        const minTime = 1500;
        const startTime = Date.now();
        
        function typeWriter() {
            if (index < text.length) {
                typeText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            } else {
                // Text fertig - Cursor stoppen
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                }
                
                // Mindestzeit warten
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, minTime - elapsed);
                
                setTimeout(function() {
                    preloader.classList.add('hidden');
                    
                    setTimeout(function() {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                    }, 500);
                }, remaining);
            }
        }
        
        // Starte mit kleiner Verzögerung
        setTimeout(typeWriter, 300);
    }
    
    // 2. MOBILE MENU - KORRIGIERT & FUNKTIONIERT
    function initMobileMenu() {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('navigation');
        const overlay = document.getElementById('menuOverlay');
        
        console.log('🍔 Initialisiere Mobile Menu...');
        
        if (!burger || !nav) {
            console.log('⚠️ Menu Elemente nicht gefunden');
            return;
        }
        
        // Sicherstellen, dass Elemente klickbar sind
        burger.style.pointerEvents = 'auto';
        burger.style.cursor = 'pointer';
        burger.setAttribute('tabindex', '0');
        
        let isOpen = false;
        
        // Burger Click Event
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('📱 Burger geklickt, aktueller Zustand:', isOpen ? 'offen' : 'geschlossen');
            
            if (!isOpen) {
                // ÖFFNE MENU
                nav.classList.add('aktiv');
                burger.classList.add('aktiv');
                if (overlay) {
                    overlay.classList.add('active');
                    overlay.style.pointerEvents = 'auto';
                }
                document.body.style.overflow = 'hidden';
                isOpen = true;
                console.log('✅ Menu geöffnet');
            } else {
                // SCHLIEßE MENU
                nav.classList.remove('aktiv');
                burger.classList.remove('aktiv');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                isOpen = false;
                console.log('✅ Menu geschlossen');
            }
        });
        
        // Overlay Click Event
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isOpen) {
                    nav.classList.remove('aktiv');
                    burger.classList.remove('aktiv');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    isOpen = false;
                    console.log('✅ Menu via Overlay geschlossen');
                }
            });
        }
        
        // Nav Links Click Event
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
            link.addEventListener('click', function() {
                if (isOpen) {
                    nav.classList.remove('aktiv');
                    burger.classList.remove('aktiv');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    isOpen = false;
                    console.log('✅ Menu via Link geschlossen');
                }
            });
        });
        
        // ESC Key Event
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                nav.classList.remove('aktiv');
                burger.classList.remove('aktiv');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                isOpen = false;
                console.log('✅ Menu via ESC geschlossen');
            }
        });
        
        // Click außerhalb schließt Menu
        document.addEventListener('click', function(e) {
            if (isOpen && !nav.contains(e.target) && e.target !== burger) {
                nav.classList.remove('aktiv');
                burger.classList.remove('aktiv');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                isOpen = false;
            }
        });
    }
    
    // 3. FOOTER JAHR
    function updateFooterYear() {
        const year = document.getElementById('jahr');
        if (year) {
            year.textContent = new Date().getFullYear();
            console.log('📅 Footer Jahr aktualisiert:', year.textContent);
        }
    }
    
    // 4. HAUPTFUNKTION
    function initAll() {
        console.log('🚀 Starte Initialisierung...');
        
        try {
            // Footer Jahr zuerst (schnell)
            updateFooterYear();
            
            // Dann Mobile Menu (wichtig für Klickbarkeit)
            initMobileMenu();
            
            // Zuletzt Preloader (kann im Hintergrund laufen)
            setTimeout(initPreloader, 100);
            
            console.log('✅ Alles initialisiert');
        } catch (error) {
            console.error('❌ Fehler bei Initialisierung:', error);
        }
    }
    
    // 5. STARTE INITIALISIERUNG
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initAll, 100);
        });
    } else {
        // DOM bereits geladen
        setTimeout(initAll, 100);
    }
    
    // 6. GLOBALE FEHLERBEHANDLUNG
    window.addEventListener('error', function(e) {
        console.error('⚠️ Globaler Fehler:', e.message, 'in', e.filename, 'Zeile', e.lineno);
    });
    
})();
