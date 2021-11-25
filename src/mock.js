const mockChannel = 'test';
const mockUser = 'thisisatest123';
const mockUserAlt = 'alsoatest456';
const mockDisplayName = 'ThisIsATest123';
const mockDisplayNameAlt = 'AlsoATest456';
const mockColor = '#FF0000';
const mockMessage = 'peepoPog WOW';
const mockTimestamp = Math.floor(Date.now() / 1000).toString();
const mockId = '00000000-0000-0000-0000-000000000000';
const mockOriginId = '00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00';

// cheer: [
//     `#${mockChannel}`,
//     {
//         "badge-info": null,
//         "badges": null,
//         "bits": "100",
//         "color": mockColor,
//         "display-name": mockDisplayName,
//         "emotes": null,
//         "first-msg": false,
//         "flags": null,
//         "id": mockId,
//         "mod": false,
//         "room-id": "1234567890",
//         "subscriber": false,
//         "tmi-sent-ts": mockTimestamp,
//         "turbo": false,
//         "user-id": "1234567890",
//         "user-type": null,
//         "emotes-raw": null,
//         "badge-info-raw": null,
//         "badges-raw": null,
//         "username": mockUser,
//         "message-type": "chat"
//     },
//     `Cheer100 ${mockMessage}`,
// ],

