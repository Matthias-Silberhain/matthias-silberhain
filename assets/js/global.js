/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Zentrale Funktionen für alle Seiten - Optimierte Version (Preloader nur Startseite)
 * Version 3.1 - Preloader nur auf index.html
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
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === 'index.html';
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    // ================= PRELOADER NUR AUF STARTSEITE =================
    if (isHomePage && preloader) {
        console.log('Startseite: Preloader aktiv');
        
        // Preloader sichtbar machen
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        
        if (typeTextElement) {
            const text = "Matthias Silberhain";
            let index = 0;
            const typingSpeed = isMobile ? 70 : 60;
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.innerHTML += text.charAt(index);
                    index++;
                    
                    if (index < text.length) {
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        // Typing fertig - Preloader ausblenden
                        setTimeout(() => {
                            preloader.classList.add('loaded');
                            document.body.classList.add('loaded');
                            setTimeout(() => {
                                preloader.style.display = 'none';
                            }, 300);
                        }, 200);
                    }
                }
            }
            
            // Starte Typing mit kurzer Verzögerung
            setTimeout(() => {
                typeTextElement.innerHTML = '';
                typeWriter();
            }, 300);
        } else {
            // Fallback ohne Typing
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 1500);
        }
        
        // Sicherheits-Timeout
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('loaded')) {
                console.log('Sicherheits-Timeout: Preloader wird ausgeblendet');
                preloader.classList.add('loaded');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }
        }, 3500);
    } else {
        // ALLE ANDEREN SEITEN: Kein Preloader, sofort laden
        console.log('Andere Seite: Preloader überspringen');
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        // Falls Preloader-Div existiert (sollte nicht), ausblenden
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // ================= PARALLAX EFFECT (nur Desktop) =================
    const header = document.querySelector('.header');
    if (header && !isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const rate = Math.min(scrolled * -0.15, 50); // Begrenzen auf 50px
                    header.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // ================= CURRENT YEAR IN FOOTER =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
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
                    
                    const offset = 100;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - offset,
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
            
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    highlightActiveNavLink();
    
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
        }, { rootMargin: '100px' });
        
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
    
    console.log(`✅ Global.js initialisiert für: ${currentPage}`);
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Fehler:', e.message);
});
