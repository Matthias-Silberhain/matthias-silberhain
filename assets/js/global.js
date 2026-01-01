/**
 * GLOBAL FUNKTIONEN - Vereinfachte Version
 * Preloader nur auf Startseite, Theme korrekt übernehmen
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === 'index.html';
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');
    
    // ================= PRELOADER NUR AUF STARTSEITE =================
    if (isHomePage && preloader) {
        console.log('Startseite: Preloader aktiv');
        
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
        // ANDERE SEITEN: Sofort laden
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // ================= AKTUELLE JAHRESZAHL =================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    console.log('✅ Website geladen');
});
