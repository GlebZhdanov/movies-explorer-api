const express = require('express');
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validationIdMovie } = require('../middleware/validation');

const router = express.Router();

router.get('/', getMovies);

router.post('/', validateMovie, postMovie);

router.delete('/:id', validationIdMovie, deleteMovie);

module.exports = router;
