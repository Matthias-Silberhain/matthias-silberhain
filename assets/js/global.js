/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Version 4.0 - Ultra-konsistent für alle Browser
 */

// Warte bis DOM komplett geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebsite);
} else {
    // DOM ist bereits geladen
    initWebsite();
}

function initWebsite() {
    console.log('🚀 Global.js geladen - Starte konsistente Initialisierung');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    
    // ================= INITIALE VORBEREITUNG =================
    console.log('📱 Browser erkannt:', detectBrowser());
    console.log('📱 Gerät erkannt:', isMobile() ? 'Mobile' : 'Desktop');
    
    // Setze initiale Body-Klasse für CSS-Variablen Unterstützung
    if (supportsCssVariables()) {
        body.classList.add('css-variables');
    }
    
    // Verstecke nur die Inhaltselemente für die Animation
    const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
    contentElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // ================= PRELOADER LOGIK =================
    if (preloader) {
        console.log('⚡ Starte konsistenten Preloader');
        
        // Stelle sicher dass Preloader sichtbar ist
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        // Starte Typewriter und Line GLEICHZEITIG
        setTimeout(() => {
            // Starte beide Animationen parallel
            const typewriterPromise = startTypewriter();
            const linePromise = startSilverLine();
            
            // Warte bis BEIDE Animationen fertig sind
            Promise.all([typewriterPromise, linePromise])
                .then(() => {
                    console.log('✅ Beide Animationen fertig - Zeige Seite');
                    hidePreloader();
                })
                .catch(error => {
                    console.warn('⚠️ Animationen fehlgeschlagen:', error);
                    // Fallback: Trotzdem Seite zeigen
                    setTimeout(hidePreloader, 1500);
                });
        }, 300);
    } else {
        console.log('Kein Preloader - Mache Inhalt sofort sichtbar');
        makeContentVisible();
    }
    
    // ================= TYPEWRITER FUNKTION (mit Promise) =================
    function startTypewriter() {
        return new Promise((resolve) => {
            if (!typeTextElement) {
                console.log('Kein Typewriter-Element - überspringe');
                resolve();
                return;
            }
            
            console.log('⌨️ Starte Typewriter...');
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const typingSpeed = isMobile() ? 60 : 70;
            
            // Lösche vorhandenen Text
            typeTextElement.textContent = '';
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    
                    // Starte silberne Line, wenn Typewriter halb fertig ist
                    if (index === Math.floor(text.length / 2)) {
                        console.log('🔸 Typewriter halb fertig - starte Line');
                        startSilverLine();
                    }
                    
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    console.log('✅ Typewriter fertig');
                    resolve();
                }
            }
            
            // Sofort starten
            typeWriter();
        });
    }
    
    // ================= SILBERNE LINE FUNKTION (mit Promise) =================
    function startSilverLine() {
        return new Promise((resolve) => {
            if (!preloaderLine) {
                console.warn('⚠️ Keine Preloader Line - überspringe');
                resolve();
                return;
            }
            
            // Prüfe ob Line bereits aktiv ist
            if (preloaderLine.classList.contains('active')) {
                console.log('🔸 Line bereits aktiv - warte auf Fertigstellung');
                setTimeout(resolve, 2000);
                return;
            }
            
            console.log('⚡ Starte silberne Line...');
            preloaderLine.classList.add('active');
            
            // Für Browser die CSS Animationen nicht unterstützen
            if (!supportsCssAnimations()) {
                console.log('⚠️ CSS Animationen nicht unterstützt - verwende JavaScript Animation');
                animateLineWithJS();
                setTimeout(resolve, 2000);
                return;
            }
            
            // Line-Animation dauert 2 Sekunden
            setTimeout(() => {
                console.log('✅ Line Animation fertig');
                resolve();
            }, 2000);
        });
    }
    
    // JavaScript Fallback für Line Animation
    function animateLineWithJS() {
        let width = 0;
        const maxWidth = 300;
        const duration = 2000;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            width = maxWidth * easeProgress;
            const opacity = progress < 0.2 ? progress * 5 : 
                          progress > 0.8 ? (1 - progress) * 5 : 1;
            
            preloaderLine.style.width = width + 'px';
            preloaderLine.style.opacity = opacity.toString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // ================= PRELOADER AUSBLENDEN =================
    function hidePreloader() {
        console.log('🎬 Blende Preloader aus...');
        
        // Sofort: Preloader ausblenden
        preloader.classList.add('loaded');
        body.classList.add('loaded');
        
        // Sehr kurze Verzögerung, dann komplett verstecken
        setTimeout(() => {
            preloader.style.display = 'none';
            console.log('✅ Preloader versteckt');
            
            // Inhalt SOFORT sichtbar machen
            makeContentVisible();
        }, 300);
    }
    
    // ================= INHALT SICHTBAR MACHEN =================
    function makeContentVisible() {
        console.log('🌟 Mache Inhalt sichtbar...');
        
        // Alle Inhaltselemente SOFORT sichtbar machen
        const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Entferne Scroll-Sperre
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = '100%';
        body.style.height = 'auto';
        
        console.log('✅ Inhalt sichtbar gemacht');
    }
    
    // ================= HELFER FUNKTIONEN =================
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768);
    }
    
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
        if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) return 'Safari';
        if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
        if (userAgent.indexOf('Edge') > -1) return 'Edge';
        if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) return 'Internet Explorer';
        return 'Unknown';
    }
    
    function supportsCssVariables() {
        return window.CSS && CSS.supports && CSS.supports('color', 'var(--test)');
    }
    
    function supportsCssAnimations() {
        return 'animation' in document.body.style ||
               'webkitAnimation' in document.body.style;
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // ================= SICHERHEITS-TIMEOUT =================
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('⏰ Sicherheits-Timeout: Erzwinge Seitenanzeige');
            if (preloader) {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    makeContentVisible();
                }, 300);
            }
        }
    }, 5000);
    
    // ================= AKTUELLES JAHR IM FOOTER =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================= SCROLL EVENT FÜR MENÜ-HINTERGRUND =================
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 50 || window.scrollY > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        }, 10);
    }, { passive: true });
    
    // ================= SMOOTH SCROLLING =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Schließe Mobile Menu wenn offen
                    const burger = document.getElementById('burgerButton');
                    const nav = document.getElementById('mainNav');
                    const overlay = document.querySelector('.menu-overlay');
                    
                    if (burger && nav && burger.classList.contains('aktiv')) {
                        burger.classList.remove('aktiv');
                        nav.classList.remove('aktiv');
                        if (overlay) overlay.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    
                    // Berechne Scroll-Position
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Smooth Scroll mit Fallback
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback für alte Browser
                        window.scrollTo(0, offsetPosition);
                    }
                }
            }
        });
    });
    
    // ================= ACTIVE NAV LINK HIGHLIGHT =================
    function highlightActiveNavLink() {
        const navLinks = document.querySelectorAll('.hauptnavigation a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    highlightActiveNavLink();
    window.addEventListener('hashchange', highlightActiveNavLink);
    
    console.log('✅ Global.js erfolgreich initialisiert für', detectBrowser());
}

// ================= GLOBALE HELFER FUNKTIONEN =================
function debugForceShowContent() {
    console.log('🔧 DEBUG: Erzwinge Inhaltsanzeige');
    document.body.classList.add('loaded');
    document.querySelectorAll('.inhalt, .social-section, .footer').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
}

// Export für Module (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debugForceShowContent };
}
