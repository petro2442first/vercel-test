const endpoints = [];

export class RocketApi {
    static async loginUser({ username, password }) {
        const response = await fetch('http://127.0.0.1:8812/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();

        return data;
    }
}