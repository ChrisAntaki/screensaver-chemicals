var Pool = require('./Pool');
var Star = require('./Star');

function Stars() {
    this.svg = document.querySelector('svg');

    this.pool = new Pool({
        namespace: 'http://www.w3.org/2000/svg',
        tagName: 'circle',
    });
    this.pool.allocate(100);

    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.requestAnimationFrame();
}

Stars.prototype.requestAnimationFrame = function() {
    requestAnimationFrame(this.requestAnimationFrame);    

    this.createStar();
}

Stars.prototype.createStar = function() {
    var star = new Star({
        endX: rand(innerWidth),
        endY: rand(innerHeight),
        pool: this.pool,
        size: rand(30) + 10,
        startX: rand(innerWidth),
        startY: rand(innerHeight),
        target: this.svg,
    });
};

function rand(maximum) {
    return Math.floor(Math.random() * (maximum + 1));
}

module.exports = Stars;
