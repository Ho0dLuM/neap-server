const bcrypt = require('bcryptjs');

const knex = require('../db/connection');
const localAuth = require('../auth/local');

function userRoute(req, res, next) {
  return createUser(req)
  .then((user) => { return localAuth.encodeToken(user[0]); })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error'
    });
  });
}

function loginRoute(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  return getUser(username)
  .then((response) => {
    comparePass(password, response.password);
    return response;
  })
  .then((response) => { return localAuth.encodeToken(response); })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error'
    });
  });
}

//--- Helper Functions ---//
function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash
  })
  .returning('*');
}

function getUser(username) {
  return knex('users')
  .where({username}).first();
}

function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('bad pass silly money');
  else return true;
}

function ensureAuthenticated(req, res, next) {
  if (!req.headers) {
    res.status(400).json({
      status: 'add some headers yo'
    });
  }
  if (!req.headers.authorization) {
    res.status(401).json({
      status: 'please login yo'
    });
  }
  const bool = localAuth.decodeToken(req.headers.authorization.split(' ')[1]);
  if (bool) {
    next();
  } else {
    res.status(401).json({
      status: 'user ain\'t not valid yo'
    });
  }
}

module.exports = {
  userRoute,
  loginRoute,
  ensureAuthenticated
};
