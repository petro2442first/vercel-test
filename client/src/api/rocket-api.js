const endpoints = [];

export class RocketApi {
    static async loginUser({ login, password }) {
        const response = await fetch('http://127.0.0.1:8888/api/auth', {
            method: 'POST',
            body: JSON.stringify({
                login, password
            })
        });
        const data = await response.text();

        return data;
    }
}