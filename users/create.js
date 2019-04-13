'use strict';

const validator = require('validator');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { dynamodb } = require('./dynamodb');
const { hash } = require('./utils/password')

// create structure of a result
// return validation with proper hints

// status: success | error
// errors?: string[]

const validateEmail = email => {
  let error = null;

  if (!email) {
    error = 'Please Supply an email address.';
  } else if (!validator.isEmail(email)) {
    error = 'Invalid Email Address.';
  }

  return {
    error,
    value: email,
  };
};

const validatePassword = async pass => {
  let error = null;
  let value = null;

  if (pass == null) {
    error = 'Please Supply a password.';
  } else {
    value = await hash(pass);
  }

  return {
    error,
    ...(value && { value }),
  };
};

module.exports.create = async (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  const errors = [];
  const email = validateEmail(data && data.email);
  const password = await validatePassword(data && data.password);

  if (email.error || password.error) {
    console.error('Validation Failed');
    return  {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'error',
        message: "Couldn't create the todo item.",
        errors: [email.error, password.error].filter(Boolean),
      }),
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      email: email.value,
      password: password.value,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  try {
    await dynamodb.put(params).promise();

    // create a response
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        data: {
          id: params.Item.id,
          ...params.Item
        }
      }),
    };
  } catch (error) {
      console.error(error);
      return {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the todo item.",
      }

  }
};
