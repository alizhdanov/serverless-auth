'use strict';

const dynamodb = require('./dynamodb');

// 7ae2b180-4b4e-11e9-877a-a9dcae1c89d4

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: 'EmailsIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': event.pathParameters.id,
    },
  };

  // fetch todo from the database
  dynamodb.query(params, (error, result) => {
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
  });
};
