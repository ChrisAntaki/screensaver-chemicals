try {
    var gui = require('nw.gui');
    document.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('keydown', onMovement);
        window.addEventListener('mousedown', onMovement);
        window.addEventListener('mouseover', onMovement);
    });
} catch(e) {
    // Node-webkit wasn't detected
}

function onMovement() {
    gui.App.quit();
}
