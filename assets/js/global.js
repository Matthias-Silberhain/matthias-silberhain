/**
 * GLOBAL FUNKTIONEN - Matthias Silberhain Website
 * Zentrale Funktionen für alle Seiten
 * Version 2.0 - Konsolidiert und optimiert
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Global.js geladen - Matthias Silberhain');
    
    // ================= PRELOADER =================
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    if (typeTextElement) {
        const text = "Matthias Silberhain";
        let index = 0;
        const typingSpeed = 100;
        const delayBeforeRemove = 3000;
        
        function typeWriter() {
            if (index < text.length) {
                typeTextElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                setTimeout(() => {
                    if (preloader) {
                        preloader.classList.add('loaded');
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 600);
                    }
                }, delayBeforeRemove);
            }
        }
        
        setTimeout(typeWriter, 500);
    } else if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 2500);
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
    
    // ================= ERROR HANDLING =================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Fehler:', e.error);
    });
    
    // ================= TOUCH DEVICE DETECTION =================
    function isTouchDevice() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch-device');
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
    
    console.log('✅ Global.js initialisiert');
});
