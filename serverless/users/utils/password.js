const bcrypt = require('bcryptjs');

// TODO: move hash somewhere
const saltRounds = 10;

module.exports.hash = async (pass) => bcrypt.hash(pass, saltRounds);

module.exports.compare = async (pass, hash) => bcrypt.compare(pass, hash);
