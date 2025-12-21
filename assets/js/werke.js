// ============================================================================
// WERKE.JS - Karussell und Bewertungssystem
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
    
    // 2. BEWERTUNGSSYSTEM (Client-seitig mit localStorage)
    function initBewertungssystem() {
        const sterneContainer = document.getElementById('bewertungsSterne');
        const bewertungswert = document.querySelector('.bewertungs-wert');
        const kommentarTextarea = document.getElementById('werkeKommentar');
        const zeichenCount = document.querySelector('.zeichen-count');
        const sendenBtn = document.getElementById('bewertungAbsenden');
        
        if (!sterneContainer) {
            console.log('⚠️ Bewertungssystem nicht gefunden');
            return;
        }
        
        // Bewertung aus localStorage laden
        let bewertungen = JSON.parse(localStorage.getItem('ms-werke-bewertungen')) || {
            durchschnitt: 4.2,
            anzahl: 127,
            kommentare: []
        };
        
        // Aktuelle Bewertung
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
        
        // Zeichenzähler für Kommentar
        if (kommentarTextarea && zeichenCount) {
            kommentarTextarea.addEventListener('input', () => {
                const length = kommentarTextarea.value.length;
                zeichenCount.textContent = `${length}/500 Zeichen`;
                
                if (length > 500) {
                    kommentarTextarea.value = kommentarTextarea.value.substring(0, 500);
                    zeichenCount.textContent = '500/500 Zeichen';
                    zeichenCount.style.color = '#ff6b6b';
                } else if (length > 450) {
                    zeichenCount.style.color = '#ffa726';
                } else {
                    zeichenCount.style.color = '#b0b5bc';
                }
            });
        }
        
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
                
                const kommentar = kommentarTextarea ? kommentarTextarea.value.trim() : '';
                
                // Neue Bewertung berechnen
                bewertungen.anzahl++;
                bewertungen.durchschnitt = (
                    (bewertungen.durchschnitt * (bewertungen.anzahl - 1) + aktuelleBewertung) / 
                    bewertungen.anzahl
                ).toFixed(1);
                
                if (kommentar) {
                    bewertungen.kommentare.push({
                        buch: buchName,
                        text: kommentar,
                        sterne: aktuelleBewertung,
                        datum: new Date().toLocaleDateString('de-DE')
                    });
                }
                
                // In localStorage speichern
                localStorage.setItem('ms-werke-bewertungen', JSON.stringify(bewertungen));
                
                // Erfolgsmeldung
                alert(`Vielen Dank für Ihre Bewertung!\n\nIhre Bewertung: ${aktuelleBewertung} Sterne\nBewertetes Buch: ${buchName}\n\nIhr Feedback ist wertvoll für die weitere Entwicklung der Werke.`);
                
                // Statistik aktualisieren
                const statistikZahl = document.querySelector('.statistik-zahl');
                const durchschnittElement = document.querySelector('.durchschnitt');
                
                if (statistikZahl) statistikZahl.textContent = bewertungen.anzahl;
                if (durchschnittElement) durchschnittElement.textContent = bewertungen.durchschnitt;
                
                // Zurücksetzen
                if (kommentarTextarea) {
                    kommentarTextarea.value = '';
                    zeichenCount.textContent = '0/500 Zeichen';
                    zeichenCount.style.color = '#b0b5bc';
                }
                
                aktuelleBewertung = 0;
                updateSterneAnzeige();
                
                console.log('✅ Bewertung gespeichert:', bewertungen);
            });
        }
        
        // Initiale Anzeige aktualisieren
        updateSterneAnzeige();
        
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
