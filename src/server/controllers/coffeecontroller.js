const knex = require('../db/connection');

function getAllCoffee(req, res, next) {
  return knex('coffee').select('*')
  .then((coffees) => {
    res.status(200).json({
      status: 'success',
      data: coffees
    });
  })
  .catch((err) => {
    return next(err);
  });
}

function getSingleCoffee(req, res, next) {
  const coffeeID = parseInt(req.params.id);
  return knex('coffee').where('id', coffeeID).first()
  .then((coffee) => {
    res.status(200).json({
      status: 'success',
      data: coffee
    });
  })
  .catch((err) => {
    return next(err);
  });
}

function addCoffee(req, res, next) {
  return knex('coffee').insert(req.body).returning('*')
  .then((coffee) => {
    res.status(200).json({
      status: 'success',
      data: coffee
    });
  })
  .catch((err) => { return next(err); });
}

module.exports = {
  getAllCoffee,
  getSingleCoffee,
  addCoffee
};
