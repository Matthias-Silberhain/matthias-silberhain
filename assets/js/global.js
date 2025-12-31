/* ==========================================================================
   GLOBAL.JS - WICHTIGSTE FUNKTIONEN FÜR DIE WEBSITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ global.js gestartet');
    
    // ========== 1. COPYRIGHT JAHR AUTOMATISCH ==========
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('✅ Copyright Jahr gesetzt:', yearElement.textContent);
    }
    
    // ========== 2. EXTERNE LINKS MIT TARGET="_BLANK" ==========
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    if (externalLinks.length > 0) {
        console.log('✅ Externe Links gesichert:', externalLinks.length);
    }
    
    // ========== 3. SMOOTH SCROLL FÜR ANKER-LINKS ==========
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                console.log('✅ Smooth Scroll zu:', targetId);
            }
        });
    });
    
    // ========== 4. PRELOADER TEXT SETZEN ==========
    const preloaderText = document.querySelector('.preloader-text');
    if (preloaderText) {
        preloaderText.textContent = 'MATTHIAS SILBERHAIN';
        console.log('✅ Preloader Text gesetzt');
    }
    
    // ========== 5. PERFORMANCE OPTIMIERUNGEN ==========
    // Verhindert Layout Shifts für Bilder
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transition = 'opacity 0.3s ease';
            });
        }
    });
    
    console.log('✅ global.js erfolgreich geladen');
});

// ========== 6. HELPER FUNCTIONS ==========
window.WebsiteHelpers = {
    // Formatieren von Datum
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('de-DE', options);
    },
    
    // Aktuelle Seite zurückgeben
    getCurrentPage: function() {
        return window.location.pathname.split('/').pop() || 'index.html';
    },
    
    // Dark Mode Status
    isDarkMode: function() {
        return document.body.classList.contains('dark-mode');
    }
};
