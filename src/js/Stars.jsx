var React = require('react');

var Star = require('./Star.jsx');

var Stars = React.createClass({

    render: function() {
        return (
            <svg
                width="100%"
                height="100%"
            >
                {this.state.stars}
            </svg>
        );
    },

    getInitialState: function() {
        return {
            interval: null,
            stars: [],
        };
    },

    componentDidMount: function() {
        this.setState({
            interval: setInterval(this.animate, 100),
        });
    },

    animate: function() {
        var stars = this.state.stars;
        stars.push(this.createStar());
        stars = stars.filter(function(star) {
            return star.key > Date.now() - 5000;
        });

        this.setState({
            stars: stars,
        });
    },

    createStar: function() {
        var startX = Math.floor(Math.random() * innerWidth);
        var startY = Math.floor(Math.random() * innerHeight);
        var endX = Math.floor(innerWidth / 2);
        var endY = Math.floor(innerHeight / 2);
        var size = Math.floor(Math.random() * 50) + 30;

        var star =
            <Star
                key={Date.now()}
                endX={endX}
                endY={endY}
                startX={startX}
                startY={startY}
                size={size}
            />;

        return star;
    },

});

module.exports = Stars;
