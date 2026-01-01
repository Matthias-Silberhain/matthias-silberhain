// assets/js/animations.js
// Spektakuläre Silber-Animationen mit Sternenhimmel für Matthias Silberhain

// GSAP Plugins registrieren
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('Silber-Sternen-Animationen werden geladen...');
    
    // Sternenhimmel erstellen (muss VOR Preloader passieren)
    createStarrySky();
    
    // Preloader Animation
    initSpectacularPreloader();
    
    // Navigation Effects
    initNavigation();
    
    // Button Animations
    initButtons();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Social Media Effects
    initSocialMedia();
    
    // Special Effects
    initSilberEffects();
    
    // Footer Jahr aktualisieren
    updateFooterYear();
});

// ==================== 1. SPEKTAKULÄRER PRELOADER MIT STERNENHIMMEL ====================
function initSpectacularPreloader() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    
    if (!preloader || !typeText) {
        console.warn('Preloader Elemente nicht gefunden');
        // Direkt Content anzeigen
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                revealContent();
            }
        }, 100);
        return;
    }
    
    // Preloader anzeigen
    gsap.set(preloader, { 
        display: 'flex', 
        opacity: 1 
    });
    
    // 1. Logo Animation
    const logo = document.querySelector('.preloader-logo');
    if (logo) {
        gsap.from(logo, {
            duration: 1.5,
            opacity: 0,
            scale: 0,
            rotation: 360,
            ease: "back.out(1.7)",
            filter: "drop-shadow(0 0 0px rgba(192, 192, 192, 0))"
        });
        
        // Logo Pulsieren
        gsap.to(logo, {
            duration: 2,
            scale: 1.1,
            filter: "drop-shadow(0 0 30px rgba(192, 192, 192, 0.9))",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });
    }
    
    // 2. Sternen-Regen Effekt um den Text
    createStarRain();
    
    // 3. Text erscheinen lassen mit spektakulärem Effekt
    typeText.textContent = "MATTHIAS SILBERHAIN";
    
    // Text anfangs verstecken
    gsap.set(typeText, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(20px)"
    });
    
    // Text Explosionseffekt
    const tl = gsap.timeline();
    
    tl.to(typeText, {
        duration: 1.5,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ease: "back.out(1.7)"
    })
    .to(typeText, {
        duration: 0.5,
        textShadow: "0 0 30px rgba(192, 192, 192, 0.8)",
        ease: "power2.out"
    }, "-=0.5")
    .to(typeText, {
        duration: 1,
        textShadow: "0 0 60px rgba(192, 192, 192, 1), 0 0 100px rgba(192, 192, 192, 0.5)",
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // 4. Silberner Unterstrich
    const underline = document.createElement('div');
    underline.className = 'silber-underline';
    underline.style.cssText = `
        position: absolute;
        bottom: -15px;
        left: 50%;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, 
            transparent, 
            #c0c0c0, 
            #f0f0f0, 
            #c0c0c0, 
            transparent);
        transform: translateX(-50%);
        border-radius: 2px;
        box-shadow: 0 0 20px rgba(192, 192, 192, 0.5);
    `;
    
    document.querySelector('.text-container').appendChild(underline);
    
    tl.to(underline, {
        duration: 1.5,
        width: "100%",
        ease: "power3.out"
    }, "-=0.5");
    
    // 5. Sternen-Explosion um den Text
    createTextStarExplosion(typeText);
    
    // 6. Preloader nach 4.5 Sekunden entfernen
    setTimeout(() => {
        removeSpectacularPreloader();
    }, 4500);
    
    function removeSpectacularPreloader() {
        // Preloader ausblenden
        tl.to(preloader, {
            duration: 1,
            opacity: 0,
            scale: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                revealContent();
            }
        });
    }
}

