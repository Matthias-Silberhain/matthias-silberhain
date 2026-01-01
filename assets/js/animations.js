// animations.js

// Warten, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // GSAP Plugins registrieren
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Preloader Animation
    const preloader = document.getElementById('preloader');
    const typeTextElement = document.getElementById('type-text');

    if (preloader && typeTextElement) {
        // Text-Animation mit GSAP
        const text = "Matthias Silberhain";
        let tl = gsap.timeline();

        // Typing-Effekt
        tl.to(typeTextElement, {
            duration: 2,
            text: {
                value: text,
                delimiter: ""
            },
            ease: "power2.out"
        });

        // Preloader ausblenden
        tl.to(preloader, {
            duration: 1,
            opacity: 0,
            onComplete: function() {
                preloader.style.display = 'none';
            }
        });
    }

    // Silberne Hover-Effekte für Navigation
    const navLinks = document.querySelectorAll('.hauptnavigation a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                color: '#c0c0c0', // Silber
                textShadow: '0 0 10px rgba(192, 192, 192, 0.5)',
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                color: '#ffffff', // Weiß (oder Ihre Standardfarbe)
                textShadow: 'none',
                ease: "power2.out"
            });
        });
    });

    // Silberne Hover-Effekte für Buttons
    const buttons = document.querySelectorAll('.silber-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: '0 0 20px rgba(192, 192, 192, 0.7)',
                borderColor: '#c0c0c0',
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: 'none',
                borderColor: '#ffffff', // oder Ihre Standardfarbe
                ease: "power2.out"
            });
        });
    });

    // Scroll-Animationen für Elemente
    gsap.utils.toArray('.kerninhalt p').forEach((paragraph, i) => {
        gsap.from(paragraph, {
            scrollTrigger: {
                trigger: paragraph,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power3.out"
        });
    });

    // Silberne Lichtkante Animation
    const lichtkante = document.querySelector('.lichtkante');
    if (lichtkante) {
        gsap.to(lichtkante, {
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            },
            backgroundPosition: '0% 100%',
            ease: "none"
        });
    }
});
