// ============================================================================
// KARUSSELL & BEWERTUNG - OPTIMIERT & KONFLIKTFREI
// ============================================================================

(function() {
    'use strict';
    
    // 1. KARUSSELL
    window.initKarussell = function() {
        const track = document.querySelector('.karussell-track');
        const items = document.querySelectorAll('.karussell-item');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.karussell-btn.prev');
        const nextBtn = document.querySelector('.karussell-btn.next');
        
        if (!track || items.length === 0) {
            console.warn('⚠️ Karussell nicht gefunden (nicht auf dieser Seite)');
            return false;
        }
        
        let currentIndex = 0;
        let autoRotateInterval = null;
        
        // UPDATE KARUSSELL
        function updateKarussell() {
            // Track bewegen
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Items aktivieren/deaktivieren
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            // Dots aktualisieren
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // NÄCHSTES SLIDE
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateKarussell();
        }
        
        // VORHERIGES SLIDE
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateKarussell();
        }
        
        // AUTO ROTATE
        function startAutoRotate() {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextSlide, 8000);
        }
        
        function stopAutoRotate() {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        }
        
        // EVENT LISTENER
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateKarussell();
                startAutoRotate(); // Reset timer bei manueller Navigation
            });
        });
        
        // HOVER CONTROLS
        track.addEventListener('mouseenter', stopAutoRotate);
        track.addEventListener('mouseleave', startAutoRotate);
        track.addEventListener('touchstart', stopAutoRotate);
        track.addEventListener('touchend', startAutoRotate);
        
        // INITIALISIERUNG
        updateKarussell();
        startAutoRotate();
        
        console.log('✅ Karussell initialisiert');
        return true;
    };
    
    // 2. BEWERTUNGSSYSTEM
    window.initBewertungssystem = function() {
        const sterneContainer = document.getElementById('bewertungsSterne');
        const sendenBtn = document.getElementById('bewertungAbsenden');
        
        if (!sterneContainer || !sendenBtn) {
            console.warn('⚠️ Bewertungssystem nicht gefunden (nicht auf dieser Seite)');
            return false;
        }
        
        // LOKALE DATEN
        let bewertungen = JSON.parse(localStorage.getItem('ms-werke-bewertungen')) || {
            durchschnitt: 0,
            anzahl: 0,
            sterneListe: []
        };
        
        let aktuelleBewertung = 0;
        
        // STERNE AKTUALISIEREN
        function updateSterneAnzeige() {
            const sterne = sterneContainer.querySelectorAll('.stern');
            sterne.forEach((stern, index) => {
                stern.classList.toggle('active', index < aktuelleBewertung);
                stern.classList.toggle('hovered', false);
            });
            
            const bewertungswert = document.querySelector('.bewertungs-wert');
            if (bewertungswert) bewertungswert.textContent = aktuelleBewertung;
        }
        
        // STERNE EVENT LISTENER
        const sterne = sterneContainer.querySelectorAll('.stern');
        sterne.forEach(star => {
            const value = parseInt(star.dataset.value);
            
            star.addEventListener('click', () => {
                aktuelleBewertung = value;
                updateSterneAnzeige();
            });
            
            star.addEventListener('mouseover', () => {
                sterne.forEach((s, index) => {
                    s.classList.toggle('hovered', index < value);
                });
            });
            
            star.addEventListener('mouseout', () => {
                sterne.forEach(s => s.classList.remove('hovered'));
            });
        });
        
        // BEWERTUNG ABSENDEN
        function absendenBewertung() {
            if (aktuelleBewertung === 0) {
                alert('Bitte geben Sie zuerst eine Bewertung ab (1-5 Sterne).');
                return;
            }
            
            const selectedBuch = document.querySelector('input[name="bewertetesBuch"]:checked');
            const buchName = selectedBuch ? selectedBuch.nextElementSibling.textContent : 'Unbekannt';
            
            // Neue Bewertung speichern
            bewertungen.sterneListe.push(aktuelleBewertung);
            bewertungen.anzahl = bewertungen.sterneListe.length;
            
            // Durchschnitt berechnen
            const summe = bewertungen.sterneListe.reduce((a, b) => a + b, 0);
            bewertungen.durchschnitt = (summe / bewertungen.anzahl).toFixed(1);
            
            // In localStorage speichern
            try {
                localStorage.setItem('ms-werke-bewertungen', JSON.stringify(bewertungen));
            } catch (e) {
                console.warn('⚠️ localStorage nicht verfügbar');
            }
            
            // Statistik aktualisieren
            updateStatistik();
            
            // Erfolgsmeldung
            alert(`Vielen Dank für Ihre ${aktuelleBewertung}-Sterne-Bewertung!\nBuch: ${buchName}`);
            
            // Zurücksetzen
            aktuelleBewertung = 0;
            updateSterneAnzeige();
        }
        
        // STATISTIK AKTUALISIEREN
        function updateStatistik() {
            const statistikZahl = document.querySelector('.statistik-zahl');
            const durchschnittElement = document.querySelector('.durchschnitt');
            
            if (statistikZahl) statistikZahl.textContent = bewertungen.anzahl;
            if (durchschnittElement) durchschnittElement.textContent = bewertungen.durchschnitt;
        }
        
        // EVENT LISTENER FÜR BUTTON
        sendenBtn.addEventListener('click', absendenBewertung);
        
        // ENTER-TASTE AUF BUTTON
        sendenBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') absendenBewertung();
        });
        
        // INITIALISIERUNG
        updateSterneAnzeige();
        updateStatistik();
        
        console.log('✅ Bewertungssystem initialisiert');
        return true;
    };
    
})();
