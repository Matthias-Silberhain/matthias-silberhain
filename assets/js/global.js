/**
 * GLOBAL FUNKTIONEN - Kompatibilitätsfix
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === 'index.html';
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    // ================= PRELOADER NUR AUF STARTSEITE =================
    if (isHomePage && preloader) {
        console.log('✨ Preloader aktiviert');
        
        // Preloader sichtbar machen
        preloader.style.display = 'flex';
        
        // Typing Animation
        if (typeTextElement) {
            const text = "Matthias Silberhain";
            let index = 0;
            const typingSpeed = 80;
            
            function typeWriter() {
                if (index < text.length) {
                    typeTextElement.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Typing fertig
                    setTimeout(() => {
                        preloader.classList.add('loaded');
                        document.body.classList.add('loaded');
                        
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 800);
                    }, 500);
                }
            }
            
            setTimeout(() => {
                typeTextElement.innerHTML = '';
                typeWriter();
            }, 500);
        } else {
            // Fallback ohne Typing
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 2000);
        }
        
        // Sicherheits-Timeout
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('loaded')) {
                preloader.classList.add('loaded');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }
        }, 5000);
    } else {
        // ANDERE SEITEN
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // ================= WEITERE FUNKTIONALITÄT =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
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
    
    console.log(`✅ Global.js initialisiert für: ${currentPage}`);
});
