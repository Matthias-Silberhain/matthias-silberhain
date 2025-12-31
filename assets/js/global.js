// assets/js/global.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Global JS wird geladen');
    
    // 1. Copyright Jahr setzen
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('Copyright Jahr gesetzt:', yearElement.textContent);
    }
    
    // 2. Preloader Typewriter Effect
    const typeText = document.getElementById('type-text');
    const preloader = document.getElementById('preloader');
    
    if (typeText && preloader) {
        console.log('Starte Preloader Animation');
        
        // Text zurücksetzen
        typeText.textContent = '';
        
        const text = "MATTHIAS SILBERHAIN";
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                typeText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            } else {
                // Animation fertig
                console.log('Preloader Animation fertig');
                
                // Kurz warten, dann ausblenden
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    
                    // Nach Animation komplett entfernen
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        console.log('Preloader entfernt');
                    }, 600);
                }, 800);
            }
        }
        
        // Starte Typewriter mit kurzer Verzögerung
        setTimeout(typeWriter, 300);
    } else {
        console.warn('Preloader Elemente nicht gefunden');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    console.log('Global JS erfolgreich geladen');
});
