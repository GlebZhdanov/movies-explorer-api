const express = require('express');
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validationIdMovie } = require('../middleware/validation');

const router = express.Router();

router.get('/movies', getMovies);

router.post('/movies', validateMovie, postMovie);

router.delete('/movies/:id', validationIdMovie, deleteMovie);

module.exports = router;
