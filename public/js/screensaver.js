try {
    var gui = require('nw.gui');  
    window.addEventListener('keydown', onMovement);
    window.addEventListener('mousedown', onMovement);
} catch(e) {
    // Node-webkit wasn't detected
}

function onMovement() {
    gui.App.quit();
}
