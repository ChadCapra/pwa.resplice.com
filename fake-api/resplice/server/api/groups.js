'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'groups',
    urls: [
        {
            requests: [{
                method: 'GET',
                response: '/response-files/groups.json'
            }]
        }
    ]
});
