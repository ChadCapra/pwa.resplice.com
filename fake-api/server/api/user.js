'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'user',
    urls: [
        {
            params: '',
            requests: [{
                method: 'GET',
                response: '/response-files/user.json'
            }]
        }
    ]
});
