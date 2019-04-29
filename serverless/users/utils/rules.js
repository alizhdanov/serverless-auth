const validator = require('validator');
const { hash } = require('./password');
const { NO_EMAIL, NO_PASSWORD } = require('./constants')

exports.validateEmail = email => {
    let error = null;

    if (!email) {
        error = NO_EMAIL;
    } else if (!validator.isEmail(email)) {
        error = 'Invalid Email Address.';
    }

    return {
        error,
        value: email,
    };
};

exports.validatePassword = async pass => {
    let error = null;
    let value = null;

    if (pass == null) {
        error = NO_PASSWORD;
    } else {
        value = await hash(pass);
    }

    return {
        error,
        ...(value && { value }),
    };
};
