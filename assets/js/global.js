/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Zentrale Funktionen für alle Seiten
 * Version 2.4 - Korrigierter Preloader mit silberner Line
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Matthias Silberhain');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // ================= PRELOADER ANIMATION =================
    if (preloader) {
        console.log('Preloader gefunden, starte Animation...');
        
        // Preloader sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        // 1. Typewriter starten
        if (typeTextElement) {
            console.log('Starte Typewriter...');
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const typingSpeed = 80; // ms pro Buchstabe
            
            // Typewriter Funktion
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Typewriter fertig - silberne Line starten
                    console.log('Typewriter fertig, starte silberne Line...');
                    startSilverLine();
                }
            }
            
            // Starte Typewriter nach kurzer Verzögerung
            setTimeout(() => {
                typeTextElement.textContent = ''; // Clear
                typeWriter();
            }, 500);
        } else {
            // Kein Typewriter - direkt Line starten
            console.log('Kein Typewriter, starte direkt silberne Line...');
            setTimeout(startSilverLine, 1000);
        }
        
        // SILBERNE LINE FUNKTION
        function startSilverLine() {
            console.log('Starte silberne Line Animation...');
            
            if (preloaderLine) {
                console.log('Preloader Line gefunden, aktiviere...');
                preloaderLine.classList.add('active');
                
                // Nach der Line-Animation Preloader ausblenden
                setTimeout(() => {
                    console.log('Blende Preloader aus...');
                    hidePreloader();
                }, 2500); // Dauer der Line-Animation
            } else {
                console.warn('Preloader Line nicht gefunden!');
                // Fallback ohne Line
                setTimeout(() => {
                    hidePreloader();
                }, 2000);
            }
        }
        
        // PRELOADER AUSBLENDEN FUNKTION
        function hidePreloader() {
            console.log('Verstecke Preloader...');
            
            // 1. Preloader ausblenden
            preloader.classList.add('loaded');
            
            // 2. Body klasse für CSS Transitions
            body.classList.add('loaded');
            
            // 3. Nach Fade-Out Preloader komplett entfernen
            setTimeout(() => {
                preloader.style.display = 'none';
                console.log('Preloader komplett versteckt');
                
                // 4. Inhalt sichtbar machen
                makeContentVisible();
            }, 600);
        }
        
        // INHALT SICHTBAR MACHEN
        function makeContentVisible() {
            console.log('Mache Inhalt sichtbar...');
            
            // Header und Hauptinhalt sichtbar machen
            const header = document.querySelector('.header');
            const mainContent = document.querySelector('.inhalt');
            const socialSection = document.querySelector('.social-section');
            const footer = document.querySelector('.footer');
            
            if (header) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
            
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                mainContent.style.transition = 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s';
            }
            
            if (socialSection) {
                socialSection.style.opacity = '1';
                socialSection.style.transform = 'translateY(0)';
                socialSection.style.transition = 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s';
            }
            
            if (footer) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
                footer.style.transition = 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s';
            }
            
            console.log('Inhalt sichtbar gemacht');
        }
        
        // SICHERHEITS-TIMEOUT (max. 8 Sekunden)
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('loaded')) {
                console.warn('Sicherheits-Timeout: Erzwinge Preloader-Ausblendung');
                hidePreloader();
            }
        }, 8000);
        
    } else {
        console.log('Kein Preloader gefunden, mache Inhalt sofort sichtbar');
        body.classList.add('loaded');
        makeContentVisible();
    }
    
    // ================= AKTUELLES JAHR IM FOOTER =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================= SCROLL EVENT FÜR MENÜ-HINTERGRUND =================
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
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
                    const overlay = document.querySelector('.menu-overlay');
                    
                    if (burger && nav && burger.classList.contains('aktiv')) {
                        burger.classList.remove('aktiv');
                        nav.classList.remove('aktiv');
                        if (overlay) overlay.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
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
    
    console.log(`✅ Global.js initialisiert für: ${currentPage}`);
});

// ================= INITIAL CSS FÜR INHALT =================
// Fügt initiale CSS für Fade-In Effekt hinzu
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'loading') {
        // Verstecke Inhalt während Preloader läuft
        const style = document.createElement('style');
        style.textContent = `
            .header,
            .inhalt,
            .social-section,
            .footer {
                opacity: 0;
                transform: translateY(20px);
            }
            
            body.loaded .header,
            body.loaded .inhalt,
            body.loaded .social-section,
            body.loaded .footer {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Preloader Position Fix */
            #preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000000;
                z-index: 9999;
            }
        `;
        document.head.appendChild(style);
    }
});
