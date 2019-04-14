'use strict';

const validator = require('validator');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { dynamodb, put } = require('./dynamodb');
const { hash } = require('./utils/password');
const { generatePayload, payloadError } = require('./utils/payload');

// TODO: unify validation messages
// TODO: or reuse this validation

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

module.exports.handler = async (event, context) => {
  const timestamp = Date.now();
  const data = JSON.parse(event.body);
  const errors = [];
  const email = validateEmail(data && data.email);
  const password = await validatePassword(data && data.password);

  if (email.error || password.error) {
    return payloadError(400, [email.error, password.error].filter(Boolean));
  }

  const item = {
    id: uuid.v1(),
    email: email.value,
    password: password.value,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const user = await put(item);

  if (user) {
    return generatePayload(200, {
      data: {
        id: item.id,
        // TODO: remove it
        // ...item,
      },
    });
  } else {
    // TODO: change it
    return {
      statusCode: 501,
      headers: { 'Content-Type': 'text/plain' },
      body: "Couldn't create the todo item.",
    };
  }
};
