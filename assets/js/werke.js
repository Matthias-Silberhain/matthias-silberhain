// ============================================================================
// WERKE.JS - Karussell und Buch-spezifisches Bewertungssystem
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
        
        // Funktion zum Aktualisieren des aktiven Buches im Bewertungssystem
        function updateAktivesBuch() {
            const aktivesItem = items[currentIndex];
            const buchId = aktivesItem.dataset.buchId;
            const buchTitel = aktivesItem.querySelector('.buch-info h3').textContent;
            const buchUntertitel = aktivesItem.querySelector('.untertitel').textContent;
            
            // Buch-Info im Bewertungssystem aktualisieren
            const titelElement = document.getElementById('aktuellesBuchTitel');
            const untertitelElement = document.getElementById('aktuellesBuchUntertitel');
            
            if (titelElement) titelElement.textContent = buchTitel;
            if (untertitelElement) untertitelElement.textContent = buchUntertitel;
            
            // Bewertungen für dieses Buch laden
            ladeBewertungen(buchId);
            
            console.log(`🔄 Aktives Buch geändert: ${buchTitel} (${buchId})`);
        }
        
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
            
            // Aktives Buch im Bewertungssystem aktualisieren
            updateAktivesBuch();
            
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
    
    // 2. BUCHSPEZIFISCHES BEWERTUNGSSYSTEM (Client-seitig mit localStorage)
    function initBewertungssystem() {
        const sterneContainer = document.querySelector('.sterne');
        const bewertungswert = document.querySelector('.bewertungs-wert');
        const anzahlBewertungen = document.querySelector('.anzahl-bewertungen');
        const durchschnittElement = document.querySelector('.durchschnitt');
        const kommentarTextarea = document.getElementById('leseprobeKommentar');
        const zeichenCount = document.querySelector('.zeichen-count');
        const sendenBtn = document.getElementById('kommentarSenden');
        
        if (!sterneContainer) {
            console.log('⚠️ Bewertungssystem nicht gefunden');
            return;
        }
        
        // Aktuelle Bewertung für das aktive Buch
        let aktuelleBewertung = 0;
        let aktuelleBuchId = '';
        
        // Bewertungen für das aktive Buch laden
        function ladeBewertungen(buchId) {
            aktuelleBuchId = buchId;
            const bewertungen = JSON.parse(localStorage.getItem(`ms-bewertungen-${buchId}`)) || {
                durchschnitt: 0,
                anzahl: 0,
                kommentare: []
            };
            
            // Anzeige aktualisieren
            if (bewertungswert) bewertungswert.textContent = '0';
            if (anzahlBewertungen) anzahlBewertungen.textContent = bewertungen.anzahl;
            if (durchschnittElement) durchschnittElement.textContent = bewertungen.durchschnitt;
            
            // Sterne zurücksetzen
            aktuelleBewertung = 0;
            updateSterneAnzeige();
            
            console.log(`📊 Bewertungen für Buch ${buchId} geladen:`, bewertungen);
        }
        
        // Sterne aktualisieren
        function updateSterneAnzeige() {
            const sterne = sterneContainer.querySelectorAll('.stern');
            
            sterne.forEach((stern, index) => {
                if (index < aktuelleBewertung) {
                    stern.style.color = '#ffd700'; // Gold für aktive Sterne
                    stern.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                } else {
                    stern.style.color = '#666'; // Grau für inaktive Sterne
                    stern.style.textShadow = 'none';
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
                console.log('⭐ Bewertung:', aktuelleBewertung, 'Sterne für', aktuelleBuchId);
            });
            
            star.addEventListener('mouseover', (e) => {
                const hoverValue = parseInt(e.target.dataset.value);
                const tempSterne = sterneContainer.querySelectorAll('.stern');
                
                tempSterne.forEach((s, index) => {
                    if (index < hoverValue) {
                        s.style.color = '#ffd700';
                        s.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                    } else {
                        s.style.color = '#666';
                        s.style.textShadow = 'none';
                    }
                });
            });
            
            star.addEventListener('mouseout', () => {
                updateSterneAnzeige();
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
        
        // Kommentar senden
        if (sendenBtn) {
            sendenBtn.addEventListener('click', () => {
                if (aktuelleBewertung === 0) {
                    alert('Bitte geben Sie zuerst eine Bewertung ab, indem Sie auf die Sterne klicken.');
                    return;
                }
                
                if (!aktuelleBuchId) {
                    alert('Kein Buch ausgewählt. Bitte wählen Sie ein Buch im Karussell aus.');
                    return;
                }
                
                const kommentar = kommentarTextarea ? kommentarTextarea.value.trim() : '';
                
                // Bewertungen für das aktuelle Buch laden
                let bewertungen = JSON.parse(localStorage.getItem(`ms-bewertungen-${aktuelleBuchId}`)) || {
                    durchschnitt: 0,
                    anzahl: 0,
                    kommentare: []
                };
                
                // Neue Bewertung berechnen
                bewertungen.anzahl++;
                bewertungen.durchschnitt = (
                    (bewertungen.durchschnitt * (bewertungen.anzahl - 1) + aktuelleBewertung) / 
                    bewertungen.anzahl
                ).toFixed(1);
                
                if (kommentar) {
                    bewertungen.kommentare.push({
                        text: kommentar,
                        sterne: aktuelleBewertung,
                        datum: new Date().toISOString()
                    });
                }
                
                // In localStorage speichern
                localStorage.setItem(`ms-bewertungen-${aktuelleBuchId}`, JSON.stringify(bewertungen));
                
                // Erfolgsmeldung
                alert(`Vielen Dank für Ihre Bewertung!\n\nIhre Bewertung: ${aktuelleBewertung} Sterne\nGesamtdurchschnitt: ${bewertungen.durchschnitt} Sterne\nAnzahl Bewertungen: ${bewertungen.anzahl}`);
                
                // Anzeige aktualisieren
                if (anzahlBewertungen) anzahlBewertungen.textContent = bewertungen.anzahl;
                if (durchschnittElement) durchschnittElement.textContent = bewertungen.durchschnitt;
                
                // Zurücksetzen
                if (kommentarTextarea) {
                    kommentarTextarea.value = '';
                    zeichenCount.textContent = '0/500 Zeichen';
                    zeichenCount.style.color = '#b0b5bc';
                }
                
                aktuelleBewertung = 0;
                updateSterneAnzeige();
                
                console.log(`✅ Bewertung für Buch ${aktuelleBuchId} gespeichert:`, bewertungen);
            });
        }
        
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
