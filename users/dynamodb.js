'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8888',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports.get = async (email) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: 'EmailsIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    return await dynamodb.query(params).promise()
  } catch (error) {
    console.error(error)
    return null
  }
}

module.exports = client;
