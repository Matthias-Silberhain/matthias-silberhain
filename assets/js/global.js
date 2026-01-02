/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Zentrale Funktionen für alle Seiten
 * Version 2.3 - Mit silbernem Preloader-Strich und korrigiertem Typewriter
 */

// Mobile Device Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Optimierung für mobile Geräte
if (isMobile) {
    document.documentElement.classList.add('mobile-device');
}
if (isIOS) {
    document.documentElement.classList.add('ios-device');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Matthias Silberhain');
    console.log('Gerät:', isMobile ? 'Mobile' : 'Desktop', isIOS ? 'iOS' : '');
    
    // ================= SEITEN-SPEZIFISCHE LOGIK =================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const body = document.body;
    
    // Seiten, auf denen der Preloader laufen soll
    const pagesWithPreloader = ['index.html', 'impressum.html', 'datenschutz.html'];
    
    // Seiten, die eine spezielle Animation bekommen
    const pagesWithSpecialAnimations = ['ueber-mich.html', 'werke.html', 'termine.html', 'kontakt.html'];
    
    // ================= PRELOADER (optimierte Mobile-Version) =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    const preloaderLine = document.getElementById('preloaderLine');
    
    if (preloader && pagesWithPreloader.includes(currentPage)) {
        // Preloader nur auf index.html, impressum.html und datenschutz.html
        // Sofort sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        // Prüfen ob Preloader-Line existiert
        if (!preloaderLine) {
            console.warn('Preloader-Line Element nicht gefunden!');
        }
        
        if (typeTextElement) {
            const text = "MATTHIAS SILBERHAIN"; // GROSSBUCHSTABEN wie in der HTML
            let index = 0;
            const typingSpeed = isMobile ? 70 : 60; // Schneller auf Mobile
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.textContent += text.charAt(index);
                    index++;
                    
                    // Performance-optimiert für Mobile
                    if (isMobile && index < text.length) {
                        setTimeout(typeWriter, typingSpeed);
                    } else if (index < text.length) {
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        // Typewriter fertig - silbernen Strich starten
                        console.log('Typewriter fertig, starte silbernen Strich...');
                        
                        // Silbernen Strich aktivieren
                        if (preloaderLine) {
                            preloaderLine.classList.add('active');
                            console.log('Silberner Strich aktiviert');
                            
                            // Nach der Strich-Animation Preloader ausblenden
                            setTimeout(() => {
                                preloader.classList.add('loaded');
                                console.log('Preloader wird ausgeblendet');
                                
                                setTimeout(() => {
                                    preloader.style.display = 'none';
                                }, 300);
                            }, 2500); // 2.5 Sekunden für Strich-Animation
                        } else {
                            // Fallback: Ohne Strich nach kurzer Pause ausblenden
                            setTimeout(() => {
                                preloader.classList.add('loaded');
                                setTimeout(() => {
                                    preloader.style.display = 'none';
                                }, 300);
                            }, 500);
                        }
                    }
                }
            }
            
            // Starte Typing mit kurzer Verzögerung
            setTimeout(() => {
                typeTextElement.textContent = ''; // Reset mit textContent statt innerHTML
                typeWriter();
            }, 300);
        } else {
            // Fallback ohne Typing: Silbernen Strich zeigen, dann Preloader ausblenden
            console.log('Kein Typewriter-Element gefunden, verwende Fallback');
            
            if (preloaderLine) {
                setTimeout(() => {
                    preloaderLine.classList.add('active');
                    
                    setTimeout(() => {
                        preloader.classList.add('loaded');
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 300);
                    }, 2500);
                }, 500);
            } else {
                // Fallback ohne Strich
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 300);
                }, 1500);
            }
        }
        
        // Sicherheits-Timeout: Maximal 8 Sekunden
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('loaded')) {
                console.log('Sicherheits-Timeout: Preloader wird ausgeblendet');
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }
        }, 8000);
        
    } else if (preloader) {
        // Auf anderen Seiten: Preloader sofort ausblenden
        preloader.style.display = 'none';
        
        // Spezielle Animation für andere Seiten
        if (pagesWithSpecialAnimations.includes(currentPage)) {
            // Verzögerte Fade-In Animation für den Inhalt
            setTimeout(() => {
                body.style.opacity = '0';
                body.style.transition = 'opacity 0.6s ease-in-out';
                body.style.opacity = '1';
                
                // Subtile Scroll-Animation für Abschnitte
                const sections = document.querySelectorAll('.inhalt > *');
                sections.forEach((section, index) => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(15px)';
                    section.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
                    
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 50);
                });
            }, 100);
        }
    }
    
    // ================= SCROLL EVENT FÜR MENÜ-HINTERGRUND =================
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ================= CURRENT YEAR IN FOOTER (alle Seiten) =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================= SMOOTH SCROLLING (alle Seiten) =================
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
        const currentHash = window.location.hash;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentHash && linkHref === currentHash) ||
                (currentPage === 'index.html' && linkHref === '#home')) {
                link.classList.add('active');
            }
        });
    }
    
    highlightActiveNavLink();
    window.addEventListener('hashchange', highlightActiveNavLink);
    
    // ================= LAZY LOADING =================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ================= WINDOW RESIZE HANDLER =================
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768) {
                const burger = document.getElementById('burgerButton');
                const nav = document.getElementById('mainNav');
                const overlay = document.querySelector('.menu-overlay');
                
                if (burger && nav && burger.classList.contains('aktiv')) {
                    burger.classList.remove('aktiv');
                    nav.classList.remove('aktiv');
                    if (overlay) overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        }, 250);
    });
    
    // ================= ERROR HANDLING =================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Fehler:', e.message, 'in', e.filename, 'Zeile:', e.lineno);
    });
    
    console.log(`✅ Global.js initialisiert für: ${currentPage}`);
});
