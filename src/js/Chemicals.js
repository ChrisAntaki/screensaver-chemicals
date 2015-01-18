var Pool = require('dom-pool');
var TimeQueue = require('./time-queue');
var Chemical = require('./Chemical');

function Chemicals() {
    this.lastFrames = [];

    this.createChemicalDelay = 128;

    this.queue = new TimeQueue();

    this.pool = new Pool({
        tagName: 'div'
    });
    this.pool.allocate(100);

    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.requestAnimationFrame();

    this.queueDisplayFPS();
    this.queueCreateChemical();
}

Chemicals.prototype.queueCreateChemical = function() {
    this.queue.set({
        callback: this.createChemical,
        context: this,
        time: Date.now() + this.createChemicalDelay,
    });
};

Chemicals.prototype.requestAnimationFrame = function() {
    requestAnimationFrame(this.requestAnimationFrame);
    this.queue.tick();
    this.calculateFPS();
};

Chemicals.prototype.calculateFPS = function() {
    if (this.lastFrames.length > 60) {
        this.lastFrames.shift();
    }

    this.lastFrames.push(Date.now());
}

Chemicals.prototype.createChemical = function() {
    new Chemical({
        endX: rand(innerWidth),
        endY: rand(innerHeight),
        pool: this.pool,
        queue: this.queue,
        size: rand(60) + 20,
        startX: rand(innerWidth),
        startY: rand(innerHeight),
        target: document.body,
    });

    this.queueCreateChemical();
};

Chemicals.prototype.queueDisplayFPS = function() {
    this.queue.set({
        callback: this.displayFPS,
        context: this,
        time: Date.now() + 1000,
    });
};

Chemicals.prototype.displayFPS = function() {
    var length = this.lastFrames.length;
    var difference = (this.lastFrames[length - 1] - this.lastFrames[0]) / (length - 1);
    var fps = 1000 / difference;
    console.log(fps);

    if (fps < 55 && this.createChemicalDelay < 1000) {
        this.createChemicalDelay += 10;
        // console.log('Added 10ms to this.createChemicalDelay');
        // console.log('this.createChemicalDelay:', this.createChemicalDelay);
    } else if (fps > 59 && this.createChemicalDelay > 32) {
        this.createChemicalDelay -= 1;
        // console.log('Removed 1ms from this.createChemicalDelay');
        // console.log('this.createChemicalDelay:', this.createChemicalDelay);
    }

    this.queueDisplayFPS();
};

function rand(maximum) {
    return Math.floor(Math.random() * (maximum + 1));
}

module.exports = Chemicals;
