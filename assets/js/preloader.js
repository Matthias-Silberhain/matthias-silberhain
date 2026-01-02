// ==========================================================================
// PRELOADER SILBERNER STRICH ANIMATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const preloaderLine = document.getElementById('preloaderLine');
    
    // Verzögerung bevor die Linie erscheint (nach Typewriter)
    setTimeout(function() {
        if (preloaderLine) {
            preloaderLine.classList.add('active');
        }
    }, 2500); // 2.5 Sekunden nach Start (Typewriter sollte fertig sein)
    
    // Scroll Event für Menü-Hintergrund
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
});
