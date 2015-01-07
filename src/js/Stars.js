var Pool = require('dom-pool');
var TimeQueue = require('./time-queue');
var Star = require('./Star');

function Stars() {
    this.lastFrames = [];

    this.createStarDelay = 128;

    this.svg = document.querySelector('svg');

    this.queue = new TimeQueue();

    this.pool = new Pool({
        namespace: 'http://www.w3.org/2000/svg',
        tagName: 'circle',
    });
    this.pool.allocate(100);

    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.requestAnimationFrame();

    this.queueDisplayFPS();
    this.queueCreateStar();
}

Stars.prototype.queueCreateStar = function() {
    this.queue.set({
        callback: this.createStar,
        context: this,
        time: Date.now() + this.createStarDelay,
    });
};

Stars.prototype.requestAnimationFrame = function() {
    requestAnimationFrame(this.requestAnimationFrame);
    this.queue.tick();
    this.calculateFPS();
};

Stars.prototype.calculateFPS = function() {
    if (this.lastFrames.length > 60) {
        this.lastFrames.shift();
    }

    this.lastFrames.push(Date.now());
}

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

Stars.prototype.queueDisplayFPS = function() {
    this.queue.set({
        callback: this.displayFPS,
        context: this,
        time: Date.now() + 1000,
    });
};

Stars.prototype.displayFPS = function() {
    var length = this.lastFrames.length;
    var difference = (this.lastFrames[length - 1] - this.lastFrames[0]) / (length - 1);
    var fps = 1000 / difference;
    console.log(fps);

    if (fps < 55 && this.createStarDelay < 1000) {
        this.createStarDelay += 10;
        // console.log('Added 10ms to this.createStarDelay');
        // console.log('this.createStarDelay:', this.createStarDelay);
    } else if (fps > 59 && this.createStarDelay > 16) {
        this.createStarDelay -= 1;
        // console.log('Removed 1ms from this.createStarDelay');
        // console.log('this.createStarDelay:', this.createStarDelay);
    }

    this.queueDisplayFPS();
};

function rand(maximum) {
    return Math.floor(Math.random() * (maximum + 1));
}

module.exports = Stars;
