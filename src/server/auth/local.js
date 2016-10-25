const jwt = require('jwt-simple');
const moment = require('moment');

const secret = process.env.SECRET_KEY;
const knex = require('../db/connection');

function encodeToken(token) {
  const payload = {
    exp: moment().add(14, 'days'),
    iat: moment(),
    sub: 'user.id'
  };
  return jwt.encode(payload, process.env.SECRET_KEY);
}

function decodeToken(token) {
  const payload = jwt.decode(token, process.env.SECRET_KEY);
  if (payload.exp > payload.iat + '14 days') {
    return false;
  } else {
    return knex('users').where('id', parseInt(payload.sub))
    .then((user) => {
      if (user.length) {
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = {
  encodeToken,
  decodeToken
};
