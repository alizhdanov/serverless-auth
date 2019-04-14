'use strict';

const jwt = require('jsonwebtoken');
const { get } = require('./dynamodb');
const { compare } = require('./utils/password')
const { generatePayload } = require('./utils/payload');

const NO_EMAIL = 'Please provide email.'
const NO_PASSWORD = 'Please provide password.'
const NOT_FOUND = 'User does not exist.'
const WRONG_PASSWORD = 'Wrong password.'

module.exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const errors = []

    if (!(body && body.email)) {
        errors.push(NO_EMAIL)

    }

    if (!(body && body.password)) {
        errors.push(NO_PASSWORD)
    }

    if (errors.length) {
        return generatePayload(400, {
            errors
        })
    }

    const user = await get(body.email)

    if (!user) {
        return generatePayload(400, {
            errors: [NOT_FOUND]
        })
    }

    const isPasswordMatch = await compare(body.password, user.password)

    if (!isPasswordMatch) {
        return generatePayload(400, {
            errors: [WRONG_PASSWORD]
        })
    }
e
    const token = jwt.sign({
        data: { user: user.email }
    }, 'secret', { expiresIn: 60 * 60 * 24 });

    return generatePayload(200, {data: {token}})
};
