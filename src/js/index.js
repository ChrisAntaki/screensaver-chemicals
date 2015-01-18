var Chemicals = require('./Chemicals');

document.addEventListener('DOMContentLoaded', function() {
    // Hide cursor
    document.body.style.cursor = 'none';

    // The chemicals between us...
    new Chemicals();
});
