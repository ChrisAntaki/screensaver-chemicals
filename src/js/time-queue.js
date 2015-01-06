function TimeQueue() {
    this.queue = [];
}

TimeQueue.prototype.set = function(params) {
    this.queue.push(new TimeQueueItem(params));
};

TimeQueue.prototype.tick = function() {
    var now = Date.now();

    for (var i = (this.queue.length - 1); i > -1; i--) {
        if (now < this.queue[i].time) {
            continue;
        }

        this.queue[i].callback();
        this.queue.splice(i, 1);
    }
};



function TimeQueueItem(params) {
    this.callback = params.callback;
    this.time = params.time;
}



module.exports = TimeQueue;
