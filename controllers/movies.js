const Movies = require('../models/movie');
const BadRequestErr = require('../error/BadRequestErr');
const NotFoundErr = require('../error/NotFoundErr');
const ForbiddenErr = require('../error/ForbiddenErr');

exports.getMovies = async (req, res, next) => {
  try {
    const id = req.user._id;
    const movie = await Movies.find({ owner: id });
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
};

exports.postMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const owner = req.user._id;
    const movies = new Movies({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    });
    res.status(201).send(await movies.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  }
};

exports.deleteMovie = async (req, res, next) => {
  console.log(req.params);
  const cardId = req.params.id;
  Movies.findById(cardId)
    .orFail(() => {
      throw new NotFoundErr('Фильм не найденн');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Удалять можно только свои фильмы');
      }
      return card.remove()
        .then(() => {
          res.send({ message: 'Фильм удалён' });
        });
    })
    .catch(next);
};
