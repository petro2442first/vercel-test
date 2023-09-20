import dotenv from 'dotenv';
import fetch from 'node-fetch';
import sha1 from 'sha1';
import { parseString as parseXml } from 'xml2js';

dotenv.config();

const apiKey = process.env.MOR_API_KEY;

export class MorApi {
    static login({ username, password }) {
        return new Promise(async (resolve, reject) => {
            const url = new URL('http://116.203.41.231/billing/api/user_login');
            const hash = sha1(''.concat(username, password, apiKey));
    
            url.searchParams.append('u', username);
            url.searchParams.append('p', password);
            url.searchParams.append('hash', hash);
    
            const response = await fetch(url);
            const data = await response.text();
    
            parseXml(data, { trim: true }, (error, result) => {
                resolve(result);
            });
        })
    }
}

// MorApi.login({username: '1011111111', password: 'ehF8km956PRf*G)!'}).then(console.log);