require('dotenv').config();
const sha1 = require('sha1');

const apiKey = process.env.MOR_API_KEY;

class MorApi {
    static async login({ username, password }) {
        const url = new URL('http://116.203.41.231/billing/api/user_login');
        const params = new URLSearchParams(url.search);

        const hash = sha1(''.concat(username, password, apiKey));

        params.append('u', username);
        params.append('p', password);
        params.append('hash', hash);
    }
}

// MorApi.login({username: 'user', password: 'pass'});

module.exports = MorApi;