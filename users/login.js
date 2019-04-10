'use strict';

const dynamodb = require('./dynamodb');

const NO_EMAIL = 'Please provide email.'
const NOT_FOUND = 'User does not exist.'

// TODO: move it into helpers
const generatePayload = (status, body) => {
    return {
        statusCode: status,
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    }
}

module.exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);

    if (!(body && body.email)) {
        return generatePayload(400, {
            error: NO_EMAIL
        })
    }

    const user = await dynamodb.get('')

    if (!user) {
        return generatePayload(400, {
            error: NOT_FOUND
        })
    }

    // handle potential errors
    if (error) {
        console.error(error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: "Couldn't fetch the todo item.",
        });
        return;
    }

    console.log({ result });

    if (!result.Count) {
        callback(null, {
            statusCode: 404,
        });
        return;
    }

    // create a response
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items[0]),
    };
    callback(null, response);
};
