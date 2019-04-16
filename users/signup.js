'use strict';

const validator = require('validator');
const uuid = require('uuid');
const { put } = require('./utils/dynamodb');
const { generatePayload, payloadError } = require('./utils/payload');
const { validateEmail, validatePassword } = require('./utils/rules')


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

  return generatePayload(200, {
    data: {
      id: item.id,
    },
  });
};
