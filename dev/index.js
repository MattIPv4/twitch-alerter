const Alerts = require('../src');

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.fontSize = '22px';
    document.body.style.background = '#444';

    const elm = document.createElement('div');
    elm.style.height = '100%';
    elm.style.padding = '4em';
    elm.style.boxSizing = 'border-box';
    document.body.appendChild(elm);

    new Alerts(elm, { channels: [ '#maya' ] });
});
