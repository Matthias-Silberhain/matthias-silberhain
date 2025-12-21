// ============================================================================
// HAUPTINITIALISIERUNG - KONTROLLIERT ALLE KOMPONENTEN
// ============================================================================

(function() {
    'use strict';
    
    console.log('🚀 Hauptinitialisierung startet...');
    
    // INITIALISIERUNGSREIHENFOLGE
    const initQueue = [
        { name: 'Footer Jahr', func: window.updateFooterYear },
        { name: 'Dark Mode', func: window.initDarkMode },
        { name: 'Mobile Menu', func: window.initMobileMenu },
        { name: 'Preloader', func: window.initPreloader, delay: 50 },
        { name: 'Karussell', func: window.initKarussell },
        { name: 'Bewertungssystem', func: window.initBewertungssystem }
    ];
    
    // INITIALISIERUNGSLÄUFER
    function runInitialization() {
        console.log('🔄 Starte Initialisierungsqueue...');
        
        initQueue.forEach((item, index) => {
            setTimeout(() => {
                try {
                    console.log(`⚡ Initialisiere: ${item.name}`);
                    const success = item.func ? item.func() : false;
                    console.log(`✅ ${item.name}: ${success ? 'Erfolgreich' : 'Übersprungen'}`);
                } catch (error) {
                    console.error(`❌ Fehler bei ${item.name}:`, error);
                }
            }, item.delay || 0 + (index * 20)); // Kleine Verzögerung zwischen jedem
        });
        
        console.log('🎉 Alle Initialisierungen gestartet');
    }
    
    // DOM BEREIT?
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runInitialization);
    } else {
        // DOM bereits geladen
        setTimeout(runInitialization, 100);
    }
    
    // GLOBALE FEHLERBEHANDLUNG
    window.addEventListener('error', function(e) {
        console.error('⚠️ Globaler Fehler:', e.message, 'in', e.filename, 'Zeile', e.lineno);
    });
    
})();
