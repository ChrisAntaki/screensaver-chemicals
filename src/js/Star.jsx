var React = require('react');

var Star = React.createClass({

    render: function() {
        var translate =
            'translate(' +
                this.state.position.x + 'px,' +
                this.state.position.y + 'px' +
            ')';

        var style = {
            transform: translate,
            webkitTransform: translate,
        };

        return (
            <circle
                fill="white"
                opacity={this.state.opacity}
                r={this.state.size}
                style={style}
            />
        );
    },

    getInitialState: function() {
        return {
            opacity: 0,
            position: {
                x: this.props.startX,
                y: this.props.startY
            },
            size: 0,
        };
    },

    animateIn: function() {
        this.setState({
            opacity: 1,
            position: {
                x: this.props.endX,
                y: this.props.endY,
            },
            size: this.props.size,
        });
    },

    animateOut: function() {
        this.setState({
            opacity: 0,
            position: {
                x: this.props.endX,
                y: this.props.endY,
            },
            size: this.props.size,
        });
    },

    componentDidMount: function() {
        setTimeout(this.animateIn, 100);
        setTimeout(this.animateOut, 2000);
    },

});

module.exports = Star;
