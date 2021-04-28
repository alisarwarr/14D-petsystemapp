const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

export type PayloadType = {
    operationSuccessful: boolean,
    SnsMessage?: string
}

exports.handler = async(event) => {
    console.log("dynamodbHandler event", event);


    //initailly returningPayload
    let returningPayload: PayloadType = {
        operationSuccessful: false,
        SnsMessage: ''
    }
    //may updated if try success


    if(event["detail-type"] === "createLabreport") {
        const params = {
            TableName: process.env.TABLE_NAME || '',
            Item: {
                ...event.detail
            }
        }

        try {
            await docClient.put(params).promise();           //add specific data into database
            returningPayload.operationSuccessful = true;
            returningPayload.SnsMessage = 'REQUEST of createLabreport';
        }
        catch (err) {
            console.log(err);
        }
    }


    //returning RESPONSE
    return returningPayload;
}