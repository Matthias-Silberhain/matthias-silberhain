/**
 * GLOBAL FUNKTIONEN - Flackern-freie Version
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === 'index.html';
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    // ================= PRELOADER NUR STARTSEITE =================
    if (isHomePage && preloader) {
        // Preloader-Hintergrund basierend auf aktuellem Theme setzen
        const isDark = document.body.classList.contains('dark-mode');
        if (!isDark) {
            preloader.style.backgroundColor = '#f8f8f8';
            preloader.style.backgroundImage = 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 50%, #f8f8f8 100%)';
        }
        
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
            }, 300);
        } else {
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 1500);
        }
        
        // Safety Timeout
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
        // Andere Seiten
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 50);
        
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // ================= CURRENT YEAR =================
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    console.log('✅ Seite geladen: ' + currentPage);
});
