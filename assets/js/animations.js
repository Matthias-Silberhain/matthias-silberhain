// assets/js/animations.js
// Spektakuläre Silber-Animationen mit speziellem Preloader für Matthias Silberhain

// GSAP Plugins registrieren
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Warten bis DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('Silber-Animationen werden geladen...');
    
    // Preloader Animation (ohne dauerhafte Sterne)
    initExtendedPreloader();
    
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

// ==================== 1. ERWEITERTER PRELOADER MIT SILBER-UNTERSTRICH ====================
function initExtendedPreloader() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    
    if (!preloader || !typeText) {
        console.warn('Preloader Elemente nicht gefunden');
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
    
    // Temporären Sternenhimmel NUR für Preloader erstellen
    createPreloaderStars();
    
    // 1. Logo Animation (verlängert)
    const logo = document.querySelector('.preloader-logo');
    if (logo) {
        gsap.set(logo, {
            opacity: 0,
            scale: 0.5,
            filter: "drop-shadow(0 0 0px rgba(192, 192, 192, 0))"
        });
        
        gsap.to(logo, {
            duration: 2.5,
            opacity: 1,
            scale: 1,
            rotation: 360,
            filter: "drop-shadow(0 0 25px rgba(192, 192, 192, 0.7))",
            ease: "back.out(1.7)"
        });
        
        // Logo Pulsieren (verlängert)
        gsap.to(logo, {
            duration: 3,
            scale: 1.15,
            filter: "drop-shadow(0 0 35px rgba(192, 192, 192, 0.9))",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }
    
    // 2. Typing Effekt für "MATTHIAS SILBERHAIN" mit GSAP TextPlugin
    const fullName = "MATTHIAS SILBERHAIN";
    const letters = fullName.split('');
    let currentIndex = 0;
    
    // Container für Typing-Effekt
    const typingContainer = document.createElement('div');
    typingContainer.style.cssText = `
        position: relative;
        display: inline-block;
        min-height: 60px;
    `;
    
    typeText.parentNode.insertBefore(typingContainer, typeText);
    typingContainer.appendChild(typeText);
    
    // Cursor erstellen
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
        color: #c0c0c0;
        font-weight: 300;
        animation: cursor-blink 1s infinite;
    `;
    
    typeText.textContent = '';
    typeText.appendChild(cursor);
    
    // Typing Animation mit Buchstabe für Buchstabe
    function typeNextLetter() {
        if (currentIndex >= letters.length) {
            // Typing fertig, Cursor entfernen und Unterstrich anzeigen
            cursor.remove();
            showSilverUnderline();
            return;
        }
        
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letters[currentIndex];
        letterSpan.style.cssText = `
            display: inline-block;
            opacity: 0;
            transform: translateY(10px);
            color: #c0c0c0;
        `;
        
        typeText.insertBefore(letterSpan, cursor);
        
        // Buchstaben-Animation
        gsap.to(letterSpan, {
            duration: 0.15,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            onComplete: () => {
                currentIndex++;
                setTimeout(typeNextLetter, 50 + Math.random() * 30);
            }
        });
        
        // Cursor blinken lassen
        gsap.to(cursor, {
            duration: 0.1,
            opacity: 0.7,
            yoyo: true,
            repeat: 1,
            ease: "none"
        });
    }
    
    // Start Typing nach kurzer Verzögerung
    setTimeout(() => {
        typeNextLetter();
    }, 1000);
    
    // 3. Sternen-Regen während Typing
    createStarRainEffect();
    
    // 4. Silberner Unterstrich nach Typing
    function showSilverUnderline() {
        const underline = document.createElement('div');
        underline.className = 'silber-underline-final';
        underline.style.cssText = `
            position: absolute;
            bottom: -25px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, 
                transparent, 
                #c0c0c0, 
                #f0f0f0, 
                #c0c0c0, 
                transparent);
            border-radius: 2px;
            box-shadow: 0 0 25px rgba(192, 192, 192, 0.6);
            transform-origin: left center;
        `;
        
        typingContainer.appendChild(underline);
        
        // Unterstrich Animation (länger und spektakulärer)
        const underlineTL = gsap.timeline();
        
        underlineTL.to(underline, {
            duration: 1.8,
            width: "100%",
            ease: "power3.out"
        })
        .to(underline, {
            duration: 0.5,
            boxShadow: "0 0 40px rgba(192, 192, 192, 0.8)",
            ease: "power2.out"
        }, "-=0.5")
        .to(underline, {
            duration: 2,
            background: "linear-gradient(90deg, transparent, #f0f0f0, #ffffff, #f0f0f0, transparent)",
            boxShadow: "0 0 50px rgba(255, 255, 255, 0.6)",
            repeat: 2,
            yoyo: true,
            ease: "sine.inOut"
        }, "-=0.3");
        
        // Text nach Typing leuchten lassen
        gsap.to(typeText, {
            duration: 2,
            textShadow: "0 0 30px rgba(192, 192, 192, 0.8), 0 0 60px rgba(192, 192, 192, 0.4)",
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Pause nach Unterstrich, dann Preloader ausblenden
        setTimeout(() => {
            removeExtendedPreloader();
        }, 3000);
    }
    
    // 5. Preloader nach insgesamt ~8 Sekunden entfernen
    const totalPreloaderTime = 8000; // 8 Sekunden
    setTimeout(() => {
        removeExtendedPreloader();
    }, totalPreloaderTime);
    
    function removeExtendedPreloader() {
        // Sterne entfernen
        const starContainer = document.getElementById('preloader-stars');
        if (starContainer) {
            gsap.to(starContainer, {
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    if (starContainer.parentElement) {
                        starContainer.parentElement.removeChild(starContainer);
                    }
                }
            });
        }
        
        // Preloader ausblenden
        gsap.to(preloader, {
            duration: 1.5,
            opacity: 0,
            scale: 0.95,
            ease: "power3.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                revealContent();
            }
        });
    }
}

// ==================== 2. TEMPORÄRE STERNE NUR FÜR PRELOADER ====================
function createPreloaderStars() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Container für Preloader-Sterne
    const starContainer = document.createElement('div');
    starContainer.id = 'preloader-stars';
    starContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    preloader.appendChild(starContainer);
    
    // Anzahl der Sterne
    const starCount = 40;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'preloader-star';
        
        // Zufällige Eigenschaften
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.8 + 0.1;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 3;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at center, 
                rgba(240, 240, 240, ${opacity}) 0%, 
                rgba(192, 192, 192, ${opacity * 0.6}) 70%, 
                transparent 100%);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(192, 192, 192, ${opacity * 0.5});
        `;
        
        starContainer.appendChild(star);
        
        // Stern-Funkeln
        gsap.to(star, {
            duration: duration,
            opacity: opacity * 0.4,
            scale: 0.7,
            repeat: -1,
            yoyo: true,
            delay: delay,
            ease: "sine.inOut"
        });
    }
    
    // 3-5 große, spezielle Sterne
    const bigStarCount = 4;
    for (let i = 0; i < bigStarCount; i++) {
        const bigStar = document.createElement('div');
        bigStar.className = 'preloader-big-star';
        
        const size = Math.random() * 12 + 8;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        bigStar.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            background: radial-gradient(circle at center, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(192, 192, 192, 0.5) 50%, 
                transparent 80%);
            border-radius: 50%;
            filter: blur(1px);
        `;
        
        starContainer.appendChild(bigStar);
        
        // Großer Stern Animation
        gsap.to(bigStar, {
            duration: 3,
            scale: 1.3,
            opacity: 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }
}

// ==================== 3. STERNEN-REGEN EFFEKT ====================
function createStarRainEffect() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    const rainContainer = document.createElement('div');
    rainContainer.className = 'star-rain-container';
    rainContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
    `;
    
    preloader.appendChild(rainContainer);
    
    // 30 fallende Sterne
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'falling-star';
        
        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 2 + 1.5;
        const delay = Math.random() * 4;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 4}px;
            background: linear-gradient(to bottom, 
                transparent, 
                rgba(240, 240, 240, 0.9), 
                rgba(192, 192, 192, 0.7), 
                transparent);
            border-radius: 50%;
            left: ${startX}%;
            top: -50px;
            transform: rotate(45deg);
            pointer-events: none;
            filter: blur(0.5px);
        `;
        
        rainContainer.appendChild(star);
        
        // Fallende Animation
        gsap.to(star, {
            duration: duration,
            top: "120%",
            left: `${startX + Math.random() * 30 - 15}%`,
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
    
    // Container nach 5 Sekunden entfernen
    setTimeout(() => {
        if (rainContainer.parentElement) {
            rainContainer.parentElement.removeChild(rainContainer);
        }
    }, 5000);
}

// ==================== 4. CONTENT REVEAL ====================
function revealContent() {
    if (typeof gsap !== 'undefined') {
        // Header erscheinen lassen (vom oberen Rand)
        gsap.from('header', {
            duration: 1.2,
            y: -50,
            opacity: 0,
            ease: "power3.out"
        });
        
        // Hauptinhalt erscheinen lassen
        gsap.from('main', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            delay: 0.2
        });
        
        // Social Section erscheinen lassen
        gsap.from('.social-section', {
            duration: 1.2,
            y: 40,
            opacity: 0,
            ease: "power3.out",
            delay: 0.3
        });
        
        // Footer erscheinen lassen
        gsap.from('footer', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4
        });
        
        // Lichtkante Animation starten
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
    }
}

// ==================== 5. NAVIGATION ANIMATIONEN ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    
    if (!navLinks.length) return;
    
    // Links nacheinander erscheinen lassen
    navLinks.forEach((link, index) => {
        gsap.from(link, {
            duration: 0.6,
            opacity: 0,
            x: -20,
            delay: 0.5 + (index * 0.1),
            ease: "power2.out"
        });
    });
    
    navLinks.forEach(link => {
        // Hover Effekt
        link.addEventListener('mouseenter', (e) => {
            gsap.to(e.target, {
                duration: 0.3,
                color: '#c0c0c0',
                letterSpacing: '2px',
                textShadow: '0 0 12px rgba(192, 192, 192, 0.7)',
                ease: "power2.out"
            });
            
            createSilberLine(e.target);
        });
        
        link.addEventListener('mouseleave', (e) => {
            if (!e.target.classList.contains('active')) {
                gsap.to(e.target, {
                    duration: 0.4,
                    color: '#ffffff',
                    letterSpacing: 'normal',
                    textShadow: 'none',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 6. BUTTON ANIMATIONEN ====================
function initButtons() {
    const buttons = document.querySelectorAll('.silber-button');
    
    if (!buttons.length) return;
    
    buttons.forEach(button => {
        // Hover Animation
        button.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            
            gsap.to(target, {
                duration: 0.4,
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(192, 192, 192, 0.3)',
                borderColor: '#f0f0f0',
                ease: "back.out(1.7)"
            });
            
            const arrow = target.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 8,
                    ease: "power2.out"
                });
            }
            
            createButtonShine(target);
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

// ==================== 7. SCROLL ANIMATIONEN ====================
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
            duration: 1.5,
            opacity: 0,
            y: 40,
            scale: 0.9,
            ease: "power3.out"
        });
        
        ScrollTrigger.create({
            trigger: credoText,
            start: 'top 60%',
            onEnter: () => {
                gsap.to(credoText, {
                    duration: 1,
                    textShadow: '0 0 25px rgba(192, 192, 192, 0.8)',
                    ease: "power2.out"
                });
            }
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
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            delay: i * 0.1
        });
    });
    
    // Zitat Animation
    const zitat = document.querySelector('.zitat');
    if (zitat) {
        gsap.from(zitat, {
            scrollTrigger: {
                trigger: zitat,
                start: 'top 80%'
            },
            duration: 1.2,
            opacity: 0,
            x: -30,
            borderLeftWidth: 8,
            ease: "power3.out"
        });
    }
}

// ==================== 8. SOCIAL MEDIA EFFECTS ====================
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
            duration: 0.8,
            opacity: 0,
            y: 20,
            delay: index * 0.08,
            ease: "back.out(1.7)"
        });
        
        // Hover Animation
        link.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.2,
                    rotate: 10,
                    filter: 'drop-shadow(0 0 15px rgba(192, 192, 192, 0.6))',
                    ease: "back.out(1.7)"
                });
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            const icon = target.querySelector('.social-icon-wrapper');
            
            if (icon) {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    rotate: 0,
                    filter: 'drop-shadow(0 0 0px rgba(192, 192, 192, 0))',
                    ease: "power2.in"
                });
            }
        });
    });
}

// ==================== 9. SPECIAL EFFECTS ====================
function initSilberEffects() {
    // Silberne Schimmer-Effekte
    const highlightTexts = document.querySelectorAll('.highlight, .lead-text, .sub-lead-text');
    highlightTexts.forEach(text => {
        gsap.to(text, {
            duration: 2,
            textShadow: '0 0 10px rgba(192, 192, 192, 0.4)',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    });
    
    // CTA Container Glow
    const ctaContainer = document.querySelector('.cta-container');
    if (ctaContainer) {
        gsap.to(ctaContainer, {
            scrollTrigger: {
                trigger: ctaContainer,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            boxShadow: '0 0 40px rgba(192, 192, 192, 0.1)',
            ease: "power2.out"
        });
    }
}

// ==================== 10. HILFSFUNKTIONEN ====================
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

function createButtonShine(button) {
    const shine = document.createElement('div');
    shine.className = 'button-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 60%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            rgba(255, 255, 255, 0.4), 
            rgba(255, 255, 255, 0.2), 
            transparent);
        transform: skewX(-20deg);
        pointer-events: none;
        z-index: 1;
    `;
    
    button.appendChild(shine);
    
    gsap.to(shine, {
        duration: 0.8,
        left: '150%',
        ease: "power2.inOut",
        onComplete: () => {
            if (shine.parentElement) {
                shine.parentElement.removeChild(shine);
            }
        }
    });
}

function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==================== 11. ERROR HANDLING ====================
if (typeof gsap === 'undefined') {
    console.warn('GSAP ist nicht geladen. Verwende vereinfachte Animationen.');
    
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            const typeText = document.getElementById('type-text');
            if (typeText) {
                typeText.textContent = "MATTHIAS SILBERHAIN";
            }
            
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
