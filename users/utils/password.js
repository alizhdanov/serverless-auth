const bcrypt = require('bcryptjs');

const saltRounds = 10;

module.exports.hash = async (pass) => bcrypt.hash(pass, saltRounds);

module.exports.compare = async (pass, hash) => bcrypt.compare(pass, hash);
