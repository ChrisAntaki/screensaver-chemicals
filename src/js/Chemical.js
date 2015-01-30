var colors = [
    '099BCC',
    '24FFBE',
    '358099',
    'CC093C',
    'FF6F64',
];
function getRandomColor() {
    var key = Math.floor(Math.random() * colors.length);
    return colors[key];
}

function Chemical(params) {
    this.endX = params.endX;
    this.endY = params.endY;
    this.pool = params.pool;
    this.queue = params.queue;
    this.size = params.size;
    this.startX = params.startX;
    this.startY = params.startY;
    this.target = params.target;

    this.setTimers();
    this.setupDOMNode();
}

Chemical.prototype.setupDOMNode = function() {
    this.el = this.pool.pop();

    var color = '#' + getRandomColor();
    this.el.style.backgroundColor = color;
    this.el.style.boxShadow = '0 0 40px ' + color;
    this.el.style.width = this.el.style.height = this.size + 'px';

    var translate =
        'translate3d(' +
            this.startX + 'px,' +
            this.startY + 'px,' +
            '0' +
        ')';

    this.el.style.transform = this.el.style.webkitTransform = translate;
    this.el.style.opacity = 0;
    this.el.removeAttribute('class');

    this.target.appendChild(this.el);
};

Chemical.prototype.setTimers = function() {
    var now = Date.now();

    this.queue.set({
        callback: this.animateIn,
        context: this,
        time: now + 20,
    });

    this.queue.set({
        callback: this.animateOut,
        context: this,
        time: now + 2040,
    });

    this.queue.set({
        callback: this.destroy,
        context: this,
        time: now + 2560,
    });
};

Chemical.prototype.animateIn = function() {
    var translate =
        'translate3d(' +
            this.endX + 'px,' +
            this.endY + 'px,' +
            '0' +
        ')';

    this.el.style.transform = this.el.style.webkitTransform = translate;
    this.el.style.opacity = 1;
}

Chemical.prototype.animateOut = function() {
    this.el.setAttribute('class', 'animate-out');
    this.el.style.opacity = 0;
}

Chemical.prototype.destroy = function() {
    this.pool.push(this.el);
    this.target.removeChild(this.el);
}

module.exports = Chemical;
