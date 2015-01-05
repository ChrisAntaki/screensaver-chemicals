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

function Star(params) {
    this.endX = params.endX;
    this.endY = params.endY;
    this.pool = params.pool;
    this.size = params.size;
    this.startX = params.startX;
    this.startY = params.startY;
    this.target = params.target;

    this.el = this.pool.pop();
    this.el.setAttribute('fill', '#' + getRandomColor());
    this.el.setAttribute('r', this.size);

    var translate =
        'translate3d(' +
            this.startX + 'px,' +
            this.startY + 'px,' +
            '0' +
        ')';

    this.el.style.transform = translate;
    this.el.style.webkitTransform = translate;

    this.el.style.fillOpacity = 0;

    this.el.removeAttribute('class');

    this.target.appendChild(this.el);

    setTimeout(this.animateIn.bind(this), 20);
    setTimeout(this.animateOut.bind(this), 2040);
    setTimeout(this.destroy.bind(this), 2560);
}

Star.prototype.animateIn = function() {
    var translate =
        'translate3d(' +
            this.endX + 'px,' +
            this.endY + 'px,' +
            '0' +
        ')';

    this.el.style.transform = translate;
    this.el.style.webkitTransform = translate;

    this.el.style.fillOpacity = 1;
}

Star.prototype.animateOut = function() {
    this.el.setAttribute('class', 'animate-out');

    this.el.style.fillOpacity = 0;
}

Star.prototype.destroy = function() {
    this.target.removeChild(this.el);
    this.pool.push(this.el);
}

module.exports = Star;
