/**
 * EXTRAVAGANTE SILBER ANIMATIONEN - Matthias Silberhain
 * Nur Silber/Weiß Effekte - GSAP Loading Fix
 */

class SilberAnimationen {
    constructor() {
        this.gsapLoaded = false;
        this.init();
    }

    init() {
        // Warte auf DOM und lade GSAP
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadGSAP());
        } else {
            this.loadGSAP();
        }
    }

    loadGSAP() {
        // Prüfe ob GSAP bereits geladen ist
        if (typeof gsap !== 'undefined') {
            this.gsapLoaded = true;
            this.startAnimationen();
            return;
        }

        // Lade GSAP dynamisch
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        gsapScript.onload = () => {
            console.log('✅ GSAP geladen');
            this.gsapLoaded = true;
            this.startAnimationen();
        };
        gsapScript.onerror = () => {
            console.error('❌ GSAP konnte nicht geladen werden');
            this.startFallbackAnimationen();
        };
        
        document.head.appendChild(gsapScript);
    }

    startAnimationen() {
        if (!this.gsapLoaded) return;

        // Preloader Animation
        this.preloaderSpektakel();
        
        // Hauptseiten Animationen
        setTimeout(() => {
            this.hauptAnimationen();
        }, 4000);
    }

    preloaderSpektakel() {
        const preloader = document.getElementById('preloader');
        const typeText = document.getElementById('type-text');
        const preloaderLogo = document.querySelector('.preloader-logo');
        
        if (!preloader || !typeText || !preloaderLogo) {
            console.error('Preloader Elemente nicht gefunden');
            return;
        }

        console.log('✨ Silber-Preloader startet');

        // 1. Logo erscheint
        gsap.fromTo(preloaderLogo, 
            {
                scale: 0,
                rotation: -180,
                opacity: 0,
                filter: 'blur(20px) brightness(0)'
            },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                filter: 'blur(0px) brightness(1.3)',
                duration: 1.8,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.5
            }
        );

        // 2. Typing Effekt mit Silber-Glitzer
        this.typingEffekt(typeText);

        // 3. Preloader ausblenden
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    console.log('✅ Preloader ausgeblendet');
                }
            });
        }, 3500);
    }

    typingEffekt(element) {
        const text = "MATTHIAS SILBERHAIN";
        element.innerHTML = '';
        
        // Jeden Buchstaben einzeln erstellen
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'silber-char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                color: #FFFFFF;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            `;
            element.appendChild(span);
            
            // Verzögerte Animation für jeden Buchstaben
            setTimeout(() => {
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        // Silber Glitzer bei jedem Buchstaben
                        this.createSilberGlitzer(span);
                    }
                });
            }, 100 + (i * 80));
        });
    }

    createSilberGlitzer(element) {
        // Erstelle 2-3 Silber-Glitzer Partikel
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const spark = document.createElement('div');
                
                spark.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: #FFFFFF;
                    border-radius: 50%;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    pointer-events: none;
                    z-index: 9998;
                    filter: blur(1px);
                    box-shadow: 0 0 8px #FFFFFF;
                `;
                
                document.body.appendChild(spark);
                
                // Glitzer-Animation
                gsap.to(spark, {
                    x: (Math.random() - 0.5) * 40,
                    y: (Math.random() - 0.5) * 40,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => spark.remove()
                });
            }, i * 100);
        }
    }

    hauptAnimationen() {
        console.log('🎭 Haupt-Animationen starten');
        
        // Logo Schwebe-Animation
        this.logoAnimation();
        
        // Text Animationen
        this.textAnimationen();
        
        // Hover Effekte
        this.hoverEffekte();
        
        // Silberne Partikel im Hintergrund
        this.silberPartikel();
    }

    logoAnimation() {
        const logo = document.querySelector('.logo');
        if (!logo) return;
        
        // Sanftes Schweben
        gsap.to(logo, {
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Periodischer Glanz-Effekt
        setInterval(() => {
            gsap.to(logo, {
                filter: 'brightness(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
                duration: 0.6,
                yoyo: true,
                repeat: 1
            });
        }, 8000);
    }

    textAnimationen() {
        // Kalligrafie Text pulsiert
        const kalligrafie = document.querySelector('.kalligrafie-text');
        if (kalligrafie) {
            gsap.to(kalligrafie, {
                textShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
        
        // Inhaltselemente nacheinander einblenden
        gsap.utils.toArray('.inhalt > *').forEach((element, i) => {
            gsap.from(element, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power2.out'
            });
        });
    }

    hoverEffekte() {
        // Navigation Hover
        document.querySelectorAll('.hauptnavigation a').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                gsap.to(e.target, {
                    scale: 1.1,
                    color: '#FFFFFF',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
                
                // Silberne Unterstreichung
                const underline = document.createElement('div');
                underline.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #FFFFFF, transparent);
                    transform: scaleX(0);
                    transform-origin: center;
                `;
                e.target.appendChild(underline);
                
                gsap.to(underline, {
                    scaleX: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            link.addEventListener('mouseleave', (e) => {
                gsap.to(e.target, {
                    scale: 1,
                    color: '',
                    textShadow: '',
                    duration: 0.3
                });
                
                const underline = e.target.querySelector('div');
                if (underline) {
                    gsap.to(underline, {
                        scaleX: 0,
                        duration: 0.3,
                        onComplete: () => underline.remove()
                    });
                }
            });
        });
        
        // Social Media Icons
        document.querySelectorAll('.social-link').forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                const iconWrapper = e.currentTarget.querySelector('.social-icon-wrapper');
                if (iconWrapper) {
                    gsap.to(iconWrapper, {
                        scale: 1.15,
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                }
                
                const svg = e.currentTarget.querySelector('svg');
                if (svg) {
                    gsap.to(svg, {
                        fill: '#FFFFFF',
                        duration: 0.3
                    });
                }
            });
            
            icon.addEventListener('mouseleave', (e) => {
                const iconWrapper = e.currentTarget.querySelector('.social-icon-wrapper');
                if (iconWrapper) {
                    gsap.to(iconWrapper, {
                        scale: 1,
                        borderColor: '',
                        backgroundColor: '',
                        duration: 0.3
                    });
                }
                
                const svg = e.currentTarget.querySelector('svg');
                if (svg) {
                    gsap.to(svg, {
                        fill: '',
                        duration: 0.3
                    });
                }
            });
        });
        
        // CTA Buttons
        document.querySelectorAll('.silber-button').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                gsap.to(e.currentTarget, {
                    scale: 1.05,
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
                
                const arrow = e.currentTarget.querySelector('.button-arrow');
                if (arrow) {
                    gsap.to(arrow, {
                        x: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            button.addEventListener('mouseleave', (e) => {
                gsap.to(e.currentTarget, {
                    scale: 1,
                    borderColor: '',
                    backgroundColor: '',
                    duration: 0.3
                });
                
                const arrow = e.currentTarget.querySelector('.button-arrow');
                if (arrow) {
                    gsap.to(arrow, {
                        x: 0,
                        duration: 0.3
                    });
                }
            });
        });
    }

    silberPartikel() {
        // Nur auf Desktop
        if (window.innerWidth < 768) return;
        
        const container = document.createElement('div');
        container.id = 'silber-particles';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        
        // Erstelle 50 silberne Partikel
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'silber-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 2 + 1}px;
                height: ${Math.random() * 2 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05});
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                filter: blur(${Math.random()}px);
            `;
            
            container.appendChild(particle);
            
            // Sanfte Bewegung
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 5
            });
        }
    }

    startFallbackAnimationen() {
        console.log('Fallback Animationen (ohne GSAP)');
        
        // Einfache CSS-Animationen
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 1500);
        }
    }
}

// Initialisierung
new SilberAnimationen();
