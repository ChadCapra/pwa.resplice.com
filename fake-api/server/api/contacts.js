'use strict';

const SetupEndpoint = require('./setup/');

module.exports = SetupEndpoint({
    name: 'contacts',
    urls: [
        {
            params: '',
            requests: [{
                method: 'GET',
                response: '/response-files/contacts.json'
            }]
        }
    ]
});
