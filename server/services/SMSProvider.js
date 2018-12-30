const request = require('request');

export default class SMSProvider {
    constructor() {
        this.username = "37CFFF9538674149B59D70C2EA5A5EB7-01-3";
        this.password = "7C0BJbUiAJh!BW3yr3fAL6nlL0eW#";
    }

    sendSMS(to, message) {
        return new Promise((resolve, reject) => {
            if (process.env.ENABLE_SEND_SMS) {
                request({
                        url: 'https://api.bulksms.com/v1/messages',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        auth: {
                            user: this.username,
                            password: this.password
                        },
                        method: 'POST',
                        body: JSON.stringify([{
                            to: to,
                            body: message
                        }])
                    },
                    function (error, response, body) {
                        if (error) {
                            reject(error)
                        }
                        resolve(response);
                    })
            } else {
                resolve(true);
            }
        })
    }
}