// ==================== 2. STERNHIMMEL ERSTELLEN ====================
function createStarrySky() {
    // Container für Sterne erstellen (falls nicht vorhanden)
    let starContainer = document.getElementById('star-container');
    
    if (!starContainer) {
        starContainer = document.createElement('div');
        starContainer.id = 'star-container';
        starContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(starContainer);
    }
    
    // Anzahl der Sterne basierend auf Bildschirmgröße
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 3000);
    
    // Sterne erstellen
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'silber-star';
        
        // Zufällige Position und Größe
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.7 + 0.1;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at center, 
                rgba(240, 240, 240, ${opacity}) 0%, 
                rgba(192, 192, 192, ${opacity * 0.5}) 70%, 
                transparent 100%);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            box-shadow: 0 0 ${size * 3}px rgba(192, 192, 192, ${opacity * 0.3});
        `;
        
        starContainer.appendChild(star);
        
        // Stern-Funkeln Animation
        gsap.to(star, {
            duration: duration,
            opacity: opacity * 0.3,
            scale: 0.8,
            repeat: -1,
            yoyo: true,
            delay: delay,
            ease: "sine.inOut"
        });
        
        // Langsame Bewegung für einige Sterne
        if (i % 7 === 0) {
            gsap.to(star, {
                duration: duration * 10,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
    
    // Große Sterne für Effekt
    createBigStars(starContainer);
}

// ==================== 3. STERNEN-REGEN EFFEKT ====================
function createStarRain() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Temporärer Container für Sternenregen
    const rainContainer = document.createElement('div');
    rainContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    preloader.appendChild(rainContainer);
    
    // 50 fallende Sterne erstellen
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'falling-star';
        
        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 3;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 3}px;
            background: linear-gradient(to bottom, 
                transparent, 
                rgba(240, 240, 240, 0.8), 
                rgba(192, 192, 192, 0.6), 
                transparent);
            border-radius: 50%;
            left: ${startX}%;
            top: -20px;
            transform: rotate(45deg);
            pointer-events: none;
            filter: blur(0.5px);
        `;
        
        rainContainer.appendChild(star);
        
        // Fallende Animation
        gsap.to(star, {
            duration: duration,
            top: "120%",
            left: `${startX + Math.random() * 20 - 10}%`,
            opacity: 0,
            ease: "power1.in",
            delay: delay,
            onComplete: () => {
                if (star.parentElement) {
                    star.parentElement.removeChild(star);
                }
            }
        });
    }
    
    // Container nach Animation entfernen
    setTimeout(() => {
        if (rainContainer.parentElement) {
            rainContainer.parentElement.removeChild(rainContainer);
        }
    }, 4000);
}

