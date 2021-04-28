const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: process.env.REGION });

async function sesLambda(event) {
    console.log("snsHandler event", event);


    const body = {
        to: process.env.EMAIL_ADDRESS,
        from: "alisarwar9211@gmail.com",
        subject: "ALERT",
        text: event.SnsMessage
    }
    const { to, from, subject, text } = body;


    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Text: { Data: text },
            },
            Subject: { Data: subject }
        },
        Source: from
    }

    try {
        await ses.sendEmail(params).promise();
        return Responses._200({ message: 'The email has been sent' });
    }
    catch (error) {
        console.log('error sending email', error);
        return Responses._400({ message: 'The email failed to send' });
    }
}

//creating response
const Responses = {
    _200(data: Object) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 200,
            body: JSON.stringify(data)
        }
    },

    _400(data: Object) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    }
}

export default sesLambda;