module.exports = {
    /**
     * @param {boolean} [prime=true] - If the sub was done via Prime, otherwise Tier 1
     * @return {Object}
     */
    subscription: (prime = true) => ([
        `#${mockChannel}`,
        mockUser,
        {
            prime,
            plan: prime ? 'Prime' : '1000',
            planName: `Channel Subscription (${mockChannel})`,
        },
        mockMessage,
        {
            'badge-info': { subscriber: '0' },
            'badges': { subscriber: '0' },
            color: mockColor,
            'display-name': mockDisplayName,
            emotes: null,
            flags: null,
            id: mockId,
            login: mockUser,
            mod: false,
            'msg-id': 'sub',
            'msg-param-cumulative-months': true,
            'msg-param-months': false,
            'msg-param-multimonth-duration': false,
            'msg-param-multimonth-tenure': false,
            'msg-param-should-share-streak': false,
            'msg-param-sub-plan-name': `Channel Subscription (${mockChannel})`,
            'msg-param-sub-plan': prime ? 'Prime' : '1000',
            'msg-param-was-gifted': 'false',
            'room-id': '1234567890',
            subscriber: true,
            'system-msg': `${mockDisplayName} subscribed ${prime ? 'with Prime.' : 'at Tier 1.'}`,
            'tmi-sent-ts': mockTimestamp,
            'user-id': '1234567890',
            'user-type': null,
            'emotes-raw': null,
            'badge-info-raw': 'subscriber/0',
            'badges-raw': 'subscriber/0',
            'message-type': 'sub',
        },
    ]),
    /**
     * @param {boolean} [prime=true] - If the sub was done via Prime, otherwise Tier 1
     * @param {number} [months=8] - The number of months the user has been subbed total, including this resub
     * @param {number} [streak=0] - The number of consecutive months the user has been subbed at present, including this resub
     * @return {Object}
     */
    reSub: (prime = true, months = 8, streak = 0) => ([
        `#${mockChannel}`,
        mockUser,
        streak,
        mockMessage,
        {
            'badge-info': { subscriber: months.toString() },
            badges: { subscriber: '3' }, // TODO
            color: mockColor,
            'display-name': mockDisplayName,
            emotes: null,
            flags: null,
            id: mockId,
            login: mockUser,
            mod: false,
            'msg-id': 'resub',
            'msg-param-cumulative-months': months.toString(),
            'msg-param-months': false,
            'msg-param-multimonth-duration': false,
            'msg-param-multimonth-tenure': false,
            'msg-param-should-share-streak': streak !== 0,
            'msg-param-streak-months': (streak === 0 ? false : (streak === 1 ? true : streak.toString())),
            'msg-param-sub-plan-name': `Channel Subscription (${mockChannel})`,
            'msg-param-sub-plan': prime ? 'Prime' : '1000',
            'msg-param-was-gifted': 'false',
            'room-id': '1234567890',
            subscriber: true,
            'system-msg': `${mockDisplayName} subscribed ${prime ? 'with Prime.' : 'at Tier 1.'}. They've subscribed for ${months} month${months === 1 ? '' : 's'}${streak ? `, currently on a ${streak} month streak!` : '!'}`,
            'tmi-sent-ts': mockTimestamp,
            'user-id': '1234567890',
            'user-type': null,
            'emotes-raw': null,
            'badge-info-raw': `subscriber/${months}`,
            'badges-raw': 'subscriber/3', // TODO
            'message-type': 'resub',
        },
        {
            prime,
            plan: prime ? 'Prime' : '1000',
            planName: `Channel Subscription (${mockChannel})`,
        },
    ]),
    /**
     * @param {number} [senderCount=1] - The number of subs this user has gifted total, including this gift
     * @param {number} [recipientMonths=3] - THe number of months the recipient has been subscribed for total, including this gift
     * @return {Object}
     */
    subGift: (senderCount = 1, recipientMonths = 3) => ([
        `#${mockChannel}`,
        mockUser,
        0, // TODO: What?
        mockUserAlt,
        {
            prime: false,
            plan: '1000',
            planName: `Channel Subscription (${mockChannel})`,
        },
        {
            'badge-info': null,
            badges: null,
            color: mockColor,
            'display-name': mockDisplayName,
            emotes: null,
            flags: null,
            id: mockId,
            login: mockUser,
            mod: false,
            'msg-id': 'subgift',
            'msg-param-gift-months': true,
            'msg-param-months': (recipientMonths === 0 ? false : (recipientMonths === 1 ? true : recipientMonths.toString())),
            'msg-param-origin-id': mockOriginId,
            'msg-param-recipient-display-name': mockDisplayNameAlt,
            'msg-param-recipient-id': '1234567890',
            'msg-param-recipient-user-name': mockUserAlt,
            'msg-param-sender-count': (senderCount === 0 ? false : (senderCount === 1 ? true : senderCount.toString())),
            'msg-param-sub-plan-name': `Channel Subscription (${mockChannel})`,
            'msg-param-sub-plan': '1000',
            'room-id': '1234567890',
            subscriber: false,
            'system-msg': `${mockDisplayName} gifted a Tier 1 sub to ${mockDisplayNameAlt}!${senderCount ? ` They have given ${senderCount} Gift Subs in the channel!` : ''}`,
            'tmi-sent-ts': mockTimestamp,
            'user-id': '1234567890',
            'user-type': null,
            'emotes-raw': null,
            'badge-info-raw': null,
            'badges-raw': null,
            'message-type': 'subgift',
        },
    ]),
    /**
     * @param {number} [count=5] - The number of subs given in this gift
     * @param {number} [senderCount=5] - The number of subs this user has gifted total, including this gift
     * @return {Object}
     */
    subMysteryGift: (count = 5, senderCount = 5) => ([
        `#${mockChannel}`,
        mockUser,
        count,
        {
            prime: false,
            plan: '1000',
            planName: null,
        },
        {
            'badge-info': null,
            'badges': null,
            'color': mockColor,
            'display-name': mockDisplayName,
            'emotes': null,
            'flags': null,
            'id': mockId,
            'login': mockUser,
            'mod': false,
            'msg-id': 'submysterygift',
            'msg-param-mass-gift-count': (count === 0 ? false : (count === 1 ? true : count.toString())),
            'msg-param-origin-id': mockOriginId,
            'msg-param-sender-count': (senderCount === 0 ? false : (senderCount === 1 ? true : senderCount.toString())),
            'msg-param-sub-plan': '1000',
            'room-id': '1234567890',
            'subscriber': false,
            'system-msg': `${mockDisplayName} is gifting ${count} Tier 1 Sub${count === 1 ? '' : 's'} to ${mockChannel}'s community!${senderCount ? ` They've gifted a total of ${senderCount} in the channel!` : ''}`,
            'tmi-sent-ts': mockTimestamp,
            'user-id': '1234567890',
            'user-type': null,
            'emotes-raw': null,
            'badge-info-raw': null,
            'badges-raw': null,
            'message-type': 'submysterygift',
        },
    ]),
};