// ==================== 4. TEXT STERNEN-EXPLOSION ====================
function createTextStarExplosion(textElement) {
    if (!textElement) return;
    
    const textRect = textElement.getBoundingClientRect();
    const centerX = textRect.left + textRect.width / 2;
    const centerY = textRect.top + textRect.height / 2;
    
    // Container für Explosion
    const explosionContainer = document.createElement('div');
    explosionContainer.style.cssText = `
        position: fixed;
        top: ${centerY}px;
        left: ${centerX}px;
        pointer-events: none;
        z-index: 2;
    `;
    
    document.body.appendChild(explosionContainer);
    
    // 30 Explosionssterne erstellen
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'explosion-star';
        
        const size = Math.random() * 4 + 2;
        const angle = (Math.PI * 2 / 30) * i;
        const distance = Math.random() * 150 + 50;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at center, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(192, 192, 192, 0.6) 50%, 
                transparent 100%);
            border-radius: 50%;
            left: 0;
            top: 0;
            pointer-events: none;
            filter: blur(1px);
        `;
        
        explosionContainer.appendChild(star);
        
        // Explosionsanimation
        gsap.to(star, {
            duration: 1.5,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0.2,
            ease: "power2.out",
            delay: Math.random() * 0.3,
            onComplete: () => {
                if (star.parentElement) {
                    star.parentElement.removeChild(star);
                }
            }
        });
    }
    
    // Container nach Animation entfernen
    setTimeout(() => {
        if (explosionContainer.parentElement) {
            explosionContainer.parentElement.removeChild(explosionContainer);
        }
    }, 2000);
}

// ==================== 5. GROSSE STERNE FÜR EFFEKT ====================
function createBigStars(container) {
    // 3-5 große, spezielle Sterne
    const bigStarCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < bigStarCount; i++) {
        const bigStar = document.createElement('div');
        bigStar.className = 'big-star';
        
        const size = Math.random() * 15 + 10;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotation = Math.random() * 360;
        
        bigStar.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            transform: rotate(${rotation}deg);
        `;
        
        // Sternform mit CSS
        bigStar.innerHTML = `
            <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, 
                    rgba(240, 240, 240, 0.8) 0%, 
                    rgba(192, 192, 192, 0.4) 50%, 
                    transparent 70%);
                border-radius: 50%;
            "></div>
            <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                background: conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    rgba(192, 192, 192, 0.3) 36deg,
                    rgba(240, 240, 240, 0.6) 72deg,
                    rgba(192, 192, 192, 0.3) 108deg,
                    transparent 144deg,
                    rgba(192, 192, 192, 0.3) 180deg,
                    rgba(240, 240, 240, 0.6) 216deg,
                    rgba(192, 192, 192, 0.3) 252deg,
                    transparent 288deg,
                    rgba(192, 192, 192, 0.3) 324deg,
                    transparent 360deg
                );
                border-radius: 50%;
                filter: blur(1px);
            "></div>
        `;
        
        container.appendChild(bigStar);
        
        // Spezielle Animation für große Sterne
        gsap.to(bigStar, {
            duration: 4,
            rotate: rotation + 360,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to(bigStar.children[0], {
            duration: 3,
            opacity: 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }
}

// ==================== 6. CONTENT REVEAL ====================
function revealContent() {
    if (typeof gsap !== 'undefined') {
        // Hauptinhalt erscheinen lassen
        gsap.from('main', {
            duration: 1.2,
            opacity: 0,
            y: 30,
            ease: "power3.out"
        });
        
        // Header erscheinen lassen
        gsap.from('header', {
            duration: 0.8,
            opacity: 0,
            y: -20,
            ease: "back.out(1.7)",
            delay: 0.2
        });
        
        // Footer erscheinen lassen
        gsap.from('footer', {
            duration: 0.8,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            delay: 0.3
        });
        
        // Social Section erscheinen lassen
        gsap.from('.social-section', {
            duration: 1,
            opacity: 0,
            y: 40,
            ease: "power3.out",
            delay: 0.4
        });
    }
}

// ==================== 7. NAVIGATION ANIMATIONEN ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    
    if (!navLinks.length) return;
    
    navLinks.forEach(link => {
        // Hover Effekt
        link.addEventListener('mouseenter', (e) => {
            gsap.to(e.target, {
                duration: 0.3,
                color: '#c0c0c0',
                textShadow: '0 0 12px rgba(192, 192, 192, 0.7)',
                ease: "power2.out"
            });
            
            // Silberne Linie
            createSilberLine(e.target);
        });
        
        link.addEventListener('mouseleave', (e) => {
            if (!e.target.classList.contains('active')) {
                gsap.to(e.target, {
                    duration: 0.3,
                    color: '#ffffff',
                    textShadow: 'none',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 8. BUTTON ANIMATIONEN ====================
function initButtons() {
    const buttons = document.querySelectorAll('.silber-button');
    
    if (!buttons.length) return;
    
    buttons.forEach(button => {
        // Hover Animation
        button.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.3,
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(192, 192, 192, 0.3)',
                borderColor: '#f0f0f0',
                ease: "power2.out"
            });
            
            // Pfeil Animation
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 8,
                    ease: "power2.out"
                });
            }
            
            // Kleine Sterne um Button
            createButtonStars(target);
        });
        
        button.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.3,
                scale: 1,
                boxShadow: 'none',
                borderColor: '#c0c0c0',
                ease: "power2.in"
            });
            
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 0,
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 9. SCROLL ANIMATIONEN ====================
function initScrollAnimations() {
    if (typeof ScrollTrigger === 'undefined') return;
    
    // Credo Text Animation
    const credoText = document.querySelector('.kalligrafie-text');
    if (credoText) {
        gsap.from(credoText, {
            scrollTrigger: {
                trigger: credoText,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out"
        });
    }
    
    // Text Absätze animieren
    const paragraphs = document.querySelectorAll('.kerninhalt p');
    paragraphs.forEach((paragraph, i) => {
        gsap.from(paragraph, {
            scrollTrigger: {
                trigger: paragraph,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 0,
            y: 20,
            ease: "power2.out",
            delay: i * 0.05
        });
    });
}

// ==================== 10. SOCIAL MEDIA EFFECTS ====================
function initSocialMedia() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    if (!socialLinks.length) return;
    
    socialLinks.forEach((link, index) => {
        gsap.from(link, {
            scrollTrigger: {
                trigger: '.social-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 15,
            scale: 0.9,
            delay: index * 0.05,
            ease: "power2.out"
        });
        
        // Hover Animation
        link.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.1,
                    filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.4))',
                    ease: "power2.out"
                });
                
                // Kleine Sterne um Icon
                createIconStars(icon);
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    filter: 'drop-shadow(0 0 0px rgba(192, 192, 192, 0))',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 11. SPECIAL EFFECTS ====================
function initSilberEffects() {
    // Lichtkante Animation
    const lichtkanten = document.querySelectorAll('.lichtkante');
    lichtkanten.forEach(kante => {
        if (kante) {
            gsap.to(kante, {
                duration: 3,
                backgroundPosition: '200% 0',
                repeat: -1,
                ease: "none"
            });
        }
    });
    
    // Zitat Effekt
    const zitat = document.querySelector('.zitat');
    if (zitat) {
        gsap.from(zitat, {
            scrollTrigger: {
                trigger: zitat,
                start: 'top 80%'
            },
            duration: 1.2,
            background: 'linear-gradient(90deg, rgba(192,192,192,0) 0%, rgba(192,192,192,0.1) 50%, rgba(192,192,192,0) 100%)',
            borderLeftWidth: 5,
            ease: "power2.out"
        });
    }
}

// ==================== 12. HILFSFUNKTIONEN ====================
function createSilberLine(element) {
    const line = document.createElement('div');
    line.className = 'silber-line';
    line.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #c0c0c0, #f0f0f0, #c0c0c0, transparent);
        z-index: 1;
    `;
    
    element.appendChild(line);
    
    gsap.to(line, {
        duration: 0.5,
        width: '100%',
        ease: "power3.out",
        onComplete: () => {
            gsap.to(line, {
                duration: 0.3,
                opacity: 0,
                delay: 0.2,
                onComplete: () => {
                    if (line.parentElement) {
                        line.parentElement.removeChild(line);
                    }
                }
            });
        }
    });
}

function createButtonStars(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'button-star';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(240, 240, 240, 0.8);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1;
            filter: blur(0.5px);
        `;
        
        button.appendChild(star);
        
        gsap.to(star, {
            duration: 0.6,
            opacity: 0,
            scale: 2,
            ease: "power2.out",
            onComplete: () => {
                if (star.parentElement) {
                    star.parentElement.removeChild(star);
                }
            }
        });
    }
}

function createIconStars(icon) {
    const rect = icon.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.className = 'icon-star';
        
        const size = Math.random() * 2 + 1;
        const angle = (Math.PI * 2 / 3) * i;
        const distance = 20;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(192,192,192,0.6) 70%, transparent 100%);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            margin-left: -${size/2}px;
            margin-top: -${size/2}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        icon.appendChild(star);
        
        gsap.to(star, {
            duration: 0.8,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0.5,
            ease: "power2.out",
            onComplete: () => {
                if (star.parentElement) {
                    star.parentElement.removeChild(star);
                }
            }
        });
    }
}

function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==================== 13. ERROR HANDLING ====================
if (typeof gsap === 'undefined') {
    console.warn('GSAP ist nicht geladen. Verwende vereinfachte Animationen.');
    
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }, 3000);
        }
        
        updateFooterYear();
    });
} else {
    console.log('GSAP erfolgreich geladen. Spektakuläre Silber-Animationen aktiv!');
}
