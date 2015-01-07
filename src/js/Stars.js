var Pool = require('dom-pool');
var TimeQueue = require('./time-queue');
var Star = require('./Star');

function Stars() {
    this.svg = document.querySelector('svg');

    this.queue = new TimeQueue();

    this.pool = new Pool({
        namespace: 'http://www.w3.org/2000/svg',
        tagName: 'circle',
    });
    this.pool.allocate(100);

    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.requestAnimationFrame();

    this.queueCreateStar();
}

Stars.prototype.queueCreateStar = function() {
    this.queue.set({
        callback: this.createStar,
        context: this,
        time: Date.now() + 16,
    });
};

Stars.prototype.requestAnimationFrame = function() {
    requestAnimationFrame(this.requestAnimationFrame);
    this.queue.tick();
};

Stars.prototype.createStar = function() {
    var star = new Star({
        endX: rand(innerWidth),
        endY: rand(innerHeight),
        pool: this.pool,
        queue: this.queue,
        size: rand(30) + 10,
        startX: rand(innerWidth),
        startY: rand(innerHeight),
        target: this.svg,
    });

    this.queueCreateStar();
};

function rand(maximum) {
    return Math.floor(Math.random() * (maximum + 1));
}

module.exports = Stars;
