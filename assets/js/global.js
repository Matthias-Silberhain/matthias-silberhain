// assets/js/global.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Global JS wird geladen');
    
    // 1. Copyright Jahr setzen
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 2. Preloader Typewriter Effect (nur wenn Elemente existieren)
    const typeText = document.getElementById('type-text');
    const preloader = document.getElementById('preloader');
    const cursor = document.querySelector('.cursor');
    
    if (typeText && preloader) {
        console.log('Starte Preloader Animation');
        
        const text = "MATTHIAS SILBERHAIN";
        let index = 0;
        
        // Typewriter Funktion
        function typeWriter() {
            if (index < text.length) {
                typeText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            } else {
                // Animation fertig, Preloader ausblenden
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    // Preloader nach Animation entfernen
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('Preloader entfernt');
                    }, 600);
                }, 800);
            }
        }
        
        // Starte Typewriter mit Verzögerung
        setTimeout(typeWriter, 300);
    } else {
        console.log('Preloader nicht gefunden, überspringe Animation');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // 3. Aktiven Navigationslink hervorheben
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.hauptnavigation a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
    
    console.log('Global JS erfolgreich geladen');
});
