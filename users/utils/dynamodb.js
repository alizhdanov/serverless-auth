'use strict';

const AWS = require('aws-sdk/index'); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8888',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

exports.get = async email => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: 'EmailsIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    // TODO: change query to something that return only one item
    const data = await client.query(params).promise();

    return data.Items[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};


exports.put = async item => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: item,
  };
  try {
    const data = await dynamodb.put(params).promise();

    // TODO: I'd return here something from payload
    return item;
  } catch (error) {
    return null;
  }
};

exports.dynamodb = client;

