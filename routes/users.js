const express = require('express');
const {
  patchUsers,
  getUser,
} = require('../controllers/users');
const { validateUserPatch } = require('../middleware/validation');

const router = express.Router();

router.get('/users/me', getUser);

router.patch('/users/me', validateUserPatch, patchUsers);

module.exports = router;
