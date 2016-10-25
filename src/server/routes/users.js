const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.userRoute);
router.post('/login', userController.loginRoute);
router.get('/status', userController.ensureAuthenticated);

module.exports = router;
