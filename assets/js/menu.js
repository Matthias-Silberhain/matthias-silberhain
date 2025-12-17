// ================= PRELOADER =================
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    
    if (preloader && typeText) {
        // Initialisiere
        preloader.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        const text = 'MATTHIAS SILBERHAIN';
        let index = 0;
        const speed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                typeText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            } else {
                // Warte 1 Sekunde, dann ausblenden
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'visible';
                    }, 600);
                }, 1000);
            }
        }
        
        // Starte Typewriter mit Verzögerung
        setTimeout(typeWriter, 500);
    } else {
        // Fallback
        if (preloader) preloader.style.display = 'none';
        document.body.style.overflow = 'visible';
    }
    
    // ================= BURGER MENÜ =================
    const burger = document.getElementById('burger');
    const navigation = document.getElementById('navigation');
    
    if (burger && navigation) {
        burger.addEventListener('click', function() {
            navigation.classList.toggle('aktiv');
            
            // Burger-Animation
            const spans = burger.querySelectorAll('span');
            if (navigation.classList.contains('aktiv')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'visible';
            }
        });
        
        // Schließe Menü bei Klick auf Link
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navigation.classList.remove('aktiv');
                const spans = burger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'visible';
            });
        });
        
        // Schließe Menü bei Klick außerhalb
        document.addEventListener('click', function(event) {
            if (navigation.classList.contains('aktiv') && 
                !navigation.contains(event.target) && 
                !burger.contains(event.target)) {
                navigation.classList.remove('aktiv');
                const spans = burger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'visible';
            }
        });
    }
    
    // ================= COPYRIGHT JAHR =================
    const yearElement = document.getElementById('jahr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ================= RESPONSIVE MENÜ RESIZE =================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navigation) {
            navigation.classList.remove('aktiv');
            document.body.style.overflow = 'visible';
        }
    });
    
    console.log('Matthias Silberhain Website geladen');
});

// Fallback: Falls Preloader hängen bleibt
window.addEventListener('load', function() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.display = 'none';
            document.body.style.overflow = 'visible';
            console.log('Fallback: Preloader ausgeblendet');
        }
    }, 5000);
});
