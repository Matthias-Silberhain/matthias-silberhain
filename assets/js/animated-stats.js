// assets/js/animated-stats.js

class AnimatedStats {
    constructor() {
        this.stats = {
            visitors: 0,
            bookSamples: 0,
            reviews: 0,
            downloads: 0,
            todayVisitors: 0,
            todayDownloads: 0,
            avgRating: 0.0,
            lastSampleDate: null,
            lastVisitDate: null
        };
        
        this.initializeStats();
        this.setupEventListeners();
    }
    
    initializeStats() {
        // Lade gespeicherte Stats aus LocalStorage
        const savedStats = localStorage.getItem('silberhain_stats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
        
        // Prüfe ob heutiger Besuch bereits gezählt wurde
        this.checkDailyVisitor();
        
        // Aktualisiere die Anzeige
        this.updateDisplay();
    }
    
    checkDailyVisitor() {
        const today = new Date().toDateString();
        const lastVisit = this.stats.lastVisitDate;
        
        if (lastVisit !== today) {
            // Neuer Besucher heute
            this.stats.visitors++;
            this.stats.todayVisitors = 1;
            this.stats.lastVisitDate = today;
            this.saveStats();
            
            // Animation für neuen Besucher
            this.animateCounter('visitorCount', this.stats.visitors);
            this.updateElement('visitorToday', `+${this.stats.todayVisitors} heute`);
        } else {
            // Heute schon da gewesen, nur Today-Counter erhöhen
            this.stats.todayVisitors++;
            this.updateElement('visitorToday', `+${this.stats.todayVisitors} heute`);
        }
    }
    
    incrementBookSamples() {
        this.stats.bookSamples++;
        this.stats.lastSampleDate = new Date().toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        this.saveStats();
        this.animateCounter('bookSamplesCount', this.stats.bookSamples);
        this.updateElement('lastSample', this.stats.lastSampleDate);
        
        // Card Animation
        this.pulseCard(1);
    }
    
    incrementReviews(rating = 5) {
        this.stats.reviews++;
        
        // Durchschnittliche Bewertung berechnen
        const totalRating = this.stats.avgRating * (this.stats.reviews - 1) + rating;
        this.stats.avgRating = parseFloat((totalRating / this.stats.reviews).toFixed(1));
        
        this.saveStats();
        this.animateCounter('reviewsCount', this.stats.reviews);
        this.updateElement('avgRating', this.stats.avgRating);
        
        // Card Animation
        this.pulseCard(2);
    }
    
    incrementDownloads() {
        this.stats.downloads++;
        this.stats.todayDownloads++;
        
        this.saveStats();
        this.animateCounter('downloadsCount', this.stats.downloads);
        this.updateElement('downloadsToday', `+${this.stats.todayDownloads} heute`);
        
        // Card Animation
        this.pulseCard(3);
    }
    
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const currentValue = parseInt(element.textContent) || 0;
        const duration = 1500; // 1.5 Sekunden
        const startTime = Date.now();
        
        element.classList.add('animating');
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing-Funktion für natürliche Bewegung
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(currentValue + (targetValue - currentValue) * easeOutQuart);
            
            element.textContent = current.toLocaleString('de-DE');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.classList.remove('animating');
                // Leichtes Glow-Effekt nach Abschluss
                element.classList.add('glow');
                setTimeout(() => element.classList.remove('glow'), 1000);
            }
        };
        
        animate();
    }
    
    pulseCard(cardIndex) {
        const cards = document.querySelectorAll('.stat-card');
        if (cards[cardIndex]) {
            cards[cardIndex].classList.add('pulse');
            setTimeout(() => {
                cards[cardIndex].classList.remove('pulse');
            }, 500);
        }
    }
    
    updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }
    
    updateDisplay() {
        // Alle Counter aktualisieren
        this.updateElement('visitorCount', this.stats.visitors.toLocaleString('de-DE'));
        this.updateElement('bookSamplesCount', this.stats.bookSamples.toLocaleString('de-DE'));
        this.updateElement('reviewsCount', this.stats.reviews.toLocaleString('de-DE'));
        this.updateElement('downloadsCount', this.stats.downloads.toLocaleString('de-DE'));
        
        this.updateElement('visitorToday', `+${this.stats.todayVisitors} heute`);
        this.updateElement('downloadsToday', `+${this.stats.todayDownloads} heute`);
        this.updateElement('avgRating', this.stats.avgRating);
        
        if (this.stats.lastSampleDate) {
            this.updateElement('lastSample', this.stats.lastSampleDate);
        }
    }
    
    saveStats() {
        // Resette tägliche Counter um Mitternacht
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = tomorrow - now;
        
        // Speichere in LocalStorage
        localStorage.setItem('silberhain_stats', JSON.stringify(this.stats));
        
        // Setze tägliche Counter um Mitternacht zurück
        if (!this.resetTimeout) {
            this.resetTimeout = setTimeout(() => {
                this.resetDailyCounters();
            }, timeUntilMidnight);
        }
    }
    
    resetDailyCounters() {
        this.stats.todayVisitors = 0;
        this.stats.todayDownloads = 0;
        this.updateElement('visitorToday', '+0 heute');
        this.updateElement('downloadsToday', '+0 heute');
        this.saveStats();
        
        // Nächsten Reset planen
        this.resetTimeout = null;
        this.saveStats();
    }
    
    setupEventListeners() {
        // Demo-Buttons für Entwicklung
        document.getElementById('incrementSamples')?.addEventListener('click', () => {
            this.incrementBookSamples();
        });
        
        document.getElementById('incrementReviews')?.addEventListener('click', () => {
            this.incrementReviews(Math.floor(Math.random() * 3) + 3); // 3-5 Sterne
        });
        
        // Automatische Downloads bei Klick auf Download-Links
        document.querySelectorAll('a[href*="download"], a[href*=".pdf"], a[href*=".epub"]').forEach(link => {
            link.addEventListener('click', () => {
                this.incrementDownloads();
            });
        });
        
        // Automatische Leseproben-Zählung
        document.querySelectorAll('a[href*="leseprobe"], .read-sample-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.incrementBookSamples();
            });
        });
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    window.silberhainStats = new AnimatedStats();
    
    // Optional: Simuliere Initial-Werte für Demo
    if (!localStorage.getItem('silberhain_stats')) {
        // Setze Demo-Werte für ersten Besuch
        setTimeout(() => {
            window.silberhainStats.stats = {
                visitors: 1247,
                bookSamples: 356,
                reviews: 89,
                downloads: 512,
                todayVisitors: 3,
                todayDownloads: 2,
                avgRating: 4.7,
                lastSampleDate: '23.12.2025',
                lastVisitDate: new Date().toDateString()
            };
            window.silberhainStats.updateDisplay();
        }, 1000);
    }
});
