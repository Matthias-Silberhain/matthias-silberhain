/* ==========================================================================
   GLOBAL.JS - WICHTIGSTE FUNKTIONEN FÜR DIE WEBSITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. COPYRIGHT JAHR AUTOMATISCH ==========
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ========== 2. EXTERNE LINKS MIT TARGET="_BLANK" ==========
    document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
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
            }
        });
    });
    
    // ========== 4. FORM VALIDATION (falls Kontaktformular) ==========
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b6b';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Bitte füllen Sie alle erforderlichen Felder aus.');
            }
        });
    });
    
    // ========== 5. LAZY LOADING FÜR BILDER ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback für ältere Browser
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ========== 6. PERFORMANCE OPTIMIERUNGEN ==========
    // Verhindert Layout Shifts
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

// ========== 7. HELPER FUNCTIONS ==========
window.WebsiteHelpers = {
    // Formatieren von Datum
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('de-DE', options);
    },
    
    // Text auf bestimmte Länge kürzen
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },
    
    // Aktuelle URL zurückgeben
    getCurrentPage: function() {
        return window.location.pathname.split('/').pop();
    }
};
