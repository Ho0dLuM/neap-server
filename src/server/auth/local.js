const jwt = require('jwt-simple');

function encodeToken(payload) {
  return jwt.encode(payload, process.env.SECRET_KEY);
}

function decodeToken(token) {
  return jwt.decode(token, process.env.SECRET_KEY)
}
