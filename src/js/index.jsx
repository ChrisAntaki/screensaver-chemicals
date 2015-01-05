var React = require('react');

var Stars = require('./Stars.jsx');
var Star = require('./Star.jsx');

document.addEventListener('DOMContentLoaded', function() {
    React.render(
        <Stars />,
        document.body
        );
});
