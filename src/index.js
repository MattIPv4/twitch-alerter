const tmi = require('tmi.js');

class Alerts {
    constructor(element, options = {}) {
        this.bootstrap(element);
        this.time = options.time ?? 30; // Time on screen
        this.speed = options.speed ?? 0.2; // Fade speed
        this.connect(options.channels || []);
    }

    bootstrap (element) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.height = '100%';
        wrapper.style.width = '100%';

        // TODO: What elms do we need?

        element.appendChild(wrapper);
        this.element = wrapper;
    }

    async connect(channels) {
        // Create the client
        this.client = new tmi.Client({
            options: {
                debug: false
            },
            connection: {
                reconnect: true,
                secure: true
            },
            channels,
        });

        // Connect
        await this.client.connect();

        // Handle sub upgrades
        this.client.on('anongiftpaidupgrade', (a, b, c) => this.giftPaidUpgrade(a, b, 'Anonymous', c));
        this.client.on('giftpaidupgrade', this.giftPaidUpgrade.bind(this));

        // Handle resubs
        this.client.on('resub', this.reSub.bind(this));

        // Handle gift subs
        this.client.on('subgift', this.subGift.bind(this));
        this.client.on('submysterygift', this.subMysteryGift.bind(this));

        // Handle subs
        this.client.on('subscription', this.subscription.bind(this));

        // Handle cheers
        this.client.on('cheer',this.cheer.bind(this));

        // Handle hosts
        this.client.on('hosted', this.hosted.bind(this));

        // Handle raids
        this.client.on('raided', this.raided.bind(this));

        // TODO: Follows?

        console.log('Ready');
    }

    giftPaidUpgrade (channel, username, sender, userstate) {
        // TODO: I suspect this event shouldn't be an alert, seems more analytical (e.g. which gifters convert users)
        const display = userstate['display-name'];
        console.log(`${display} has subscribed, previously gifted by ${sender}!`, channel, username, sender, JSON.stringify(userstate, null, 2));
    }

    reSub (channel, username, streakMonths, message, userstate, method) {
        const display = userstate['display-name'];
        const months = userstate['msg-param-cumulative-months'];
        console.log(`${display} has re-subscribed, for a total of ${months} months!`, channel, username, streakMonths, message, JSON.stringify(userstate, null, 2), JSON.stringify(method, null, 2));
    }

    subGift (channel, username, streakMonths, recipient, method, userstate) {
        const display = userstate['display-name'];
        const recipientDisplay = userstate['msg-param-recipient-display-name'];
        console.log(`${display} has gifted ${recipientDisplay} a subscription!`, channel, username, streakMonths, recipient, JSON.stringify(method, null, 2), JSON.stringify(userstate, null, 2));
    }

    subMysteryGift (channel, username, numbOfSubs, method, userstate) {
        const display = userstate['display-name'];
        console.log(`${display} has gifted ${numbOfSubs} subscriptions!`, channel, username, numbOfSubs, JSON.stringify(method, null, 2), JSON.stringify(userstate, null, 2));
    }

    subscription (channel, username, method, message, userstate) {
        const display = userstate['display-name'];
        console.log(`${display} has subscribed!`, channel, username, JSON.stringify(method, null, 2), message, JSON.stringify(userstate, null, 2));
    }

    cheer (channel, userstate, message) {
        const display = userstate['display-name'];
        const bits = userstate.bits;
        console.log(`${display} has cheered ${bits} bits for ${message}!`, channel, JSON.stringify(userstate, null, 2), message);
    }

    hosted (channel, username, viewers, autohost) {
        // TODO: Is this needed, or should only raids be alerted?
        console.log(`${username} has hosted with ${viewers} viewers!`, channel, username, viewers, autohost);
    }

    raided (channel, username, viewers) {
        console.log(`${username} has raided with ${viewers} viewers!`, channel, username, viewers);
    }
}

module.exports = Alerts;
