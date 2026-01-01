/* ==========================================================================
   EXTRAVAGANTE ANIMATIONEN CSS
   ========================================================================== */

/* Preloader Extravaganz */
.preloader-inner {
    position: relative;
}

/* Logo Strahlen */
.logo-ray {
    animation: rayPulse 2s ease-in-out infinite;
}

@keyframes rayPulse {
    0%, 100% { opacity: 0.3; height: 80px; }
    50% { opacity: 0.8; height: 120px; }
}

/* Text Charaktere */
.char {
    display: inline-block;
    transition: all 0.3s ease;
}

/* Konfetti */
.confetti-piece {
    animation: confettiFall 3s ease-in-out forwards;
}

@keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

/* Schwebe-Partikel */
.floating-particle, .silver-particle {
    animation: float 15s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(10px, -10px); }
    50% { transform: translate(-5px, 5px); }
    75% { transform: translate(5px, 10px); }
}

/* Lichtstrahlen */
#light-beams {
    animation: beamRotate 40s linear infinite;
}

@keyframes beamRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Kalligrafie Glühen */
.kalligrafie-text {
    animation: textGlow 5s ease-in-out infinite;
}

@keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
    50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.3); }
}

/* Cursor Trail */
#cursor-trail {
    animation: trailPulse 2s ease-in-out infinite;
}

@keyframes trailPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
}

/* Hover Effekte */
.hauptnavigation a {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hauptnavigation a::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
    transition: left 0.6s ease;
}

.hauptnavigation a:hover::before {
    left: 100%;
}

/* Social Icon Animation */
.social-icon-wrapper {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-link:hover .social-icon-wrapper {
    animation: iconBounce 0.6s ease;
}

@keyframes iconBounce {
    0%, 100% { transform: scale(1); }
    30% { transform: scale(1.3); }
    70% { transform: scale(0.9); }
}

/* Mobile Optimierung */
@media screen and (max-width: 768px) {
    .logo-ray,
    .floating-particle,
    .silver-particle,
    #light-beams,
    #cursor-trail {
        display: none !important;
    }
    
    .char {
        animation: none !important;
    }
}

/* Performance Optimierung */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
