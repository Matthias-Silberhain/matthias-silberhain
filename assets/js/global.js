/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Version 4.2 - Nur Preloader, kein Dark Mode
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Global.js geladen - Nur Preloader-Funktionen');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    
    // ================= INITIALE VORBEREITUNG =================
    console.log('📱 Gerät erkannt:', isMobile() ? 'Mobile' : 'Desktop');
    
    // Verstecke nur die Inhaltselemente für die Animation
    const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
    contentElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // ================= PRELOADER LOGIK =================
    if (preloader) {
        console.log('⚡ Starte optimierten Preloader');
        
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
    
    // ================= TYPEWRITER FUNKTION =================
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
            
            typeWriter();
        });
    }
    
    // ================= SILBERNE LINE FUNKTION =================
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
            
            // Line-Animation dauert 2 Sekunden
            setTimeout(() => {
                console.log('✅ Line Animation fertig');
                resolve();
            }, 2000);
        });
    }
    
    // ================= PRELOADER AUSBLENDEN =================
    function hidePreloader() {
        console.log('🎬 Blende Preloader aus...');
        
        // Sofort: Preloader ausblenden
        preloader.classList.add('loaded');
        body.classList.add('loaded');
        
        // Verzögerung, dann komplett verstecken
        setTimeout(() => {
            preloader.style.display = 'none';
            console.log('✅ Preloader versteckt');
            
            // Inhalt sichtbar machen
            makeContentVisible();
        }, 400);
    }
    
    // ================= INHALT SICHTBAR MACHEN =================
    function makeContentVisible() {
        console.log('🌟 Mache Inhalt sichtbar...');
        
        // Alle Inhaltselemente sichtbar machen
        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Entferne Scroll-Sperre
        body.style.overflow = 'auto';
        body.style.position = 'static';
        
        console.log('✅ Inhalt sichtbar gemacht');
    }
    
    // ================= MOBILE DETECTION =================
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768);
    }
    
    // ================= SICHERHEITS-TIMEOUT =================
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('⏰ Sicherheits-Timeout: Erzwinge Seitenanzeige');
            hidePreloader();
        }
    }, 6000); // 6 Sekunden Timeout
    
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
            if (window.pageYOffset > 50) {
                body.classList.add('scrolled');
            } else {
                body.classList.remove('scrolled');
            }
        }, 10);
    });
    
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
                    
                    if (burger && nav && burger.classList.contains('aktiv')) {
                        toggleMenu();
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('✅ Global.js erfolgreich initialisiert (ohne Dark Mode)');
});

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

// Global toggleMenu Funktion für Smooth Scrolling
function toggleMenu() {
    const burger = document.getElementById('burgerButton');
    const nav = document.getElementById('mainNav');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (burger && nav) {
        burger.classList.toggle('aktiv');
        nav.classList.toggle('aktiv');
        
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
        
        document.body.classList.toggle('menu-open');
    }
}
