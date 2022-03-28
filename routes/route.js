const express = require('express');

const router = express.Router();

const { validateUser, validateLogin } = require('../middleware/validation');
const { createUser, loginUser } = require('../controllers/users');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, loginUser);

module.exports = router;
