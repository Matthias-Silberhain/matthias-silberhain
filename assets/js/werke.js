// ============================================================================
// WERKE.JS - Karussell und einfaches Bewertungssystem
// ============================================================================

(function() {
    'use strict';
    
    console.log('📚 Werke Script geladen');
    
    // 1. KARUSSELL FUNKTIONALITÄT
    function initKarussell() {
        const track = document.querySelector('.karussell-track');
        const items = document.querySelectorAll('.karussell-item');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.karussell-btn.prev');
        const nextBtn = document.querySelector('.karussell-btn.next');
        
        if (!track || items.length === 0) {
            console.log('⚠️ Karussell Elemente nicht gefunden');
            return;
        }
        
        let currentIndex = 0;
        
        // Karussell aktualisieren
        function updateKarussell() {
            // Track position verschieben
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Items aktivieren/deaktivieren
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            // Dots aktualisieren
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            console.log('🔄 Karussell aktualisiert auf Index:', currentIndex);
        }
        
        // Nächstes Buch
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateKarussell();
        }
        
        // Vorheriges Buch
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateKarussell();
        }
        
        // Event Listener für Buttons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Event Listener für Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateKarussell();
            });
        });
        
        // Auto-Rotate (optional)
        let autoRotateInterval = setInterval(nextSlide, 8000);
        
        // Auto-Rotate stoppen bei Hover
        track.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });
        
        track.addEventListener('mouseleave', () => {
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextSlide, 8000);
        });
        
        console.log('✅ Karussell initialisiert');
    }
    
    // 2. EINFACHES BEWERTUNGSSYSTEM (nur Sterne)
    function initBewertungssystem() {
        const sterneContainer = document.getElementById('bewertungsSterne');
        const bewertungswert = document.querySelector('.bewertungs-wert');
        const sendenBtn = document.getElementById('bewertungAbsenden');
        
        if (!sterneContainer) {
            console.log('⚠️ Bewertungssystem nicht gefunden');
            return;
        }
        
        // Bewertungen aus localStorage laden oder initialisieren
        let bewertungen = JSON.parse(localStorage.getItem('ms-werke-bewertungen')) || {
            durchschnitt: 4.2,
            anzahl: 0,
            sterneListe: []
        };
        
        let aktuelleBewertung = 0;
        
        // Sterne aktualisieren
        function updateSterneAnzeige() {
            const sterne = sterneContainer.querySelectorAll('.stern');
            
            sterne.forEach((stern, index) => {
                if (index < aktuelleBewertung) {
                    stern.classList.add('active');
                    stern.classList.remove('hovered');
                } else {
                    stern.classList.remove('active', 'hovered');
                }
            });
            
            if (bewertungswert) {
                bewertungswert.textContent = aktuelleBewertung;
            }
        }
        
        // Sterne Event Listener
        const sterne = sterneContainer.querySelectorAll('.stern');
        sterne.forEach(star => {
            star.addEventListener('click', (e) => {
                aktuelleBewertung = parseInt(e.target.dataset.value);
                updateSterneAnzeige();
                console.log('⭐ Bewertung:', aktuelleBewertung, 'Sterne');
            });
            
            star.addEventListener('mouseover', (e) => {
                const hoverValue = parseInt(e.target.dataset.value);
                const tempSterne = sterneContainer.querySelectorAll('.stern');
                
                tempSterne.forEach((s, index) => {
                    if (index < hoverValue) {
                        s.classList.add('hovered');
                    } else {
                        s.classList.remove('hovered');
                    }
                });
            });
            
            star.addEventListener('mouseout', () => {
                const tempSterne = sterneContainer.querySelectorAll('.stern');
                tempSterne.forEach(s => s.classList.remove('hovered'));
            });
        });
        
        // Bewertung absenden
        if (sendenBtn) {
            sendenBtn.addEventListener('click', () => {
                if (aktuelleBewertung === 0) {
                    alert('Bitte geben Sie zuerst eine Bewertung ab, indem Sie auf die Sterne klicken.');
                    return;
                }
                
                // Buchauswahl ermitteln
                const selectedBuch = document.querySelector('input[name="bewertetesBuch"]:checked');
                const buchName = selectedBuch ? selectedBuch.nextElementSibling.textContent : 'Unbekannt';
                
                // Neue Bewertung speichern
                bewertungen.sterneListe.push(aktuelleBewertung);
                bewertungen.anzahl = bewertungen.sterneListe.length;
                
                // Durchschnitt neu berechnen
                const summe = bewertungen.sterneListe.reduce((a, b) => a + b, 0);
                bewertungen.durchschnitt = (summe / bewertungen.anzahl).toFixed(1);
                
                // In localStorage speichern
                localStorage.setItem('ms-werke-bewertungen', JSON.stringify(bewertungen));
                
                // Erfolgsmeldung
                alert(`Vielen Dank für Ihre Bewertung!\n\nIhre Bewertung: ${aktuelleBewertung} Sterne\nBewertetes Buch: ${buchName}`);
                
                // Statistik aktualisieren
                updateStatistik();
                
                // Zurücksetzen
                aktuelleBewertung = 0;
                updateSterneAnzeige();
            });
        }
        
        // Statistik aktualisieren
        function updateStatistik() {
            const statistikZahl = document.querySelector('.statistik-zahl');
            const durchschnittElement = document.querySelector('.durchschnitt');
            const kommentareZahl = document.querySelector('.statistik-item:nth-child(3) .statistik-zahl');
            
            if (statistikZahl) statistikZahl.textContent = bewertungen.anzahl;
            if (durchschnittElement) durchschnittElement.textContent = bewertungen.durchschnitt;
            if (kommentareZahl) kommentareZahl.textContent = '0'; // Keine Kommentare mehr
        }
        
        // Initiale Anzeige aktualisieren
        updateSterneAnzeige();
        updateStatistik();
        
        console.log('✅ Bewertungssystem initialisiert');
    }
    
    // 3. HAUPTFUNKTION
    function initAll() {
        console.log('🚀 Starte Werke Initialisierung...');
        
        try {
            initKarussell();
            initBewertungssystem();
            
            console.log('✅ Werke komplett initialisiert');
        } catch (error) {
            console.error('❌ Fehler bei Werke Initialisierung:', error);
        }
    }
    
    // 4. STARTE INITIALISIERUNG
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        setTimeout(initAll, 100);
    }
    
})();
