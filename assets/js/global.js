/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Version 3.0 - Vollständig korrigierte Preloader-Logik
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Starte Initialisierung');
    
    // ================= VARIABLEN =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    const body = document.body;
    
    // ================= INITIALE VORBEREITUNG =================
    // Verstecke Inhalt initial
    const contentElements = document.querySelectorAll('.inhalt, .social-section, .footer');
    contentElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Logo verstecken (nur für Animation)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
    }
    
    // ================= PRELOADER LOGIK =================
    if (preloader) {
        console.log('Preloader gefunden - Starte Animation');
        
        // Stelle sicher dass Preloader sichtbar ist
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.classList.remove('loaded');
        
        // Typewriter starten
        if (typeTextElement) {
            console.log('Starte Typewriter-Effekt...');
            const text = "MATTHIAS SILBERHAIN";
            let index = 0;
            const typingSpeed = 80; // ms pro Buchstabe
            
            // Lösche vorhandenen Text
            typeTextElement.textContent = '';
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    console.log('Typewriter fertig - Starte silberne Line');
                    // Verzögerung vor Line-Animation
                    setTimeout(startSilverLine, 500);
                }
            }
            
            // Starte Typewriter nach kurzer Verzögerung
            setTimeout(() => {
                typeWriter();
            }, 300);
        } else {
            console.log('Kein Typewriter-Element - Starte direkt Line');
            setTimeout(startSilverLine, 1000);
        }
    } else {
        console.log('Kein Preloader - Mache Inhalt sofort sichtbar');
        body.classList.add('loaded');
        makeContentVisible();
    }
    
    // ================= SILBERNE LINE FUNKTION =================
    function startSilverLine() {
        console.log('Starte silberne Line Animation...');
        
        if (preloaderLine) {
            console.log('Preloader Line gefunden, aktiviere Animation');
            preloaderLine.classList.add('active');
            
            // Nach der Line-Animation Preloader ausblenden
            setTimeout(() => {
                console.log('Line Animation fertig - Blende Preloader aus');
                hidePreloader();
            }, 2500); // Dauer der Line-Animation
        } else {
            console.warn('Preloader Line nicht gefunden - Überspringe');
            setTimeout(hidePreloader, 2000);
        }
    }
    
    // ================= PRELOADER AUSBLENDEN =================
    function hidePreloader() {
        console.log('Verstecke Preloader...');
        
        // 1. Preloader ausblenden
        preloader.classList.add('loaded');
        body.classList.add('loaded');
        
        // 2. Nach Fade-Animation Preloader komplett verstecken
        setTimeout(() => {
            preloader.style.display = 'none';
            console.log('Preloader komplett versteckt');
            
            // 3. Inhalt sichtbar machen
            makeContentVisible();
        }, 600);
    }
    
    // ================= INHALT SICHTBAR MACHEN =================
    function makeContentVisible() {
        console.log('Mache Inhalt sichtbar...');
        
        // Logo animieren
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
            logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        // Inhalt animieren (CSS-Transitionen werden durch loaded-Klasse aktiviert)
        console.log('Inhalt wird über CSS-Transitionen eingeblendet');
    }
    
    // ================= SICHERHEITS-TIMEOUT =================
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('Sicherheits-Timeout: Erzwinge Preloader-Ausblendung');
            hidePreloader();
        }
    }, 8000);
    
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
    
    console.log('✅ Global.js erfolgreich initialisiert');
});
