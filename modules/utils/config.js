/**
 * Global configuration constants
 */
const CONFIG = {
    // Animation settings
    ANIMATION_DURATION: 300,
    
    // Click zone settings
    CLICK_ZONES: {
        LEFT: 1/3,
        RIGHT: 2/3
    },
    
    // File settings
    ACCEPTED_FILE_TYPES: ['text/csv'],
    
    // Chart settings
    CHART: {
        colors: {
            primary: '#ff6b00',
            secondary: '#ff8533',
            background: 'rgba(255, 107, 0, 0.1)'
        },
        maxBarWidth: 250
    },
    
    // Day order
    DAYS_ORDER: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
};

window.CONFIG = CONFIG;
