// assets/js/animations.js
// Extravagante Silber-Animationen für Matthias Silberhain

// GSAP Plugins registrieren
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Silber-Animationen werden geladen...');
    
    // Preloader Animation
    initPreloader();
    
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
});

// 1. SPEKTAKULÄRER PRELOADER
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const typeText = document.getElementById('type-text');
    
    if (!preloader || !typeText) return;
    
    // Silberne Partikel erstellen
    createSilberParticles(preloader);
    
    // Text Animation Sequence
    const texts = [
        "MATTHIAS",
        "SILBERHAIN",
        "AUTOR"
    ];
    
    let tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power3.out" } });
    
    // Text Typing Animation
    texts.forEach((text, index) => {
        tl.to(typeText, {
            text: {
                value: text,
                delimiter: ""
            },
            onStart: () => {
                // Silber-Glow Effekt
                gsap.to(typeText, {
                    duration: 0.5,
                    textShadow: "0 0 20px rgba(192, 192, 192, 0.8)",
                    yoyo: true,
                    repeat: 1
                });
            }
        });
        
        if (index < texts.length - 1) {
            tl.to(typeText, { duration: 0.3, opacity: 0.3 });
        }
    });
    
    // Logo Animation
    const logo = document.querySelector('.preloader-logo');
    if (logo) {
        gsap.from(logo, {
            duration: 2,
            scale: 0.5,
            rotation: 360,
            ease: "back.out(1.7)",
            filter: "drop-shadow(0 0 30px rgba(192, 192, 192, 0.8))"
        });
        
        // Pulsierender Glow
        gsap.to(logo, {
            duration: 1.5,
            scale: 1.1,
            filter: "drop-shadow(0 0 40px rgba(192, 192, 192, 1))",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    // Progress Bar
    const progressBar = document.querySelector('.loader-progress');
    if (progressBar) {
        gsap.to(progressBar, {
            duration: 4,
            width: "100%",
            ease: "power2.inOut",
            onComplete: removePreloader
        });
    } else {
        setTimeout(removePreloader, 4000);
    }
    
    function removePreloader() {
        tl.to(preloader, {
            duration: 1,
            opacity: 0,
            ease: "power3.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                
                // Content erscheinen lassen
                gsap.from('main', {
                    duration: 1.2,
                    opacity: 0,
                    y: 30,
                    ease: "power3.out"
                });
            }
        });
    }
}

// 2. NAVIGATION ANIMATIONEN
function initNavigation() {
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    
    navLinks.forEach(link => {
        // Hover Effekt
        link.addEventListener('mouseenter', (e) => {
            gsap.to(e.target, {
                duration: 0.3,
                color: '#c0c0c0',
                letterSpacing: '2px',
                textShadow: '0 0 15px rgba(192, 192, 192, 0.7)',
                ease: "power2.out"
            });
            
            // Silberne Linie
            createSilberLine(e.target);
        });
        
        link.addEventListener('mouseleave', (e) => {
            gsap.to(e.target, {
                duration: 0.4,
                color: '#ffffff',
                letterSpacing: 'normal',
                textShadow: 'none',
                ease: "power2.in"
            });
        });
    });
}

// 3. BUTTON ANIMATIONEN
function initButtons() {
    const buttons = document.querySelectorAll('.silber-button');
    
    buttons.forEach(button => {
        // Hover Animation
        button.addEventListener('mouseenter', (e) => {
            gsap.to(e.target, {
                duration: 0.4,
                scale: 1.05,
                boxShadow: '0 15px 35px rgba(192, 192, 192, 0.4)',
                borderColor: '#f0f0f0',
                ease: "back.out(1.7)"
            });
            
            // Pfeil Animation
            const arrow = button.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 10,
                    ease: "power2.out"
                });
            }
        });
        
        button.addEventListener('mouseleave', (e) => {
            gsap.to(e.target, {
                duration: 0.3,
                scale: 1,
                boxShadow: 'none',
                borderColor: '#c0c0c0',
                ease: "power2.in"
            });
            
            const arrow = button.querySelector('.button-arrow');
            if (arrow) {
                gsap.to(arrow, {
                    duration: 0.3,
                    x: 0,
                    ease: "power2.in"
                });
            }
        });
        
        // Click Effect
        button.addEventListener('click', (e) => {
            gsap.to(e.target, {
                duration: 0.1,
                scale: 0.95,
                ease: "power2.in",
                onComplete: () => {
                    gsap.to(e.target, {
                        duration: 0.2,
                        scale: 1,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            // Ripple Effect
            createRipple(e);
        });
    });
}

// 4. SCROLL ANIMATIONEN
function initScrollAnimations() {
    // Text Absätze
    gsap.utils.toArray('.kerninhalt p').forEach((paragraph, i) => {
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
    
    // Zitat Highlight
    const zitat = document.querySelector('.zitat');
    if (zitat) {
        gsap.from(zitat, {
            scrollTrigger: {
                trigger: zitat,
                start: 'top 80%'
            },
            duration: 1.5,
            background: 'linear-gradient(90deg, rgba(192,192,192,0) 0%, rgba(192,192,192,0.1) 50%, rgba(192,192,192,0) 100%)',
            borderLeftWidth: 5,
            ease: "power2.out"
        });
    }
    
    // Credo Text
    const credoText = document.querySelector('.kalligrafie-text');
    if (credoText) {
        ScrollTrigger.create({
            trigger: credoText,
            start: 'top center',
            onEnter: () => {
                gsap.to(credoText, {
                    duration: 2,
                    backgroundPosition: '200% 0',
                    ease: "power2.inOut"
                });
            }
        });
    }
}

// 5. SOCIAL MEDIA EFFECTS
function initSocialMedia() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // Staggered Appearance
        gsap.from(link, {
            scrollTrigger: {
                trigger: '.social-section',
                start: 'top 80%'
            },
            duration: 0.8,
            opacity: 0,
            y: 20,
            delay: index * 0.1,
            ease: "back.out(1.7)"
        });
        
        // Hover Animation
        link.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('.social-icon-wrapper');
            gsap.to(icon, {
                duration: 0.3,
                scale: 1.2,
                rotate: 360,
                ease: "back.out(1.7)"
            });
            
            // Name Glow
            const name = e.currentTarget.querySelector('.social-name');
            gsap.to(name, {
                duration: 0.3,
                color: '#c0c0c0',
                textShadow: '0 0 10px rgba(192,192,192,0.5)',
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('.social-icon-wrapper');
            gsap.to(icon, {
                duration: 0.3,
                scale: 1,
                rotate: 0,
                ease: "power2.in"
            });
            
            const name = e.currentTarget.querySelector('.social-name');
            gsap.to(name, {
                duration: 0.3,
                color: '#ffffff',
                textShadow: 'none',
                ease: "power2.in"
            });
        });
    });
}

// 6. SPEZIALEFFEKTE
function initSilberEffects() {
    // Lichtkante Animation
    const lichtkanten = document.querySelectorAll('.lichtkante');
    lichtkanten.forEach(kante => {
        gsap.to(kante, {
            duration: 3,
            backgroundPosition: '200% 0',
            repeat: -1,
            ease: "none"
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            start: 'top top',
            end: '+=100',
            onUpdate: (self) => {
                if (self.progress > 0) {
                    gsap.to(header, {
                        duration: 0.3,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(10, 10, 10, 0.9)',
                        boxShadow: '0 5px 30px rgba(192, 192, 192, 0.1)'
                    });
                } else {
                    gsap.to(header, {
                        duration: 0.3,
                        backdropFilter: 'none',
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    });
                }
            }
        });
    }
}

// HILFSFUNKTIONEN
function createSilberParticles(container) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'silber-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(192, 192, 192, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        container.appendChild(particle);
        
        // Animation
        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: 0,
            scale: 0,
            repeat: -1,
            delay: Math.random() * 2,
            ease: "power1.out"
        });
    }
}

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
                onComplete: () => line.remove()
            });
        }
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(192, 192, 192, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    gsap.to(ripple, {
        duration: 0.6,
        scale: 2,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Error Handling für GSAP
if (typeof gsap === 'undefined') {
    console.error('GSAP ist nicht geladen. Bitte binden Sie GSAP vor animations.js ein.');
} else {
    console.log('GSAP erfolgreich geladen. Silber-Animationen bereit.');
}
