const express = require('express');
const router = express.Router();

const coffeeController = require('../controllers/coffeeController');

router.get('/', coffeeController.getAllCoffee);
router.get('/:id', coffeeController.getSingleCoffee);
router.post('/', coffeeController.addCoffee);

module.exports = router;
