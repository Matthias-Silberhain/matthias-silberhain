/* ==========================================================================
   MENU.JS - MOBILE NAVIGATION & DARK MODE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ menu.js gestartet');
    
    // ================= ELEMENTE DEFINIEREN =================
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    const menuOverlay = document.getElementById('menuOverlay');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // ================= MOBILE MENÜ FUNKTIONALITÄT =================
    if (burger && navigation) {
        console.log('✅ Navigation Elemente gefunden');
        
        // Menü öffnen/schließen
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isActive = burger.classList.toggle('aktiv');
            navigation.classList.toggle('aktiv');
            
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
            
            // Scrollen verhindern/erlauben
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            console.log(isActive ? '✅ Menü geöffnet' : '✅ Menü geschlossen');
        });
        
        // Menü schließen bei Klick auf Overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                this.classList.remove('active');
                document.body.style.overflow = '';
                console.log('✅ Menü via Overlay geschlossen');
            });
        }
        
        // Menü schließen bei Klick auf Navigation-Links
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    burger.classList.remove('aktiv');
                    navigation.classList.remove('aktiv');
                    if (menuOverlay) {
                        menuOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                    console.log('✅ Menü via Link geschlossen');
                }, 300);
            });
        });
        
        // Menü schließen bei ESC-Taste
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('aktiv')) {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('✅ Menü via ESC geschlossen');
            }
        });
        
        // Menü schließen bei Fenster-Resize (zu Desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navigation.classList.contains('aktiv')) {
                burger.classList.remove('aktiv');
                navigation.classList.remove('aktiv');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('✅ Menü via Resize geschlossen');
            }
        });
    } else {
        console.warn('⚠️ Navigation Elemente nicht gefunden');
    }
    
    // ================= DARK MODE FUNKTIONALITÄT =================
    if (darkModeToggle) {
        console.log('✅ Dark Mode Toggle gefunden');
        
        // Theme aus LocalStorage lesen
        function getCurrentTheme() {
            try {
                const savedTheme = localStorage.getItem('silberhain-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                return savedTheme || (prefersDark ? 'dark' : 'light');
            } catch (e) {
                return 'light';
            }
        }
        
        // Theme anwenden
        function applyTheme(theme) {
            const isDark = theme === 'dark';
            
            if (isDark) {
                body.classList.add('dark-mode');
                document.documentElement.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
                document.documentElement.classList.remove('dark-mode');
            }
            
            // In LocalStorage speichern
            try {
                localStorage.setItem('silberhain-theme', theme);
            } catch (e) {
                console.warn('LocalStorage nicht verfügbar');
            }
            
            console.log('✅ Theme angewendet:', theme);
            return isDark;
        }
        
        // Initiales Theme setzen
        const currentTheme = getCurrentTheme();
        const isDarkMode = applyTheme(currentTheme);
        console.log('✅ Initiales Theme:', currentTheme, 'Dark Mode:', isDarkMode);
        
        // Dark Mode Toggle Event
        darkModeToggle.addEventListener('click', function() {
            const isCurrentlyDark = body.classList.contains('dark-mode');
            const newTheme = isCurrentlyDark ? 'light' : 'dark';
            
            applyTheme(newTheme);
            this.blur(); // Button Focus entfernen
            
            console.log('✅ Dark Mode geändert zu:', newTheme);
        });
        
        // System Theme Änderungen überwachen
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            if (!localStorage.getItem('silberhain-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
                console.log('✅ System Theme geändert:', e.matches ? 'dark' : 'light');
            }
        });
    } else {
        console.warn('⚠️ Dark Mode Toggle nicht gefunden');
    }
    
    // ================= ACTIVE LINK HIGHLIGHTING =================
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.hauptnavigation a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
        
        console.log('✅ Aktive Links gesetzt für:', currentPage);
    }
    
    // Initial setzen
    setActiveLink();
    
    // ================= PRELOADER FUNKTIONALITÄT =================
    function handlePreloader() {
        const preloader = document.getElementById('preloader');
        
        if (preloader) {
            // Preloader nach 1.5 Sekunden ausblenden
            setTimeout(() => {
                preloader.classList.add('hidden');
                
                // Preloader nach Animation komplett entfernen
                setTimeout(() => {
                    preloader.style.display = 'none';
                    console.log('✅ Preloader entfernt');
                }, 600);
            }, 1500);
        }
    }
    
    // Preloader starten (mit Verzögerung für globale.js)
    setTimeout(handlePreloader, 500);
    
    // ================= TOUCH DEVICE OPTIMIERUNGEN =================
    // Verhindert Doppel-Tap-Zoom auf iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    console.log('✅ menu.js erfolgreich geladen');
    
    // ================= EXPORT FÜR DEBUGGING =================
    window.MenuManager = {
        toggleMenu: function() {
            if (burger) burger.click();
        },
        toggleDarkMode: function() {
            if (darkModeToggle) darkModeToggle.click();
        },
        isMenuOpen: function() {
            return burger ? burger.classList.contains('aktiv') : false;
        },
        isDarkMode: function() {
            return body.classList.contains('dark-mode');
        }
    };
});
