// ============================================================================
// EINFACHES MENU & PRELOADER
// ============================================================================

(function() {
    'use strict';
    
    console.log('📱 Menu & Preloader Script geladen');
    
    // 1. PRELOADER
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        
        if (!preloader || !typeText) {
            if (preloader) preloader.style.display = 'none';
            return;
        }
        
        console.log('⌨️ Starte Typewriter...');
        
        const text = 'MATTHIAS SILBERHAIN';
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
                    preloader.style.opacity = '0';
                    preloader.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(function() {
                        preloader.style.display = 'none';
                        console.log('✅ Preloader ausgeblendet');
                    }, 500);
                }, remaining + 500);
            }
        }
        
        // Starte mit Verzögerung
        setTimeout(typeWriter, 300);
    }
    
    // 2. MOBILE MENU
    function initMobileMenu() {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('navigation');
        const overlay = document.getElementById('menuOverlay');
        
        if (!burger || !nav) {
            console.log('⚠️ Menu Elemente nicht gefunden');
            return;
        }
        
        console.log('🍔 Initialisiere Mobile Menu');
        
        let isOpen = false;
        
        // Burger Click Event
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (!isOpen) {
                // ÖFFNE MENU
                nav.classList.add('aktiv');
                burger.classList.add('aktiv');
                if (overlay) overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                isOpen = true;
                console.log('📱 Menu geöffnet');
            } else {
                // SCHLIEßE MENU
                nav.classList.remove('aktiv');
                burger.classList.remove('aktiv');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                isOpen = false;
                console.log('📱 Menu geschlossen');
            }
        });
        
        // Overlay Click Event
        if (overlay) {
            overlay.addEventListener('click', function() {
                if (isOpen) {
                    nav.classList.remove('aktiv');
                    burger.classList.remove('aktiv');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    isOpen = false;
                }
            });
        }
        
        // Nav Links Click Event
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (isOpen) {
                    nav.classList.remove('aktiv');
                    burger.classList.remove('aktiv');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    isOpen = false;
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
            }
        });
    }
    
    // 3. FOOTER JAHR
    function updateFooterYear() {
        const year = document.getElementById('jahr');
        if (year) {
            year.textContent = new Date().getFullYear();
        }
    }
    
    // 4. HAUPTFUNKTION
    function initAll() {
        console.log('🚀 Starte Initialisierung...');
        
        // Preloader
        initPreloader();
        
        // Mobile Menu
        initMobileMenu();
        
        // Footer Jahr
        updateFooterYear();
        
        console.log('✅ Alles initialisiert');
    }
    
    // 5. STARTE INITIALISIERUNG
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        // DOM bereits geladen
        setTimeout(initAll, 100);
    }
    
})();
